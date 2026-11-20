/**
 * First-touch attribution for the marketing site, written as the inline script the layout injects.
 *
 * The same logic runs in the app (DrawWise's src/client, dwAttrInit), and the two must agree on the storage
 * format, because www.drawwise.ai and app.drawwise.ai share one cookie jar:
 *
 *   cookie dw_vid   random hex visitor id
 *   cookie dw_ft    URL-encoded JSON {s,m,c,t,r,f,k,ts}: utm_source / medium / campaign / content,
 *                   referrer host, 1 if an fbclid / ttclid was present, first-touch time (ms)
 *   both on .drawwise.ai (so the app sees them), 90 days, SameSite=Lax; localStorage keeps a copy
 *
 * What it does, in order:
 *  1. Remember the first page load that carries utm_* / fbclid / ttclid. Never overwrite an existing first
 *     touch. With no UTMs, keep the referrer's host. The click id value is never stored, only that it existed.
 *  2. Add the first touch's UTMs to every link into the app (so a browser that drops the cookie across the
 *     hop still arrives with the campaign in the URL).
 *  3. Report a landing_view to the app's /api/funnel (once per tab session, production hosts only,
 *     text/plain so there is no preflight, never from an automated browser).
 *
 * No third-party pixel, no email, nothing sent anywhere but the app. Plain ES5 on purpose: it is injected as a
 * string, so the compiler never touches it.
 */
const SCRIPT = String.raw`(function(APP,FUN){
try{
  var DAYS=90,MS=DAYS*864e5,now=Date.now(),host=location.hostname;
  var cookieDomain=(host==="drawwise.ai"||/\.drawwise\.ai$/.test(host))?".drawwise.ai":"";
  function clean(v,max){return String(v==null?"":v).replace(/[\u0000-\u001f\u007f<>"'\x60{}\\]/g,"").replace(/\s+/g," ").trim().slice(0,max);}
  function getCookie(n){var m=document.cookie.match(new RegExp("(?:^|; )"+n+"=([^;]*)"));return m?m[1]:null;}
  function setCookie(n,v,age){document.cookie=n+"="+v+"; Max-Age="+age+"; Path=/; SameSite=Lax"+(location.protocol==="https:"?"; Secure":"")+(cookieDomain?"; Domain="+cookieDomain:"");}
  function getLS(k){try{return JSON.parse(localStorage.getItem(k)||"null");}catch(e){return null;}}
  function setLS(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
  function live(ft){return ft&&typeof ft==="object"&&typeof ft.ts==="number"&&now-ft.ts<MS&&now>=ft.ts-864e5;}
  function extHost(){
    try{var r=document.referrer;if(!r)return "";var h=new URL(r).hostname.toLowerCase();
      if(!h||h===host||h==="drawwise.ai"||/\.drawwise\.ai$/.test(h))return "";
      return /^[a-z0-9.-]{1,60}$/.test(h)?h:"";}catch(e){return "";}
  }
  function marks(){
    try{var q=new URL(location.href).searchParams;
      var m={s:clean(q.get("utm_source"),40).toLowerCase(),m:clean(q.get("utm_medium"),30).toLowerCase(),
        c:clean(q.get("utm_campaign"),100),t:clean(q.get("utm_content"),100),
        f:q.get("fbclid")?1:0,k:q.get("ttclid")?1:0};
      return (m.s||m.m||m.c||m.t||m.f||m.k)?m:null;}catch(e){return null;}
  }
  var ft=null;
  try{var c=getCookie("dw_ft");if(c)ft=JSON.parse(decodeURIComponent(c));}catch(e){ft=null;}
  if(!live(ft)){var l=getLS("dw_ft");ft=live(l)?l:null;}
  if(!ft){
    var mk=marks(),r=extHost();
    if(mk)ft={s:mk.s,m:mk.m,c:mk.c,t:mk.t,r:r,f:mk.f,k:mk.k,ts:now};
    else if(r)ft={s:"",m:"",c:"",t:"",r:r,f:0,k:0,ts:now};
  }
  var vid=getCookie("dw_vid");
  if(!/^[a-f0-9]{16,32}$/.test(vid||"")){var lv=getLS("dw_vid");vid=(lv&&/^[a-f0-9]{16,32}$/.test(lv.v||"")&&live({ts:lv.ts}))?lv.v:null;}
  if(!vid){var a=new Uint8Array(12);(window.crypto||window.msCrypto).getRandomValues(a);
    vid=Array.prototype.map.call(a,function(b){return (b<16?"0":"")+b.toString(16);}).join("");}
  setCookie("dw_vid",vid,DAYS*86400);setLS("dw_vid",{v:vid,ts:now});
  if(ft){setCookie("dw_ft",encodeURIComponent(JSON.stringify(ft)),Math.max(60,Math.floor((ft.ts+MS-now)/1000)));setLS("dw_ft",ft);}

  // 2. Links into the app carry the first touch's UTMs (never replacing ones the link already has).
  var appHost="";try{appHost=new URL(APP).hostname;}catch(e){}
  function decorate(a){
    try{
      if(!ft||!appHost||a.hostname!==appHost)return;
      var u=new URL(a.href),add={utm_source:ft.s,utm_medium:ft.m,utm_campaign:ft.c,utm_content:ft.t};
      for(var k in add){if(add[k]&&!u.searchParams.has(k))u.searchParams.set(k,add[k]);}
      if(u.href!==a.href)a.href=u.href;
    }catch(e){}
  }
  function sweep(){var as=document.querySelectorAll("a[href]");for(var i=0;i<as.length;i++)decorate(as[i]);}
  sweep();
  var timer=null;
  if(window.MutationObserver&&ft&&appHost){
    new MutationObserver(function(){if(timer)return;timer=setTimeout(function(){timer=null;sweep();},150);})
      .observe(document.documentElement,{childList:true,subtree:true});
  }
  // A link added a moment before the press (a menu opening) is still caught.
  document.addEventListener("pointerdown",function(e){var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(a)decorate(a);},true);

  // 3. landing_view, once per tab session, production hosts only, never from an automated browser.
  if(navigator.webdriver||!/(^|\.)drawwise\.(ai|com)$/.test(host))return;
  try{if(sessionStorage.getItem("dw_fs:landing_view"))return;sessionStorage.setItem("dw_fs:landing_view","1");}catch(e){}
  var body=JSON.stringify({step:"landing_view",vid:vid,ft:ft});
  if(navigator.sendBeacon&&navigator.sendBeacon(FUN,new Blob([body],{type:"text/plain"})))return;
  fetch(FUN,{method:"POST",mode:"no-cors",keepalive:true,headers:{"content-type":"text/plain"},body:body}).catch(function(){});
}catch(e){}
})`;

/** The inline script for `appUrl` (e.g. https://app.drawwise.ai), ready to drop into a <script>. */
export function attributionScript(appUrl: string): string {
  const app = appUrl.replace(/\/+$/, "");
  return `${SCRIPT}(${JSON.stringify(app)},${JSON.stringify(`${app}/api/funnel`)});`;
}

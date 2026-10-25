import Image, { type StaticImageData } from "next/image";
import drawFit from "@/public/landing/draw-fit.jpg";
import rutCounty from "@/public/landing/rut-county.jpg";
import scoreAnimal from "@/public/landing/score-animal.jpg";
import waterfowl from "@/public/landing/waterfowl.png";

type Question = {
  question: string;
  answer: string;
  link: string;
  href: string;
  image: StaticImageData;
  /** Illustration on a forest panel instead of a product screenshot. */
  art?: boolean;
};

const QUESTIONS: Question[] = [
  {
    question: "What can my points draw?",
    answer: "Western tags ranked by your points, goals and access.",
    link: "See draw odds",
    href: "#points",
    image: drawFit,
  },
  {
    question: "When does the rut hit my county?",
    answer: "Movement and breeding windows, county by county.",
    link: "See rut timing",
    href: "#rut",
    image: rutCounty,
  },
  {
    question: "What does this buck score?",
    answer: "Upload a trail-cam or field photo for a score and maturity estimate.",
    link: "Score a photo free",
    href: "#scoring",
    image: scoreAnimal,
  },
  {
    question: "Where and when should I go?",
    answer: "Trophy, waterfowl and predator maps, plus Time to Hunt.",
    link: "Explore the maps",
    href: "#maps",
    image: waterfowl,
    art: true,
  },
];

/** The four questions hunters bring, each linking to the section that answers it. */
export function Questions() {
  return (
    <section className="questions-wrap" id="questions">
      <div className="section wrap">
        <header className="section-head">
          <p className="eyebrow">Start with your question</p>
          <h2>What are you trying to figure out?</h2>
        </header>
        <div className="question-grid">
          {QUESTIONS.map((q) => (
            <a key={q.question} className="question-card" href={q.href}>
              <div className={`question-pic${q.art ? " is-art" : ""}`}>
                <Image
                  src={q.image}
                  alt=""
                  fill
                  sizes="(min-width: 1080px) 25vw, (min-width: 650px) 50vw, 100vw"
                />
              </div>
              <div className="question-text">
                <h3>{q.question}</h3>
                <p>{q.answer}</p>
                <span className="question-link">
                  {q.link} <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
        <p className="questions-also">
          <strong>Also included:</strong> multi-year point plans, an application deadline
          calendar and an AI hunting partner that explains every answer.{" "}
          <a href="#plan">See the planning tools.</a>
        </p>
      </div>
    </section>
  );
}

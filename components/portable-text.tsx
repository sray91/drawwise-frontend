import {
  PortableText as PortableTextRenderer,
  type PortableTextBlock,
  type PortableTextComponents,
} from "@portabletext/react";
import { SanityImage } from "./sanity-image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure>
        <SanityImage
          image={value}
          width={1200}
          height={675}
          sizes="(min-width: 768px) 720px, 100vw"
        />
        {value?.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    codeBlock: ({ value }) => (
      <pre>
        <code>{value?.code}</code>
      </pre>
    ),
    table: ({ value }) => {
      const rows: { _key?: string; cells?: string[] }[] = value?.rows ?? [];
      if (rows.length === 0) return null;
      const [head, ...body] = rows;
      return (
        <div className="post-table">
          {value?.caption && <p className="post-table-caption">{value.caption}</p>}
          <table>
            <thead>
              <tr>
                {(head.cells ?? []).map((cell, i) => (
                  <th key={i} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, r) => (
                <tr key={row._key ?? r}>
                  {(row.cells ?? []).map((cell, i) => (
                    <td key={i}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose-post">
      <PortableTextRenderer value={value} components={components} />
    </div>
  );
}

import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A simple table for post bodies. The first row is rendered as the header.
 */
export const tableRowType = defineType({
  name: "tableRow",
  title: "Row",
  type: "object",
  fields: [
    defineField({
      name: "cells",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
  ],
  preview: {
    select: { cells: "cells" },
    prepare({ cells }: { cells?: string[] }) {
      return { title: (cells ?? []).join(" | ") };
    },
  },
});

export const tableType = defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      type: "string",
      description: "Optional label shown above the table.",
    }),
    defineField({
      name: "rows",
      type: "array",
      of: [defineArrayMember({ type: "tableRow" })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { caption: "caption", rows: "rows" },
    prepare({ caption, rows }: { caption?: string; rows?: unknown[] }) {
      return {
        title: caption || "Table",
        subtitle: `${rows?.length ?? 0} rows`,
      };
    },
  },
});

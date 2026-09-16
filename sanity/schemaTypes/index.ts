import type { SchemaTypeDefinition } from "sanity";
import { authorType } from "./authorType";
import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { tableRowType, tableType } from "./tableType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    tableType,
    tableRowType,
  ],
};

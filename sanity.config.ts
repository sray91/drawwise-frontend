"use client";

/**
 * Sanity Studio configuration. The Studio is embedded at /studio
 * (see app/studio/[[...tool]]/page.tsx).
 */
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { codeInput } from "@sanity/code-input";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId: projectId || "",
  dataset,
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
  ],
});

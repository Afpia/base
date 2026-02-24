declare module "@afpia/commitlint" {
  export const commitlint: import("@commitlint/types").UserConfig;
}

declare module "conventional-changelog-conventionalcommits" {
  import type { ParserPreset } from "@commitlint/types";

  export default function createPreset(): Promise<ParserPreset>;
}
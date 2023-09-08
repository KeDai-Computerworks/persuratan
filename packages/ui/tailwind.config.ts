import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config/";

import { shadcnPlugin } from "./lib/shadcn-plugin";

export default {
  content: [""],
  presets: [baseConfig],
  plugins: [shadcnPlugin],
} satisfies Config;

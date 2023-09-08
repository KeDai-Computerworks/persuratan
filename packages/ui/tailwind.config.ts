import type { Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config/";
import { shadcnPlugin } from "@acme/tailwind-config/lib/shadcn-plugin";

export default {
  content: [""],
  presets: [baseConfig],
  plugins: [shadcnPlugin],
} satisfies Config;

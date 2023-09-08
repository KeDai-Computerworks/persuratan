import type { Config } from "tailwindcss";

import baseUIConfig from "@acme/ui/tailwind.config";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "../../packages/ui/components/**/*.{ts,tsx}",
  ],
  presets: [baseUIConfig],
} satisfies Config;

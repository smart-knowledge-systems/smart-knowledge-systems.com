import nextPlugin from "eslint-config-next";

const config = [{ ignores: ["convex/_generated/"] }, ...nextPlugin];

export default config;

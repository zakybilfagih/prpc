import solid from "solid-start/vite";
import { defineConfig } from "vite";
import prpc from "./prpc";

export default defineConfig(() => {
  return {
    plugins: [prpc(), solid({ ssr: true })],
  };
});

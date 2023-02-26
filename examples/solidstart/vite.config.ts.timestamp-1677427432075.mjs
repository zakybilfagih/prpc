// vite.config.ts
import solid from "file:///home/tannerscadden/neddaxs/oss/prpc/node_modules/.pnpm/solid-start@0.2.22_glxabd56qh7kqtjq7bhdxxj5jy/node_modules/solid-start/vite/plugin.js";
import { defineConfig } from "file:///home/tannerscadden/neddaxs/oss/prpc/node_modules/.pnpm/vite@4.1.4_@types+node@18.14.1/node_modules/vite/dist/node/index.js";
import prpc from "file:///home/tannerscadden/neddaxs/oss/prpc/packages/solid/dist/server.js";
var vite_config_default = defineConfig(() => {
  return {
    plugins: [prpc(), solid({ ssr: true })]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS90YW5uZXJzY2FkZGVuL25lZGRheHMvb3NzL3BycGMvZXhhbXBsZXMvc29saWRzdGFydFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdGFubmVyc2NhZGRlbi9uZWRkYXhzL29zcy9wcnBjL2V4YW1wbGVzL3NvbGlkc3RhcnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdGFubmVyc2NhZGRlbi9uZWRkYXhzL29zcy9wcnBjL2V4YW1wbGVzL3NvbGlkc3RhcnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgc29saWQgZnJvbSAnc29saWQtc3RhcnQvdml0ZSdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgcHJwYyBmcm9tICdAcHJwYy9zb2xpZCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBwbHVnaW5zOiBbcHJwYygpLCBzb2xpZCh7IHNzcjogdHJ1ZSB9KV0sXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBWLE9BQU8sV0FBVztBQUM1VyxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFVBQVU7QUFFakIsSUFBTyxzQkFBUSxhQUFhLE1BQU07QUFDaEMsU0FBTztBQUFBLElBQ0wsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLEVBQUUsS0FBSyxLQUFLLENBQUMsQ0FBQztBQUFBLEVBQ3hDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
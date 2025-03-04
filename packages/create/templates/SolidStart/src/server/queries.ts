import { query$ } from "@prpc/solid";
import { z } from "zod";
  
export const helloQuery = query$(
  ({ payload }) => {
    return `server says hello: ${payload.name}`;
  },
  "hello",
  z.object({ name: z.string() })
);

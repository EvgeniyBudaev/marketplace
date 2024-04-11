import { z } from "zod";

export const statusItemSchema = z.object({
  id: z.number(),
  name: z.string(),
});

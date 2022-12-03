import type { z } from "zod";
import {catalogDetailSchema} from "./schemas";

export type TCatalog = z.infer<typeof catalogDetailSchema>;

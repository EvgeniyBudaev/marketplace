import type { z } from "zod";
import {productsItemSchema, productsSchema} from "./schemas";

export type TProduct = z.infer<typeof productsItemSchema>;

export type TProducts = z.infer<typeof productsSchema>;
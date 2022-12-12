import type z from 'zod';
import type { formSchema } from './schemas';

export type TForm = z.infer<typeof formSchema>;

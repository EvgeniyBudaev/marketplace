import { z } from 'zod';
import {EFormFields} from "~/pages/Auth/Login/enums";

export const formSchema = z.object({
    [EFormFields.Email]: z.string().trim(),
    [EFormFields.Password]: z.string().trim(),
});
import z from 'zod';
import {MAX_FILE_AMOUNT, MAX_FILE_SIZE} from "~/shared/api/upload";
import type {TFieldValue, TFilesArgs} from "~/shared/api/upload";
import {EMPTY_FIELD_ERROR_MESSAGE, FILE_MAX_AMOUNT_MESSAGE, FILE_MAX_SIZE_MESSAGE} from "~/shared/validation";

export const fileSchema = z.custom<TFieldValue>();

export const filesSchema = ({isEmpty}: TFilesArgs = {}) =>
  z
    .array(fileSchema, {required_error: EMPTY_FIELD_ERROR_MESSAGE})
    .refine((files) => (isEmpty ? true : !!files.length), {message: EMPTY_FIELD_ERROR_MESSAGE})
    .refine((files) => files.length <= MAX_FILE_AMOUNT, {message: FILE_MAX_AMOUNT_MESSAGE})
    .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
      message: FILE_MAX_SIZE_MESSAGE,
    });
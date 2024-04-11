import { InputError, makeDomainFunction } from "remix-domains";
import type { DomainFunction } from "remix-domains";
// import { serverError } from "remix-utils";
import { z } from "zod";
import { INPUT_ERROR_PATH } from "#app/constants";

type ApiDomainFunction = <
  InputSchema extends z.ZodTypeAny,
  OutputSchema extends z.ZodTypeAny
>(
  inputSchema?: InputSchema,
  outputSchema?: OutputSchema
) => <Output = z.infer<OutputSchema>>(
  handler: (request: Request, input: z.infer<InputSchema>) => Promise<Output>
) => DomainFunction<Output>;

/**
 * Функция создания доменной функции с возможностью проброса ошибок от http client
 *
 * @param inputSchema схема для аргумента
 * @param outputSchema схема для результата функции
 */
export const apiDomainFunction: ApiDomainFunction =
  (inputSchema, outputSchema) => (handler) => {
    const fn = async (request: Request, input?: unknown) => {
      const validation = inputSchema?.safeParse(input);

      if (validation && !validation.success) {
        const { error } = validation;

        return makeDomainFunction(z.any())(async () => {
          throw new InputError(error.message, INPUT_ERROR_PATH);
        })(z.any);
      }

      const data = await handler(request, input);
      const parsedData = outputSchema?.safeParse(data);

      if (parsedData && !parsedData.success) {
        // throw serverError(
        //   {
        //     error: parsedData.error,
        //     responseData: data,
        //   },
        //   {
        //     statusText: "Response data validation error",
        //   },
        // );
      }

      return makeDomainFunction(z.any())(async () =>
        parsedData ? parsedData?.data : data
      )(z.any);
    };

    return fn as DomainFunction<Awaited<ReturnType<typeof handler>>>;
  };

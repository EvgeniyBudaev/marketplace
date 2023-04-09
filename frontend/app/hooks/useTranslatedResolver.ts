import {useCallback} from "react";
import type {FieldValues, Resolver, ResolverOptions} from "react-hook-form";
import {useTranslation} from "react-i18next";

export const useTranslatedResolver = <TFieldValues extends FieldValues, TContext = any>(
    resolver: Resolver<TFieldValues, TContext>,
) => {
    const { t } = useTranslation();

    return useCallback(
        async (values: TFieldValues, context: TContext, options: ResolverOptions<TFieldValues>) => {
            const data = await resolver(values, context, options);

            return {
                values: data.values,
                errors: Object.fromEntries(
                    Object.entries(data.errors).map(([field, error]) => {
                        return [
                            field,
                            error && {
                                ...error,
                                message: error.message && t(error.message.toString()),
                            },
                        ];
                    }),
                ),
            };
        },
        [resolver, t],
    );
};
import {useEffect} from "react";
import type {FieldValues, Path} from "react-hook-form";
import {useTranslation} from "react-i18next";
import type {TUseInitFormReturn} from "~/shared/form";

export const useTranslatedForm = <T extends FieldValues>(
    form: TUseInitFormReturn<T>,
): TUseInitFormReturn<T> => {
    const { t } = useTranslation();

    useEffect(() => {
        form.methods.trigger(
            Object.entries(form.methods.getValues())
                .filter(([_field, value]) => value)
                .map(([field]) => field) as Path<T>[],
        );
    }, [form.methods, t]);

    return form;
};
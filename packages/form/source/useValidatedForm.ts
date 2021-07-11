import { AnyObjectSchema } from "yup";
import { DefaultValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

export default function useValidatedForm<FormType>(
  schema: AnyObjectSchema,
  defaultValues: DefaultValues<FormType> = undefined
) {
  const [errorCount, setErrorCount] = useState(0);
  const baseForm = useForm<FormType>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { submitCount, errors } = baseForm.formState;

  useEffect(() => {
    const hasError = Object.keys(errors).length > 0;
    if (hasError) setErrorCount((e) => e++);
  }, [submitCount]);

  // const handleSubmit = useCallback(
  //   <Return = any>(
  //     onValid: SubmitHandler<FormType>,
  //     onInvalid?: SubmitErrorHandler<FormType>
  //   ): ((e?: React.BaseSyntheticEvent) => Promise<Return>) => {
  //     let valueToReturn: Return;
  //     return (e?: React.BaseSyntheticEvent) => {
  //       const submitWithSet = baseForm.handleSubmit((entity) => {
  //         (onValid(entity) as Promise<Return>).then(
  //           (result) => (valueToReturn = result)
  //         );
  //       }, onInvalid);
  //       return submitWithSet(e).then(() => valueToReturn);
  //     };
  //   },
  //   [baseForm]
  // );

  return { ...baseForm, errorCount };
}

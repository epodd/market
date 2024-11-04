import _ from "lodash";

export const validateForm = (validateSchema: any, values: any) => {
  const errorsSchema = validateSchema.validate(values, {
    abortEarly: false,
  });

  const errors = errorsSchema.error?.details.reduce(
    (errors: any, error: any, i: number) => {
      _.update(errors, error.path, (current = []) => {
        return error.message;
      });
      return errors;
    },
    {}
  );
  return errors;
};

export const showErrorOnChange = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}: any) =>
  !!(
    ((submitError && !dirtySinceLastSubmit) || error) &&
    (touched || modified)
  );

export const showErrorOnBlur: any = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched },
}: any) => !!(((submitError && !dirtySinceLastSubmit) || error) && touched);

import React, { FC } from "react";
import { Formik, FormikHelpers, FormikProps } from "formik";

type Values = Record<string, any>;
export interface Props {
  initialValues: Values;
  children?: (props: FormikProps<Values>) => React.ReactNode;
  onSubmit: (...any: any[]) => void | Promise<any>;
}

export const Form: FC<Props> = ({ initialValues, onSubmit, children }) => {
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formikProps) => {
          const { handleSubmit } = formikProps;
          return (
            <form onSubmit={handleSubmit} data-testid="form">
              {children && children(formikProps)}
              <button type="submit">Send</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

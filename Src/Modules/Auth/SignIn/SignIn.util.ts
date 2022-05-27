import { FormikErrors } from 'formik';
import { SignInFormModel } from '@models';
import { isNotNullOrEmpty } from '@utils';

export function isRemainingToFillForm(values: SignInFormModel, errors: FormikErrors<SignInFormModel>): boolean {
  const isError = isNotNullOrEmpty(errors.email) || isNotNullOrEmpty(errors.password);
  const isNoValue = !isNotNullOrEmpty(values.email) || !isNotNullOrEmpty(values.password);

  return isError || isNoValue;
}

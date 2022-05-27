//@ts-nocheck
import { translate } from '@configs';

const codePush = Object.freeze({
  textCheckingForUpdate: translate('textCheckingForUpdate'),
  textAwaitingUserAction: translate('textAwaitingUserAction'),
  textInstallingUpdate: translate('textInstallingUpdate'),
  textAppUpToDate: translate('textAppUpToDate'),
  textUpdateCancelledByUser: translate('textUpdateCancelledByUser'),
  textUpdateInstalledAndWillBeAppliedOnRestart: translate('textUpdateInstalledAndWillBeAppliedOnRestart'),
  textAnUnknownErrorOccurred: translate('textAnUnknownErrorOccurred'),
  textDownloadingPackage: translate('textDownloadingPackage'),
  btnRestart: translate('btnRestart')
});

const apiError = Object.freeze({
  network: translate('msgNetworkError'),
  server: translate('msgServerError'),
  somethingWentWrong: translate('msgSomethingWentWrong'),
  cancelSaga: translate('msgCancelSagaError'),
  processingVideo: translate('msgProcessingVideo'),
  processingError: translate('msgProcessingError')
});

const yupError = Object.freeze({
  requireEmail: translate('msgRequireEmail'),
  validEmail: translate('msgValidEmail'),
  requirePassword: translate('msgRequirePassword')
});

const message = Object.freeze({
  copyLinkSuccess: translate('copyLinkSuccess')
});

const imagePicker = Object.freeze({
  textSelectAPhoto: translate('textSelectAPhoto'),
  listSelectAPhoto: [
    translate('listItemTakePhoto'),
    translate('listItemChooseFromLibrary'),
    translate('listItemCancel')
  ]
});

const signIn = Object.freeze({
  textEmail: translate('textEmail'),
  inputEmail: translate('inputEmail'),
  textPassword: translate('textPassword'),
  inputPassword: translate('inputPassword'),
  btnSignIn: translate('btnSignIn'),
  textSignInDesc: translate('textSignInDesc')
});

const StringConst = Object.freeze({
  codePush,
  apiError,
  yupError,
  message,
  imagePicker,
  signIn
});

export default StringConst;

import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Alert as CAlert } from 'components/Atoms';
export default {
    title: 'Atoms/Alert',
    component: CAlert,
};
export const Alert = (args) => _jsx(CAlert, Object.assign({}, args));
Alert.args = {
    title: 'Error',
    text: 'An Error is a subclass of Throwable that indicates serious problems that a reasonable ' +
        'application should not try to catch. Most such errors are abnormal conditions. ' +
        'The ThreadDeath error, though a "normal" condition, is also a subclass of Error because ' +
        'most applications should not try to catch it.\n' +
        'A method is not required to declare in its throws clause any subclasses of ' +
        'Error that might be thrown during the execution of the method but not caught, ' +
        'since these errors are abnormal conditions that should never occur. That is, ' +
        'Error and its subclasses are regarded as unchecked exceptions for the purposes of ' +
        'compile-time checking of exceptions.\n' +
        '\n',
    buttonText: '확인',
    disableEscapeKeyDown: false,
    disableBackdropClick: false,
    open: true,
};

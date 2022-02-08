
import { login } from './login.js';
import { formTemplateRegister } from './registerForm.js';
import { resetPassword } from './reset_password.js';
import{headerTemplate} from './header.js'
import { emailConfirm } from './confirmEmail.js'


export const components = {
    Login: login,
    Registro: formTemplateRegister,
    ResetPassword: resetPassword,
    Header: headerTemplate,
    Message: emailConfirm,
}



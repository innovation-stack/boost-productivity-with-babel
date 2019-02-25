import {
  loginTemplate
} from '../../../tenant';
import LoginCtrl from '../controllers/login.controller';

export const LoginComponent = {
  template: loginTemplate,
  controller: LoginCtrl,
  controllerAs: 'loginVm'
};

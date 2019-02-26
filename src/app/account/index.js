import AccountService from './services/account.service';
import {} from '../../tenant';
import {
  ACCOUNT_SERVICE,
  ACCOUNT_STATES,
  LOGIN_COMPONENT,
} from './entities';
import {
  LoginComponent
} from './components/login.component';
import { $STATE_PROVIDER_SERVICE } from '../common/entities';

accountConfig.$inject = [$STATE_PROVIDER_SERVICE];

function accountConfig($stateProvider) {
  const LOGIN_URL = `/${ACCOUNT_STATES.LOGIN}`;
  $stateProvider
    .state(ACCOUNT_STATES.LOGIN, {
      url: LOGIN_URL,
      component: LOGIN_COMPONENT
    });
}

export function instantiateAccountFeature(app) {
  app.config(accountConfig);
  app.component(LOGIN_COMPONENT, LoginComponent);
  app.service(ACCOUNT_SERVICE, AccountService);
}
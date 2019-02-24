import AccountService from './services/account.service';
import {
    loginTemplate
} from '../../tenant';
import {
    ACCOUNT_SERVICE,
    ACCOUNT_STATES,
    LOGIN_COMPONENT,
} from './entities';
import { LoginComponent } from './components/login.component';

accountConfig.$inject = ['$stateProvider'];
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
import {
    $STATE_PROVIDER_SERVICE
} from '../common/entities';
import {
    USER_STATES,
    USERS_COMPONENT,
    USER_COMPONENT
} from './entities';

configureRoutes.$inject = [$STATE_PROVIDER_SERVICE];
export default function configureRoutes($stateProvider) {
    const USERS_URL = `/${USER_STATES.USERS}`
    const USER_URL = `/${USER_STATES.USERS}/:id`;

    $stateProvider.state(USER_STATES.USERS, {
        url: USERS_URL,
        component: USERS_COMPONENT
    });

    $stateProvider.state(USER_STATES.USER, {
        url: USER_URL,
        component: USER_COMPONENT
    });
}

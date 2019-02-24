import {
    HOME_COMPONENT,
    HOME_STATES
} from './entities';
import { HomeComponent } from './components/home.component';
import {
    $STATE_PROVIDER_SERVICE,
    $URL_ROUTER_PROVIDER_SERVICE
} from '../common/entities';

homeConfig.$inject = [$STATE_PROVIDER_SERVICE, $URL_ROUTER_PROVIDER_SERVICE];
function homeConfig($stateProvider, $urlRouterProvider) {
    const HOME_URL = `/${HOME_STATES.HOME}`;
    $stateProvider
        .state(HOME_STATES.HOME, {
            url: HOME_URL,
            component: HOME_COMPONENT
        });
    $urlRouterProvider.otherwise(HOME_URL);
}

export function instantiateHomeFeature(app) {
    app.config(homeConfig);
    app.component(HOME_COMPONENT, HomeComponent);
}

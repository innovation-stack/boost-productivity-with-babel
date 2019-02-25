import AppCtrl from './controllers/app.controller';
import {
  APP_CONTROLLER,
  PUB_SUB_SERVICE
} from './entities';
import PubSubService from './services/pubsub.service';

appConfig.$inject = ['$locationProvider'];

function appConfig($locationProvider) {
  $locationProvider.html5Mode(true);
}

export function instantiateCommonFeatures(app) {
  app.config(appConfig);
  app.controller(APP_CONTROLLER, AppCtrl);
  app.service(PUB_SUB_SERVICE, PubSubService);
}
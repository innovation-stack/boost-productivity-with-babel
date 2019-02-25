import './tenant';
import 'jquery';
import angular from 'angular';
import '@uirouter/angularjs';
import {
  instantiateFeatures
} from './app';

const APP_NAME = 'myApp';

export function instantiateAngular() {
  return angular.module(APP_NAME, [
    'ui.router'
  ]);
}

export function bootstrapAngular() {
  angular.element(document).ready(() => {
    angular.bootstrap(document, [APP_NAME]);
  });
}

function renderApp() {
  const app = instantiateAngular();
  instantiateFeatures(app);
  bootstrapAngular();
}

renderApp();
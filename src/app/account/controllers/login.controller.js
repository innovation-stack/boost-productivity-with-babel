import {
  ACCOUNT_SERVICE
} from '../entities';
import {
  $INJECTOR_SERVICE,
  $STATE_SERVICE
} from '../../common/entities';
import {
  HOME_STATES
} from '../../home/entities';

const injections = new WeakMap();

class LoginCtrl {
  user = {};
  loginForm = undefined;

  static $inject = [
    $INJECTOR_SERVICE,
    $STATE_SERVICE
  ];

  constructor(
    $InjectorService,
    $StateService
  ) {
    injections.set(this, {
      $StateService: $StateService,
      AccountService: $InjectorService.get(ACCOUNT_SERVICE)
    });
  }

  loginUser() {
    if (this.loginForm.$valid) {
      const {
        $StateService,
        AccountService
      } = injections.get(this);
      AccountService.login(this.user);
      this.user = {};
      $StateService.go(HOME_STATES.HOME);
    }
  }
}

export default LoginCtrl;
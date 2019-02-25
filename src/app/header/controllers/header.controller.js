import {
  $INJECTOR_SERVICE,
  $STATE_SERVICE,
  PUB_SUB_SERVICE
} from '../../common/entities';
import {
  PUB_SUB_EVENTS
} from '../../common/events';
import {
  ACCOUNT_SERVICE
} from '../../account/entities';
import {
  HOME_STATES
} from '../../home/entities';

const injections = new WeakMap();

class HeaderCtrl {
  user = undefined;
  unsubscribeLoginChangeEvent;

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
      PubSubService: $InjectorService.get(PUB_SUB_SERVICE),
      AccountService: $InjectorService.get(ACCOUNT_SERVICE)
    });
  }

  $onInit() {
    const {
      PubSubService
    } = injections.get(this);
    this.unsubscribeLoginChangeEvent = PubSubService.subscribe(PUB_SUB_EVENTS.ACCOUNT.LOGIN_CHANGE, (data) => {
      this.user = data.user;
    });
  }

  $onDestroy() {
    this.unsubscribeLoginChangeEvent && this.unsubscribeLoginChangeEvent();
  }

  logout() {
    const {
      $StateService,
      AccountService
    } = injections.get(this);
    AccountService.logout();
    $StateService.go(HOME_STATES.HOME);
  }
}

export default HeaderCtrl;
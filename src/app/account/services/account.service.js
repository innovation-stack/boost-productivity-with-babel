import {
  $INJECTOR_SERVICE,
  PUB_SUB_SERVICE
} from '../../common/entities';
import {
  PUB_SUB_EVENTS
} from '../../common/events';

class AccountService {
  user;

  static $inject = [
    $INJECTOR_SERVICE
  ];

  constructor(
    $InjectorService
  ) {
    this.PubSubService = $InjectorService.get(PUB_SUB_SERVICE);
  }

  persistUser(user) {
    delete user.password;
    this.user = user;
  }

  login(user) {
    if (user.email === 'test@test.com' && user.password === 'test') {
      this.persistUser(user);
      this.PubSubService.publish(PUB_SUB_EVENTS.ACCOUNT.LOGIN_CHANGE, user);
    }
  }

  isLoggedIn() {
    return !!this.user;
  }

  logout() {
    this.PubSubService.publish(PUB_SUB_EVENTS.ACCOUNT.LOGIN_CHANGE, undefined);
  }
}

export default AccountService;
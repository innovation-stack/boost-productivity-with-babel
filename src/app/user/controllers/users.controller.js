import {
  $INJECTOR_SERVICE,
  $STATE_SERVICE
} from '../../common/entities';
import {
  USER_SERVICE
} from '../entities';
import {
  ACCOUNT_SERVICE,
  ACCOUNT_STATES
} from '../../account/entities';

class UsersCtrl {
  isLoading = false;
  users = [];

  static $inject = [
    $INJECTOR_SERVICE,
    $STATE_SERVICE
  ];

  constructor(
    $InjectorService,
    $StateService
  ) {
    this.$StateService = $StateService;
    this.UsersService = $InjectorService.get(USER_SERVICE);
    this.AccountService = $InjectorService.get(ACCOUNT_SERVICE);
  }

  $onInit() {
    if (!this.AccountService.isLoggedIn()) {
      this.$StateService.go(ACCOUNT_STATES.LOGIN);
      return;
    }
    this.fetchUsers();
  }

  fetchUsers() {
    this.isLoading = true;
    const promise = this.UsersService.getAllUsers();
    promise.then((response) => {
      this.users = response.data;
    }).catch(() => {
      this.users = [];
    }).finally(() => {
      this.isLoading = false;
    });
  }
}

export default UsersCtrl;
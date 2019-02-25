import {
  usersTemplate
} from '../../../tenant';
import UsersCtrl from '../controllers/users.controller';

export const UsersComponent = {
  template: usersTemplate,
  controller: UsersCtrl,
  controllerAs: 'usersVm'
};
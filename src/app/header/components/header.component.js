import HeaderCtrl from '../controllers/header.controller';
import {
  headerTemplate
} from '../../../tenant';

export const HeaderComponent = {
  template: headerTemplate,
  controller: HeaderCtrl,
  controllerAs: 'headerVm'
};
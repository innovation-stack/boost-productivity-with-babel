import { userTemplate } from "../../../tenant";
import UserCtrl from "../controllers/user.controller";

export const UserComponent = {
    template: userTemplate,
    controller: UserCtrl,
    controllerAs: 'userVm'
};

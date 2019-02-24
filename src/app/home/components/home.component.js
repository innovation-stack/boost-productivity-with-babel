import { homeTemplate } from "../../../tenant";
import HomeCtrl from "../controllers/home.controller";

export const HomeComponent = {
    template: homeTemplate,
    controller: HomeCtrl,
    controllerAs: 'homeVm'
};

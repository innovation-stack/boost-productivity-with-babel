import { HEADER_COMPONENT } from "./entities";
import { HeaderComponent } from './components/header.component';

export function instantiateHeaderFeature(app) {
    app.component(HEADER_COMPONENT, HeaderComponent);
}

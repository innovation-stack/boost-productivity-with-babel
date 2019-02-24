import {
    USERS_COMPONENT,
    USER_SERVICE,
    USER_API_SERVICE,
    USER_API_SERVICE_PROVIDER,
    USER_COMPONENT,
    ALBUM_SERVICE,
    PHOTO_SERVICE
} from './entities';
import {
    UsersComponent
} from './components/users.component';
import UsersService from './services/user.service';
import UserApiServiceProvider from './services/user-api.service';
import { UserComponent } from "./components/user.component";
import configureRoutes from './routing';
import AlbumService from './services/album.service';
import PhotoService from './services/photo.service';

configureApis.$inject = [USER_API_SERVICE_PROVIDER];
function configureApis(UserApiServiceProvider) {
    UserApiServiceProvider.setBaseUrl('https://jsonplaceholder.typicode.com');
}

export function instantiateUserFeature(app) {
    app.config(configureRoutes);
    app.config(configureApis);
    app.component(USERS_COMPONENT, UsersComponent);
    app.component(USER_COMPONENT, UserComponent);
    app.service(USER_SERVICE, UsersService);
    app.service(ALBUM_SERVICE, AlbumService);
    app.service(PHOTO_SERVICE, PhotoService);
    app.provider(USER_API_SERVICE, UserApiServiceProvider);
}

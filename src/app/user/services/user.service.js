import {
    $INJECTOR_SERVICE,
    $HTTP_SERVICE,
    $Q_SERVICE
} from '../../common/entities';
import {
    USER_API_SERVICE
} from '../entities';

const injections  = new WeakMap();

function modifyUserResponse(users) {
    users.forEach((user) => {
        user.nameWithUsername = `${user.name} (${user.username})`;
    });
}

class UserService {
    static $inject = [
        $INJECTOR_SERVICE,
        $HTTP_SERVICE
    ];

    constructor(
        $InjectorService,
        $HttpService
    ) {
        injections.set(this, {
            $HttpService: $HttpService,
            UserApiService: $InjectorService.get(USER_API_SERVICE),
            QService: $InjectorService.get($Q_SERVICE)
        });
    }

    getAllUsers() {
        const {$HttpService, UserApiService} = injections.get(this);
        const usersEndpoint = `${UserApiService.baseUrl}/users`;
        return $HttpService.get(usersEndpoint)
            .then((response) => {
                modifyUserResponse(response.data);
                return response;
            });
    }

    getUser(userId) {
        const {$HttpService, QService,  UserApiService} = injections.get(this);
        const userEndpoint = `${UserApiService.baseUrl}/users/${userId}`;
        const defer = QService.defer();
        if (userId) {
            $HttpService.get(userEndpoint)
                .then((response) => {
                    defer.resolve(response);
                }).catch((response) => {
                    defer.reject(response);
                });
        } else {
            defer.reject('No User Id');
        }
        return defer.promise;
    }
}

export default UserService;

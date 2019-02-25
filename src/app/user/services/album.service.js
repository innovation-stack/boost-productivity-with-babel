import {
  $HTTP_SERVICE,
  $INJECTOR_SERVICE
} from '../../common/entities';
import {
  USER_API_SERVICE
} from '../entities';

const injections = new WeakMap();

class AlbumService {
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
      UserApiService: $InjectorService.get(USER_API_SERVICE)
    });
  }

  getUserAlbums(userId) {
    const {
      $HttpService,
      UserApiService
    } = injections.get(this);
    const albumsEndpoint = `${UserApiService.baseUrl}/users/${userId}/albums`;
    return $HttpService.get(albumsEndpoint);
  }
}

export default AlbumService;
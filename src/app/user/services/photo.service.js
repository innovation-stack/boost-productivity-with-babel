import {
  $HTTP_SERVICE,
  $INJECTOR_SERVICE
} from '../../common/entities';
import {
  USER_API_SERVICE
} from '../entities';

const injections = new WeakMap();

class PhotoService {
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

  getUserAlbumPhotos(albumId) {
    const {
      $HttpService,
      UserApiService
    } = injections.get(this);
    const photosEndpoint = `${UserApiService.baseUrl}/photos?albumId=${albumId}`;
    return $HttpService.get(photosEndpoint);
  }
}

export default PhotoService;
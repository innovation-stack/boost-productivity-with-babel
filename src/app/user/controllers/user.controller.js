import {
  USER_SERVICE, ALBUM_SERVICE, PHOTO_SERVICE
} from "../entities";
import {
  $STATE_SERVICE,
  $INJECTOR_SERVICE
} from "../../common/entities";
import {
  ACCOUNT_SERVICE,
  ACCOUNT_STATES
} from "../../account/entities";

const injections = new WeakMap();

class UserCtrl {
  isLoading = false;
  user = undefined;
  userId = undefined;
  albums = [];
  photos = [];
  error = undefined;

  static $inject = [
    $INJECTOR_SERVICE,
    $STATE_SERVICE
  ];

  constructor(
    $InjectorService,
    $StateService
  ) {
    injections.set(this, {
      $StateService: $StateService,
      UserService: $InjectorService.get(USER_SERVICE),
      AlbumService: $InjectorService.get(ALBUM_SERVICE),
      PhotoService: $InjectorService.get(PHOTO_SERVICE),
      AccountService: $InjectorService.get(ACCOUNT_SERVICE)
    });
  }

  $onInit() {
    const {
      $StateService,
      AccountService
    } = injections.get(this);
    this.userId = $StateService.params.id;

    if (!AccountService.isLoggedIn() || !this.userId) {
      $StateService.go(ACCOUNT_STATES.LOGIN);
      return;
    }
    this.fetchUser(this.userId);
  }

  fetchUser(userId) {
    const {
      UserService
    } = injections.get(this);
    this.isLoading = true;

    UserService.getUser(userId)
      .then((response) => {
        this.user = response.data;
        this.error = undefined;
      }).then(() => {
        return this.fetchUserAlbums(userId);
      }).catch((response) => {
        this.error = response.data;
      }).finally(() => {
        this.isLoading = false;
      });
  }

  fetchUserAlbums(userId) {
    const {
      AlbumService
    } = injections.get(this);
    return AlbumService.getUserAlbums(userId)
      .then((response) => {
        this.albums = response.data;
      });
  }

  fetchAlbumPhotos(event, album) {
    const {
      PhotoService
    } = injections.get(this);
    event.preventDefault();
    if (album && album.photos) {
      this.photos = album.photos;
    } else {
      PhotoService.getUserAlbumPhotos(album.id)
        .then((response) => {
          album.photos = response.data;
          this.photos = album.photos;
        });
    }
  }
}

export default UserCtrl;
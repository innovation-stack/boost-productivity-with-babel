import { instantiateCommonFeatures } from './common';
import { instantiateAccountFeature } from './account';
import { instantiateHeaderFeature } from './header';
import { instantiateHomeFeature } from './home';
import { instantiateUserFeature } from './user';

export function instantiateFeatures(app) {
    instantiateCommonFeatures(app);
    instantiateHeaderFeature(app);
    instantiateHomeFeature(app);
    instantiateAccountFeature(app);
    instantiateUserFeature(app);
}

import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'ngx-webstorage-service';

import { ATStorageKey } from '../../constants/at-storage-key/at-storage-key.const';

@Injectable({
  providedIn: 'root'
})
export class AccessTokenService {
  constructor(
    @Inject(LOCAL_STORAGE) public webStorageService: WebStorageService
  ) {}

  async storeAccessToken(accessToken: string) {
    await this.webStorageService.set(ATStorageKey, accessToken);
  }

  async retrieveAccessToken() {
    return (await this.webStorageService.get(ATStorageKey)) as string;
  }

  async removeAccessToken() {
    await this.webStorageService.remove(ATStorageKey);
  }
}

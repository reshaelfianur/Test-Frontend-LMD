import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private key: string = 'users';

  constructor(private commonService: CommonService) { }

  message() {
    return this.commonService.message;
  }

  list(params?: string) {
    return this.commonService.list(this.key, params);
  }

  get(params: string) {
    return this.commonService.get(this.key, params);
  }

  add(params: string) {
    return this.commonService.add(this.key, params);
  }

  update(params: string) {
    return this.commonService.update(this.key, params);
  }

  delete(params: string) {
    return this.commonService.delete(this.key, params);
  }

  upload(params: string) {
    return this.commonService.upload(this.key, params);
  }

  resetPassword(params: string) {
    return this.commonService.taskPut(this.key, "reset-password", params);
  }

  extraData(param: string) {
    return this.commonService.getExtraData(param);
  }

  unique(params: string) {
    return this.commonService.taskGet(this.key, "unique", params);
  }

  getAccessRights(params: string) {
    return this.commonService.taskGet(this.key, "get-access-rights", params, false);
  }

  findInvalidControls(control: any) {
    return this.commonService.findInvalidControlsRecursive(control);
  }

}

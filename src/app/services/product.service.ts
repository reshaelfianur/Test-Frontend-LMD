import { Injectable } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private key: string = 'products';

  constructor(private _commonService: CommonService) { }

  message() {
    return this._commonService.message;
  }

  list(params?: string) {
    return this._commonService.list(this.key, params);
  }

  get(params: string) {
    return this._commonService.get(this.key, params);
  }

  add(params: string) {
    return this._commonService.add(this.key, params);
  }

  update(params: string) {
    return this._commonService.update(this.key, params);
  }

  delete(params: string) {
    return this._commonService.delete(this.key, params);
  }

  upload(params: string) {
    return this._commonService.upload(this.key, params);
  }

  extraData(param: string) {
    return this._commonService.getExtraData(param);
  }

  unique(params: string) {
    return this._commonService.taskGet(this.key, "unique", params);
  }

}

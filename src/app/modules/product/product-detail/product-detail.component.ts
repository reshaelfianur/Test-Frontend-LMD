import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() columns: Product;

  public title: string = 'Product Detail';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.columns);
  }

  close() {
    this.activeModal.close();
  }

  update() {
  }

}

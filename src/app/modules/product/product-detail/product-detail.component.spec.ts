import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductDetailComponent } from './product-detail.component';

import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [
        NgbModule,
      ],
      providers: [
        NgbActiveModal,
        NgbModal,
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    component.columns = {
      id: 1,
      name: "Licensed Granite Shirt",
      slug: "ut-voluptatem-ipsum",
      image: "http://placeimg.com/640/480/nightlife",
      color: "indigo",
      price: 11.00,
      product: "Hat",
      material: "Metal",
      adjective: "Handmade",
      description: "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      createdAt: new Date("2021-09-19T05:01:26.686Z"),
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

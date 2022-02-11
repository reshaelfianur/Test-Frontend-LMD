import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public products: number = 0;
  public users: number = 0;

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {

  }

  ngOnInit(): void {
    // this.countProducts();
    // this.countUsers();
  }

  countProducts(): void {
    this.productService.list().subscribe(respond => {

      if (respond) {
        this.products = respond.length;
      }
    });
  }

  countUsers(): void {
    this.userService.list().subscribe(respond => {
      if (respond) {
        this.users = respond.length;
      }
    });
  }

}

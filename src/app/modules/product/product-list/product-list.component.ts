import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from 'src/app/core/services/session.service';
import { ProductService } from 'src/app/services/product.service';
import { TableService } from 'src/app/core/services/table.service';

import { Product } from 'src/app/models/product';

import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public searchForm: FormGroup;

  public dataList: Array<Product>;

  public dtOptions: DataTables.Settings = {};

  public title: string = "Product List";
  public url: string = "/product/list";
  public module: string = "Product";

  public isStillLoading: boolean = false;

  constructor(
    private productService: ProductService,
    public sessionService: SessionService,
    public tableService: TableService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {
    // this.tableService.setFieldSort("name");
    // this.tableService.initSearchKey({ "search": ["_search"] });
    // this.tableService.setPageSize(10);
    // this.tableService.setSearchParam("");
  }

  ngOnInit(): void {
    // this.initForm();
    // this.fetchServerside();

    this.dataTableInit();
    this.fetchClientSide();
  }

  initForm() {
    // this.searchForm = new FormGroup({ search: new FormControl("") });
  }

  dataTableInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
  }

  fetchClientSide() {
    this.productService.list().subscribe(output => {
      this.isStillLoading = false;

      if (output == false) {
        this.dataList = [];
        return;
      }
      this.dataList = output;
    });
  }

  onSearch() {
    if (!this.searchForm.valid) {
      return;
    }

    this.tableService.setPageNumber(1);
    this.tableService.setSearchParam(this.searchForm.value);

    this.fetchServerside();
  }

  onSort(field: string) {
    this.tableService.setFieldSort(field);

    if (!this.tableService.sorting(this.dataList)) {
      this.fetchServerside();
    }
  }

  onChangePage(event: any) {
    this.tableService.setPageNumber(1);
    this.fetchServerside();
  }

  fetchServerside() {
    const completeParams = this.tableService.getWhereStatement('?');

    this.isStillLoading = true;

    this.productService.list(completeParams).subscribe(output => {
      this.isStillLoading = false;

      if (output == false) {
        this.dataList = [];
        return;
      }
      this.dataList = output;

      this.toastr.success("Loading data sucess");
      this.tableService.setDocumentSize(this.productService.extraData("documentSize"));
    });
  }

  onEdit(data: any) {
    const session = Math.random().toString(36).substring(2, 10);

    this.sessionService.save(session, data);
    this.router.navigate([this.url + "/edit/", session]);
  }

  onDetail(data: any) {
    const session = Math.random().toString(36).substring(2, 10);

    this.sessionService.save(session, data);
    this.router.navigate([this.url + "/detail/", session]);
  }

  onDetailModal(data: any) {
    const modalRef = this.modalService.open(ProductDetailComponent, { size: "lg" });

    modalRef.componentInstance.columns = data;
  }

}

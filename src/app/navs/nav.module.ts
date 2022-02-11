
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    SpinnerComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  exports: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,
    SpinnerComponent
  ]
})
export class NavModule { }

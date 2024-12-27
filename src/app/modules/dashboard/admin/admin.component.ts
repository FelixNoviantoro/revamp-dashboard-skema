import { Component } from '@angular/core';
import { UserListComponent } from "./user-list/user-list.component";
import { TabViewModule } from 'primeng/tabview';
import { CompanyListComponent } from './company-list/company-list.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    UserListComponent,
    CompanyListComponent,
    TabViewModule,
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  filter: any;
  ngOnDestroy() {
    this.filter?.unsubscribe?.();
  }
}

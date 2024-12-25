import { Component } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { ButtonModule } from 'primeng/button';
import { IconPencilComponent } from "../../../core/components/icons/pencil/pencil.component";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Users } from '../../../core/models/all-user.model';
import { FilterRequestPayload } from '../../../core/models/request.model';
import { UserListComponent } from "./user-list/user-list.component";
import { TabViewModule } from 'primeng/tabview';
import { CompanyListComponent } from './company-list/company-list.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    UserListComponent,
    CompanyListComponent,
    TabViewModule
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

import { Component } from '@angular/core';
import { IconPencilComponent } from '../../../../core/components/icons/pencil/pencil.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FilterRequestPayload } from '../../../../core/models/request.model';
import { AdminService } from '../../../../core/services/admin.service';
import { Users } from '../../../../core/models/all-user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    IconPencilComponent,
    ButtonModule,
    PaginatorModule,
    CommonModule,
    TableModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  filter: any;

  isLoading: boolean = false;
  showDeleteModal: boolean = false;
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;

  page: number = 0;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  users: Users[] = [];

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnDestroy() {
    this.filter?.unsubscribe?.();
  }

  ngOnInit() {
    this.fetchData({ page: this.page, size: this.rows });
  }

  fetchData = (filter?: Partial<FilterRequestPayload>) => {
    this.isLoading = true;
    this.adminService.fetchUserList({ ...filter }).subscribe((res) => {
      this.users = res.data;
      this.totalRecords = res.total_user;
      this.isLoading = false;
    });
  }

  onPageChange = (e: PaginatorState) => {
    console.log(e.page, e.rows, e.first);
    if (e.page !== undefined && e.page !== null) this.page = e.page;
    if (e.rows !== undefined && e.rows !== null) this.rows = e.rows;
    if (e.first !== undefined && e.first !== null) this.first = e.first;
    this.fetchData({ page: this.page, size: this.rows });
  };
}

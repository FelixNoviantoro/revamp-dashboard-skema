import { Component } from '@angular/core';
import { AdminService } from '../../../core/services/admin.service';
import { ButtonModule } from 'primeng/button';
import { IconPencilComponent } from "../../../core/components/icons/pencil/pencil.component";
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Users } from '../../../core/models/all-user.model';
import { FilterRequestPayload } from '../../../core/models/request.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    ButtonModule,
    IconPencilComponent,
    PaginatorModule,
    CommonModule,
    TableModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

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
    this.fetchData({page: this.page, size: this.rows});
  }

  fetchData = (filter?: Partial<FilterRequestPayload>) => {
    this.isLoading = true;
    this.adminService.getAllUsers({...filter}).subscribe((res) => {
      this.users = res.data;
      this.totalRecords = res.total_user;
      this.isLoading = false;
    });
  }

  onPageChange = (e: PaginatorState) => {
    console.log(e.page, e.rows, e.first);
      if (e.page) this.page = e.page;
      if (e.rows) this.rows = e.rows;
      if (e.first) this.first = e.first;
      this.fetchData({page: this.page, size: this.rows});
    };
}

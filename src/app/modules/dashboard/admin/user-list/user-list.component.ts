import { Component } from '@angular/core';
import { IconPencilComponent } from '../../../../core/components/icons/pencil/pencil.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FilterRequestPayload } from '../../../../core/models/request.model';
import { AdminService } from '../../../../core/services/admin.service';
import { UserLevel, Users } from '../../../../core/models/all-user.model';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Company } from '../../../../core/models/company.model';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { Dropdown, DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    IconPencilComponent,
    ButtonModule,
    PaginatorModule,
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    MultiSelectModule,
    DropdownModule
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
  companies: Company[] = [];
  accessMenus: string[] = [];
  userLevels: UserLevel[] = [];

  addValues = this.fb.group({
    company: 0,
    email: '',
    full_name: '',
    username: '',
    level_menu: 0,
    password: '',
    menu: [],
  });

  showPassword: boolean = false;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
  ) { }

  ngOnDestroy() {
    this.filter?.unsubscribe?.();
  }

  ngOnInit() {
    this.fetchData({ page: this.page, size: this.rows });
    this.fetchCountryList();
    this.fetchUserLevels();
  }

  fetchData = (filter?: Partial<FilterRequestPayload>) => {
    this.isLoading = true;
    this.adminService.fetchUserList({ ...filter }).subscribe((res) => {
      this.users = res.data;
      this.totalRecords = res.total_user;
      this.isLoading = false;
    });
  }

  fetchCountryList = () => {
    this.adminService.fetchCompanyList({ page: 1, size: 100 }).subscribe((res) => {
      this.companies = res.data;
    });
  }

  fetchUserAcceeMenu = () => {
    this.adminService.fetchUserAccessMenu().subscribe((res) => {
      console.log(res);
      this.accessMenus = res;
    });
  }

  fetchUserLevels = () => { 
    this.adminService.fetchUserLevels().subscribe((res) => {
      console.log(res);
      this.userLevels = res;
    });
  }

  onPageChange = (e: PaginatorState) => {
    console.log(e.page, e.rows, e.first);
    if (e.page !== undefined && e.page !== null) this.page = e.page;
    if (e.rows !== undefined && e.rows !== null) this.rows = e.rows;
    if (e.first !== undefined && e.first !== null) this.first = e.first;
    this.fetchData({ page: this.page, size: this.rows });
  };

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  saveUser = () => {
    const payload = this.addValues.value as unknown as {
      company: number;
      email: string;
      full_name: string;
      username: string;
      level_menu: number;
      password: string;
      menu: string[];
    };
  
    this.adminService.saveUser(payload)
    .subscribe((res) => {
      this.addValues.reset();
      this.showAddModal = false;
      console.log(res);
    })
    .add(() => {
      this.fetchData({ page: 0, size: 10 });
    });
  }
}

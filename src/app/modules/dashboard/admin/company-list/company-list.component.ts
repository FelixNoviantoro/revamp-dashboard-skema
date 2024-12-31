import { Component } from '@angular/core';
import { AdminService } from '../../../../core/services/admin.service';
import { FilterRequestPayload } from '../../../../core/models/request.model';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IconPencilComponent } from '../../../../core/components/icons/pencil/pencil.component';
import { Users } from '../../../../core/models/all-user.model';
import { Company } from '../../../../core/models/company.model';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-company-list',
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
    DropdownModule,
    ConfirmDialogModule,
    ToastModule,
    ConfirmPopupModule,
    FileUploadModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss'
})
export class CompanyListComponent {
  filter: any;

  isLoading: boolean = false;
  isAdding: boolean = false;
  showDeleteModal: boolean = false;
  showAddModal: boolean = false;
  showUpdateModal: boolean = false;

  page: number = 0;
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  companies: Company[] = [];
  statuses: string[] = ['TRIAL', 'ACTIVE', 'INACTIVE'];

  addValues = this.fb.group({
    id: [''],
    status: ['TRIAL'],
    name: [''],
    address: [''],
    phone: [''],
    contact: [''],
    expired: [''],
    email: [''],
    limit_keyword: [''],
    icon: [null as File | null],
  });

  icons = [] as { base64: string; filename: string }[];

  showPassword: boolean = false;

  tempId: number = 0;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnDestroy() {
    this.filter?.unsubscribe?.();
  }

  ngOnInit() {
    this.fetchData({ page: this.page, size: this.rows });
  }

  fetchData = (filter?: Partial<FilterRequestPayload>) => {
    this.isLoading = true;
    this.adminService.fetchCompanyList({ ...filter }).subscribe((res) => {
      this.companies = res.data;
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

  openAddModal = () => {
    this.isAdding = true;
    this.addValues.reset();
    this.showAddModal = true;
  }

  saveCompany = async () => {
    console.log(new Date(this.addValues.get('expired')!.value!).toISOString().slice(0, 10));

    const payload = {
      ...this.addValues.value,
      expired: this.addValues.get('expired')?.value
        ? new Date(this.addValues.get('expired')!.value!).toISOString().slice(0, 10)
        : '',
      icon: this.icons,
    } as {
      status: string;
      name: string;
      address: string;
      phone: string;
      contact: string;
      expired: string;
      email: string;
      limit_keyword: string;
      icon?: { base64: string; filename: string }[];
    };

    this.adminService.saveCompany(payload)
      .subscribe((res) => {
        this.addValues.reset();
        this.showAddModal = false;
      })
      .add(() => {
        this.refreshPage();
      });
  }

  updateCompany = () => {
    const payload = {
      ...this.addValues.value,
      id: this.tempId,
    } as {
      id: number;
      company: number;
      email: string;
      full_name: string;
      username: string;
      level_menu: number;
      password: string;
      menu: string[];
    };

    this.adminService.updateUser(payload)
      .subscribe((res) => {
        this.addValues.reset();
        this.showAddModal = false;
      })
      .add(() => {
        this.refreshPage();
      });
  }

  openEditModal = (user: Users) => {
    this.isAdding = false;
    this.tempId = user.id;

    this.adminService.detailUserOrCompany(user.id, 'company').subscribe((res) => {
      this.addValues.patchValue({
        id: res.comp_id,
        status: res.status,
        name: res.comp_name,
        address: res.address,
        phone: res.phone,
        contact: res.contact,
        expired: res.expired,
        email: res.email,
        limit_keyword: res.limit_keyword
      });
    });

    this.showAddModal = true;
  }

  deleteCompany = (event: Event, company: Company) => {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure to delete company ${company.company_name} ?`,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => { this.confirmDeleteCompany(company) },
    });
  }

  confirmDeleteCompany = (company: Company) => {
    this.adminService.deleteCompany(company.id).subscribe((res) => {
      console.log(res);
    }).add(() => {
      this.refreshPage();
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  refreshPage = () => {
    this.page = 0;
    this.first = 0;
    this.rows = 10;
    this.fetchData({ page: this.page, size: this.rows });
  }

  async onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (file) { // Ensure `file` is not null or undefined
      const base64 = await this.file2Base64(file);
      const filename = file.name ?? 'file.jpg';
      this.icons.push({ base64, filename });
    } else {
      console.warn('No icons to process');
    }

  }

  file2Base64 = (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result?.toString() || '');
      reader.onerror = (error) => reject(error);
    });
  };
}

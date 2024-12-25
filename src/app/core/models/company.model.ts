export interface Company {
    id: number;
    company_name: string;
    dpu: string;
    expired: string;
    status: string;
    address: string;
    client_id: string;
    total_keyword: number;
    limit_keyword: number;
}

export interface CompanyResponse {
    data: Company[];
    total_user: number;
}
export interface Users {
    id: number;
    name: string;
    usrname: string;
    company: string;
    level: string;
  }
  
  export interface UserResponse {
    data: Users[];
    total_user: number;
  }
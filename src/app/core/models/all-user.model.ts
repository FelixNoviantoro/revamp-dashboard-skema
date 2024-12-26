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

  export interface UserLevel {
    id: number;
    level_name: string;
    level_desc: string;
  }
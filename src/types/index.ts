export type UserRole = "admin" | "member";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface Contribution {
  id: number;
  memberId: number;

  type:
    | "main"
    | "token"
    | "savings";

  amount: number;

  status:
    | "paid"
    | "unpaid"
    | "pending";

  date: string;
}

export interface NotificationType {
  id: number;
  message: string;
}
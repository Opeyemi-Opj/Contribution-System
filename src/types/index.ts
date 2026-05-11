export type UserRole =
  | "admin"
  | "member";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type ContributionType =
  | "main"
  | "token"
  | "savings";

export type ContributionStatus =
  | "paid"
  | "unpaid"
  | "pending";

export interface Contribution {

  id: number;

  memberId: number;

  type: ContributionType;

  amount: number;

  status: ContributionStatus;

  date: string;

  deadline: string;

  createdAt: string;

  verifiedBy?: string | null;
}
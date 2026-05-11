import type { Contribution } from "../types";

export const contributions: Contribution[] = [
  {
    id: 1,
    memberId: 1,
    type: "main",
    amount: 5000,
    status: "paid",
    date: "2026-05-01",
    deadline: "30-05-2026",
    createdAt: "2026-05-01T10:00:00Z",
    verifiedBy: "admin",
  },

  {
    id: 2,
    memberId: 1,
    type: "token",
    amount: 1000,
    status: "paid",
    date: "2026-05-01",
    deadline: "30-05-2026",
    createdAt: "2026-05-01T10:00:00Z",
    verifiedBy: "admin",
  },

  {
    id: 3,
    memberId: 1,
    type: "savings",
    amount: 7000,
    status: "paid",
    date: "2026-05-01",
    deadline: "30-05-2026",
    createdAt: "2026-05-01T10:00:00Z",
    verifiedBy: "admin",
  },
];
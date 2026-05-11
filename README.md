#  Monthly Contribution System (6 Members)

A React + TypeScript project that simulates a real-world monthly contribution management system for 6 members, controlled by an admin.  
This project is built for learning purposes and follows a structured Product Requirements Document (PRD).

---

## 🚀 Project Overview

This system is designed to manage monthly contributions in a transparent and organized way.

It allows:
- Admin to control contributions and verify payments
- Members to track their payments and savings
- Automatic reporting of monthly financial activity

---

## 🎯 Project Goals
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ContributionCard from "../components/ContributionCard";
import Notification from "../components/Notification";

import type { Contribution } from "../types";

const MemberDashboard = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [groupMonthlyTotal, setGroupMonthlyTotal] = useState<number>(0);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const stored = localStorage.getItem("contributions");
    if (!stored) return;

    const parsed: Contribution[] = JSON.parse(stored);

    // USER DATA ONLY
    const memberData = parsed.filter(
      (c) => c.memberId === currentUser.id
    );

    setContributions(memberData);

    // GROUP MONTHLY TOTAL (PRD FIX)
    const monthlyGroup = parsed.filter((c) => {
      const date = new Date(c.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });

    const total = monthlyGroup.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    setGroupMonthlyTotal(total);
  }, []);

  // FILTER CURRENT MONTH ONLY (PRD FIX)
  const monthlyContributions = contributions.filter((c) => {
    const date = new Date(c.date);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  // SAVINGS (CUMULATIVE - PRD OK)
  const savingsBalance = contributions
    .filter((c) => c.type === "savings")
    .reduce((sum, c) => sum + c.amount, 0);
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ContributionCard from "../components/ContributionCard";
import Notification from "../components/Notification";

import type { Contribution } from "../types";

const MemberDashboard = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [groupMonthlyTotal, setGroupMonthlyTotal] = useState<number>(0);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const stored = localStorage.getItem("contributions");
    if (!stored) return;

    const parsed: Contribution[] = JSON.parse(stored);

    // USER DATA ONLY
    const memberData = parsed.filter(
      (c) => c.memberId === currentUser.id
    );

    setContributions(memberData);

    // GROUP MONTHLY TOTAL (PRD FIX)
    const monthlyGroup = parsed.filter((c) => {
      const date = new Date(c.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });

    const total = monthlyGroup.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    setGroupMonthlyTotal(total);
  }, []);

  // FILTER CURRENT MONTH ONLY (PRD FIX)
  const monthlyContributions = contributions.filter((c) => {
    const date = new Date(c.date);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  // SAVINGS (CUMULATIVE - PRD OK)
  const savingsBalance = contributions
    .filter((c) => c.type === "savings")
    .reduce((sum, c) => sum + c.amount, 0);

  // CATEGORY HELPERS (PRD FIX: STRICT CHECK)
  const hasPaid = (type: string) =>
    monthlyContributions.some((c) => c.type === type);

  const getStatus = (type: string) =>
    hasPaid(type) ? "paid" : "unpaid";

  return (
    <div>
      <Navbar />

      <div className="member-dashboard">

        <h1 className="member-title">
          Member Dashboard
        </h1>

        <Notification
          message="Track your Main, Token, and Savings contributions monthly."
        />

        {/* SAVINGS */}
        <div className="savings-card">
          <h2>Savings Balance: ₦{savingsBalance}</h2>
        </div>

        {/* GROUP TOTAL (MONTHLY - PRD FIX) */}
        <div className="group-total-card">
          <h2>
            This Month Group Total: ₦{groupMonthlyTotal}
          </h2>
        </div>

        {/* PRD STATUS SECTION */}
        <div className="status-card">
          <h3>Main Contribution</h3>
          <p>{getStatus("main")}</p>
        </div>

        <div className="status-card">
          <h3>Monthly Token</h3>
          <p>{getStatus("token")}</p>
        </div>

        <div className="status-card">
          <h3>Savings Contributions</h3>
          <p>{monthlyContributions.filter(c => c.type === "savings").length} record(s)</p>
        </div>

        <hr />

        {/* PERSONAL HISTORY */}
        <h2>My Monthly Contribution History</h2>

        <div className="contribution-container">
          {monthlyContributions.map((c) => (
            <ContributionCard
              key={c.id}
              contribution={c}
            />
          ))}
        </div>

        <hr />

        {/* GROUP OVERVIEW */}
        <h2>Group Contribution Overview (This Month)</h2>

        <p>
          Total contributions collected this month:import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ContributionCard from "../components/ContributionCard";
import Notification from "../components/Notification";

import type { Contribution } from "../types";

const MemberDashboard = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [groupMonthlyTotal, setGroupMonthlyTotal] = useState<number>(0);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const stored = localStorage.getItem("contributions");
    if (!stored) return;

    const parsed: Contribution[] = JSON.parse(stored);

    // USER DATA ONLY
    const memberData = parsed.filter(
      (c) => c.memberId === currentUser.id
    );

    setContributions(memberData);

    // GROUP MONTHLY TOTAL (PRD FIX)
    const monthlyGroup = parsed.filter((c) => {
      const date = new Date(c.date);
      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    });

    const total = monthlyGroup.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    setGroupMonthlyTotal(total);
  }, []);

  // FILTER CURRENT MONTH ONLY (PRD FIX)
  const monthlyContributions = contributions.filter((c) => {
    const date = new Date(c.date);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  // SAVINGS (CUMULATIVE - PRD OK)
  const savingsBalance = contributions
    .filter((c) => c.type === "savings")
    .reduce((sum, c) => sum + c.amount, 0);

  // CATEGORY HELPERS (PRD FIX: STRICT CHECK)
  const hasPaid = (type: string) =>
    monthlyContributions.some((c) => c.type === type);

  const getStatus = (type: string) =>
    hasPaid(type) ? "paid" : "unpaid";

  return (
    <div>
      <Navbar />

      <div className="member-dashboard">

        <h1 className="member-title">
          Member Dashboard
        </h1>

        <Notification
          message="Track your Main, Token, and Savings contributions monthly."
        />

        {/* SAVINGS */}
        <div className="savings-card">
          <h2>Savings Balance: ₦{savingsBalance}</h2>
        </div>

        {/* GROUP TOTAL (MONTHLY - PRD FIX) */}
        <div className="group-total-card">
          <h2>
            This Month Group Total: ₦{groupMonthlyTotal}
          </h2>
        </div>

        {/* PRD STATUS SECTION */}
        <div className="status-card">
          <h3>Main Contribution</h3>
          <p>{getStatus("main")}</p>
        </div>

        <div className="status-card">
          <h3>Monthly Token</h3>
          <p>{getStatus("token")}</p>
        </div>

        <div className="status-card">
          <h3>Savings Contributions</h3>
          <p>{monthlyContributions.filter(c => c.type === "savings").length} record(s)</p>
        </div>

        <hr />

        {/* PERSONAL HISTORY */}
        <h2>My Monthly Contribution History</h2>

        <div className="contribution-container">
          {monthlyContributions.map((c) => (
            <ContributionCard
              key={c.id}
              contribution={c}
            />
          ))}
        </div>

        <hr />

        {/* GROUP OVERVIEW */}
        <h2>Group Contribution Overview (This Month)</h2>

        <p>
          Total contributions collected this month:
          ₦{groupMonthlyTotal}
        </p>

      </div>
    </div>
  );
};

export default MemberDashboard;
          ₦{groupMonthlyTotal}
        </p>

      </div>
    </div>
  );
};

export default MemberDashboard;
  // CATEGORY HELPERS (PRD FIX: STRICT CHECK)
  const hasPaid = (type: string) =>
    monthlyContributions.some((c) => c.type === type);

  const getStatus = (type: string) =>
    hasPaid(type) ? "paid" : "unpaid";

  return (
    <div>
      <Navbar />

      <div className="member-dashboard">

        <h1 className="member-title">
          Member Dashboard
        </h1>

        <Notification
          message="Track your Main, Token, and Savings contributions monthly."
        />

        {/* SAVINGS */}
        <div className="savings-card">
          <h2>Savings Balance: ₦{savingsBalance}</h2>
        </div>

        {/* GROUP TOTAL (MONTHLY - PRD FIX) */}
        <div className="group-total-card">
          <h2>
            This Month Group Total: ₦{groupMonthlyTotal}
          </h2>
        </div>

        {/* PRD STATUS SECTION */}
        <div className="status-card">
          <h3>Main Contribution</h3>
          <p>{getStatus("main")}</p>
        </div>

        <div className="status-card">
          <h3>Monthly Token</h3>
          <p>{getStatus("token")}</p>
        </div>

        <div className="status-card">
          <h3>Savings Contributions</h3>
          <p>{monthlyContributions.filter(c => c.type === "savings").length} record(s)</p>
        </div>

        <hr />

        {/* PERSONAL HISTORY */}
        <h2>My Monthly Contribution History</h2>

        <div className="contribution-container">
          {monthlyContributions.map((c) => (
            <ContributionCard
              key={c.id}
              contribution={c}
            />
          ))}
        </div>

        <hr />

        {/* GROUP OVERVIEW */}
        <h2>Group Contribution Overview (This Month)</h2>

        <p>
          Total contributions collected this month:
          ₦{groupMonthlyTotal}
        </p>

      </div>
    </div>
  );
};

export default MemberDashboard;
- Track fixed and flexible contributions
- Maintain transparency between admin and members
- Provide monthly financial reporting
- Ensure accurate and reliable records using LocalStorage

---

## 👥 User Roles

### 🧑‍💼 Admin
- Sets contribution rules (main, token, deadlines)
- Adds and verifies payments
- Updates contribution records
- Generates monthly reports

### 👤 Members (6 total)
- Make contributions (Main, Token, Savings)
- View personal contribution history
- Track savings balance
- Monitor payment status (paid/unpaid/pending)

---

## 💰 Contribution Categories

### 1. Main Contribution
- Fixed monthly amount
- Mandatory for all members

### 2. Monthly Token
- Smaller fixed monthly payment
- Mandatory for all members

### 3. Personal Savings
- Flexible amount decided by member
- Optional but tracked individually

---

## ⚙️ Core Features

### 📊 Member Dashboard
- View contribution status (paid/unpaid)
- View savings balance
- View personal monthly history

### 🛠 Admin Dashboard
- Add contributions for members
- Approve or mark payments
- Delete or update records
- Manage contribution tracking

### 📈 Reports System
- Monthly financial summary
- Group total contributions
- Individual contribution history
- Payment status breakdown

### 🔔 Notifications
- Payment reminders
- Approval confirmations
- System alerts

---

## 🧠 Technical Stack

- React.js
- TypeScript
- LocalStorage (for data persistence)
- CSS (custom styling)

---

## 📂 Data Structure Example

```ts
export interface Contribution {
  id: number;
  memberId: number;
  type: "main" | "token" | "savings";
  amount: number;
  status: "paid" | "unpaid" | "pending";
  date: string;
}
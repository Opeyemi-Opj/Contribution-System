# 📊 Monthly Contribution System (6 Members)

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
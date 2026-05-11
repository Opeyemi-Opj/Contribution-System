import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ContributionCard from "../components/ContributionCard";
import Notification from "../components/Notification";

import type { Contribution } from "../types";

import { contributionRules } from "../data/rules";

const AdminDashboard = () => {

  const [contributions, setContributions] = useState<Contribution[]>([]);

  const [memberId, setMemberId] = useState<number>(1);

  const [type, setType] = useState <"main" | "token" | "savings"> ( "main" );

  const [amount, setAmount] = useState<number>(0);

  // LOAD DATA
  useEffect(() => {

    const stored = localStorage.getItem("contributions");

    if (stored) { setContributions( JSON.parse(stored) );
    }

  }, []);

  // SAVE DATA
  const save = (
    data: Contribution[]
  ) => {

    setContributions(data);

    localStorage.setItem(
      "contributions",
      JSON.stringify(data)
    );

  };

  // FIXED RULES
  const getAmount = () => {

    if (type === "main") {
      return contributionRules.main;
    }

    if (type === "token") {
      return contributionRules.token;
    }

    return amount;
  };

  // ADD CONTRIBUTION
  const addContribution = () => {

    const newContribution: Contribution = {

      id: Date.now(),

      memberId,

      type,

      amount: getAmount(),

      status: "pending",

      date: new Date().toLocaleDateString(),

      createdAt:
        new Date().toISOString(),

      deadline:
        contributionRules.deadline,

      verifiedBy: null, };

    save([...contributions, newContribution,]);
  };

  // APPROVE PAYMENT
  const approvePayment = (
    id: number
  ) => {

    const updated = contributions.map((c) => c.id === id ? { ...c,

              status:
                "paid" as const,

              verifiedBy:
                "admin",
            }
          : c
      );

    save(updated);
  };

  // MARK UNPAID
  const markUnpaid = (
    id: number 
  ) => {
    const updated = contributions.map((c) => c.id === id ? { ...c,

              status:
                "unpaid" as const,

              verifiedBy:
                "admin",
            }
          : c
      );

    save(updated);
  };

  // DELETE
  const deleteContribution = (
    id: number) => {

    const updated =
      contributions.filter(
        (c) => c.id !== id
      );

    save(updated);
  };

  return (
    <div>

      <Navbar />

      <div className="admin-dashboard">

        <h1>
          Admin Dashboard
        </h1>

        <Notification message="Admin controls contribution rules, payment verification, and reports."
          type="info"/>

        <select className="dashboard-select"
          value={memberId}
          onChange={(e) =>
            setMemberId(
              Number(
                e.target.value
              ))}>

          <option value={1}>
            Member 1
          </option>

          <option value={2}>
            Member 2
          </option>

          <option value={3}>
            Member 3
          </option>

          <option value={4}>
            Member 4
          </option>

          <option value={5}>
            Member 5
          </option>

          <option value={6}>
            Member 6
          </option>

        </select>

        <select className="dashboard-select"
          value={type}
          onChange={(e) =>
            setType(
              e.target.value as
                | "main"
                | "token"
                | "savings"
            )}>

          <option value="main">
            Main (₦5000)
          </option>

          <option value="token">
            Token (₦1000)
          </option>

          <option value="savings">
            Savings (Flexible)
          </option>

        </select>

        {type === "savings" && (

          <input
            className="dashboard-input"
            type="number"
            placeholder="Enter Savings Amount"
            onChange={(e) =>
              setAmount( Number( e.target.value ))}/> )}

        <button
          className="dashboard-button"
          onClick={addContribution} >
          Add Contribution
        </button>

        <hr className="dashboard-line" />
        <div className="contribution-list">

          {contributions.map(
            (item) => (

              <div
                key={item.id}
                className="contribution-wrapper">

                <ContributionCard contribution={item}/>

                <button
                  className="approve-btn"
                  onClick={() => approvePayment( item.id)}>
                  Approve
                </button>

                <button
                  className="unpaid-btn"
                  onClick={() => markUnpaid( item.id)}>
                    Mark Unpaid
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteContribution( item.id )}>
                  Delete
                </button>

              </div>
            ))}

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
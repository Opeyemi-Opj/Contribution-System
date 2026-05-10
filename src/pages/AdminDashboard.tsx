import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ContributionCard from "../components/ContributionCard";
import Notification from "../components/Notification";
import type { Contribution } from "../types";


const AdminDashboard = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const [amount, setAmount] = useState<number>(0);

  const [memberId, setMemberId] = useState<number>(2);

  const [type, setType] = useState<"main" | "token" | "savings">("main");

  useEffect(() => {
    const stored = localStorage.getItem("contributions");

    if (stored) {
      setContributions(JSON.parse(stored));
    }
  }, []);

  const addContribution = () => {
    const newContribution: Contribution = {
      id: Date.now(),
      memberId,
      amount,
      type,
      status: "paid",
      date: new Date().toLocaleDateString(),
    };

    const updated = [...contributions, newContribution];

    setContributions(updated);

    localStorage.setItem(
      "contributions",
      JSON.stringify(updated)
    );
  };

  return (
    <div>
      <Navbar />

      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <Notification message="Admin can approve and track all monthly contributions."/>

        <input
          className="dashboard-input"
          type="number"
          placeholder="Member ID"
          onChange={(e) =>
            setMemberId(Number(e.target.value))
          }
        />

        <select
          className="dashboard-select"
          onChange={(e) =>
            setType(
              e.target.value as
                | "main"
                | "token"
                | "savings"
            )
          }
        >
          <option value="main">
            Main Contribution
          </option>

          <option value="token">
            Monthly Token
          </option>

          <option value="savings">
            Personal Savings
          </option>
        </select>

        <input
          className="dashboard-input"
          type="number"
          placeholder="Amount"
          onChange={(e) =>
            setAmount(Number(e.target.value))
          }
        />

        <button
          className="dashboard-button"
          onClick={addContribution}
        >
          Approve Contribution
        </button>

        <hr className="dashboard-line" />

        <div className="contribution-list">
          {contributions.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              contribution={contribution}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
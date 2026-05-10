import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import type { Contribution } from "../types";

const Reports = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("contributions");

    if (stored) { setContributions(JSON.parse(stored));} }, []);

  const totalMainContribution = contributions.filter((contribution) => contribution.type === "main")
    .reduce((sum, contribution) => sum + contribution.amount,0);

  const totalMonthlyToken = contributions
    .filter( (contribution) => contribution.type === "token")
    .reduce( (sum, contribution) => sum + contribution.amount,0);

  const totalSavings = contributions .filter((contribution) => contribution.type === "savings" )
    .reduce( (sum, contribution) => sum + contribution.amount, 0);

  const overallTotal = contributions.reduce( (sum, contribution) => sum + contribution.amount, 0);

  return (
    <div>
      <Navbar />

      <div className="reports-container">
        <h1 className="reports-title">
          Monthly Reports
        </h1>

        <hr className="reports-line" />

        <div className="report-summary">
          <h2>
            Main Contribution Total:
            ₦{totalMainContribution}
          </h2>

          <h2>
            Monthly Token Total:
            ₦{totalMonthlyToken}
          </h2>

          <h2>
            Personal Savings Total:
            ₦{totalSavings}
          </h2>

          <h1 className="overall-total">
            Overall Group Total:
            ₦{overallTotal}
          </h1>
        </div>

        <hr className="reports-line" />

        <h2 className="history-title">
          Individual Contribution History
        </h2>

        <div className="history-list">
          {contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="history-card">
              <p>
                Member ID:
                {contribution.memberId}
              </p>

              <p>
                Type:
                {contribution.type}
              </p>

              <p>
                Amount:
                ₦{contribution.amount}
              </p>

              <p>
                Status:
                {contribution.status}
              </p>

              <p>
                Date:
                {contribution.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ContributionCard from "../components/ContributionCard";
import Notification from "../components/Notification";
import type { Contribution } from "../types";

const MemberDashboard = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  useEffect(() => {const stored = localStorage.getItem("contributions");

    if (stored) { const parsed: Contribution[] = JSON.parse(stored);

      const memberContributions = parsed.filter(
          (contribution) => contribution.memberId === currentUser.id
        );

      setContributions( memberContributions );
    }
  }, []);

  const savingsBalance = contributions
      .filter( (contribution) => contribution.type === "savings" )
      .reduce((sum, contribution) => sum + contribution.amount, 0);

  return (
    <div>
      <Navbar />

      <div className="member-dashboard">
        <h1 className="member-title">
          Member Dashboard
        </h1>

        <Notification message="Reminder: Monthly contributions are mandatory." />

        <div className="savings-card">
          <h2>
            Personal Savings Balance:
            ₦{savingsBalance}
          </h2>
        </div>

        <hr className="member-line" />

        <div className="contribution-container">
          {contributions.map((contribution) => (
            <ContributionCard
              key={contribution.id}
              contribution={contribution}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
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

    
    const memberData = parsed.filter( (c) => c.memberId === currentUser.id);

    setContributions(memberData);

    
    const monthlyGroup = parsed.filter((c) => {
      const date = new Date(c.date);
      return (
        date.getMonth() === currentMonth && date.getFullYear() === currentYear
      );
    });

    const total = monthlyGroup.reduce(
      (sum, c) => sum + c.amount,
      0
    );

    setGroupMonthlyTotal(total);
  }, []);

  const monthlyContributions = contributions.filter((c) => { const date = new Date(c.date);
    return (
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  });

  
  const savingsBalance = contributions
    .filter((c) => c.type === "savings")
    .reduce((sum, c) => sum + c.amount, 0);

  
  const hasPaid = (type: string) => monthlyContributions.some((c) => c.type === type);

  const getStatus = (type: string) => hasPaid(type) ? "paid" : "unpaid";

  return (
    <div>
      <Navbar />

      <div className="member-dashboard">

        <h1 className="member-title">
          Member Dashboard
        </h1>

        <Notification message="Track your Main, Token, and Savings contributions monthly."/>

        
        <div className="savings-card">
          <h2>Savings Balance: ₦{savingsBalance}</h2>
        </div>

    
        <div className="group-total-card">
          <h2>
            This Month Group Total: ₦{groupMonthlyTotal}
          </h2>
        </div>

       
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
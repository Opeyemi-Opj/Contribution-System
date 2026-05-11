import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ContributionCard from "../components/ContributionCard";
import type { Contribution } from "../types";

const Reports = () => {

  const [contributions, setContributions] = useState<Contribution[]>([]);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  useEffect(() => { const stored = localStorage.getItem("contributions");

    if (!stored) return;

    setContributions(JSON.parse(stored));

  }, []);


  const monthly = contributions.filter((c) => {const date = new Date(c.date);

    return ( date.getMonth() === currentMonth &&  date.getFullYear() === currentYear);
  });

  
  const totalMain = monthly
    .filter((c) => c.type === "main")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalToken = monthly
    .filter((c) => c.type === "token")
    .reduce((sum, c) => sum + c.amount, 0);

  const totalSavings = monthly
    .filter((c) => c.type === "savings")
    .reduce((sum, c) => sum + c.amount, 0);

  const total = monthly.reduce((sum, c) => sum + c.amount, 0 );

  
  const paid = monthly.filter( (c) => c.status === "paid" );

  const unpaid = monthly.filter((c) => c.status === "unpaid");

  const pending = monthly.filter( (c) => c.status === "pending");


  const memberSummary = [1,2,3,4,5,6].map((id) => {

  const member = monthly.filter( (c) => c.memberId === id);

  const total = member.reduce( (sum, c) => sum + c.amount, 0 );

    return { memberId: id, total};

  });

  return (
    <div>

      <Navbar />

      <div className="reports-container">

        <h1>Monthly Contribution Report</h1>

        <p>
          {currentMonth + 1}/{currentYear}
        </p>

        <hr />

        <div>

          <h2>Main: ₦{totalMain}</h2>
          <h2>Token: ₦{totalToken}</h2>
          <h2>Savings: ₦{totalSavings}</h2>

          <h1>Total: ₦{total}</h1>

        </div>

        <hr />

        <div>

          <h3>Paid: {paid.length}</h3>
          <h3>Unpaid: {unpaid.length}</h3>
          <h3>Pending: {pending.length}</h3>

        </div>

        <hr />

        
        <h2>Group Contribution Breakdown</h2>

        {memberSummary.map((m) => (
          <p key={m.memberId}>
            Member {m.memberId}: ₦{m.total}
          </p>
        ))}

        <hr />

     
        <h2>Monthly History</h2>

        {monthly.map((c) => ( <ContributionCard key={c.id} contribution={c} /> ))}

      </div>
    </div>
  );
};

export default Reports;
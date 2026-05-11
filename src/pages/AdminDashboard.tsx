import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ContributionCard from "../components/ContributionCard";
import Notification from "../components/Notification";
import type { Contribution } from "../types";
import { contributionRules } from "../data/rules";

const AdminDashboard = () => {

  const [contributions, setContributions] = useState<Contribution[]>([]);

  const [memberId, setMemberId] = useState<number>(1);

  const [type, setType] = useState<"main" | "token" | "savings">("main");

  const [amount, setAmount] = useState<number>(0);

  useEffect(() => { const stored = localStorage.getItem("contributions");

    if (stored) {
      setContributions(JSON.parse(stored));
    }}, []);

  const save = (data: Contribution[]) => { setContributions(data); localStorage.setItem("contributions", JSON.stringify(data));};

  const getAmount = () => {
    if (type === "main")
      return contributionRules.main;

    if (type === "token")
      return contributionRules.token;

    return amount;
  };

  const addContribution = () => {

    const newContribution: Contribution = {
      id: Date.now(),

      memberId,

      type,

      amount: getAmount(),

      status: "pending",

      date: new Date().toLocaleDateString(),

      createdAt: new Date().toISOString(),

      deadline: contributionRules.deadline,

      verifiedBy: undefined,
    };

    save([...contributions, newContribution]);
  };

  //  Verify Payments
  const approvePayment = (id: number) => {

    const updated = contributions.map((c) => c.id === id ? {...c, status: "paid", verifiedBy: "admin", }: c);
    save(updated);
  };

  const markUnpaid = (id: number) => {
    const updated = contributions.map((c) => c.id === id ? {...c, status: "unpaid", verifiedBy: "admin",} : c );
    save(updated);
  };

  const deleteContribution = (id: number) => {

  const updated = contributions.filter( (c) => c.id !== id);
  save(updated);
  };

  return (
    <div>

      <Navbar />

      <div className="admin-dashboard">

        <h1>Admin Dashboard</h1>

        <Notification message="Admin controls rules, payments, verification, and reports"/>

      
        <select
          onChange={(e) => setMemberId(Number(e.target.value))}>
          <option value={1}>Member 1</option>
          <option value={2}>Member 2</option>
          <option value={3}>Member 3</option>
          <option value={4}>Member 4</option>
          <option value={5}>Member 5</option>
          <option value={6}>Member 6</option>
        </select>

        {/* TYPE */}
        <select value={type}
          onChange={(e) => setType(e.target.value as | "main" | "token" | "savings")}>
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
            type="number"
            placeholder="Enter savings"
            onChange={(e) => setAmount(Number(e.target.value)) }/>)}

        <button onClick={addContribution}>
          Add Contribution
        </button>

        <hr />

        {contributions.map((item) => (
          <div key={item.id}>

            <ContributionCard contribution={item}/>

            <button
              onClick={() => approvePayment(item.id)}>
              Approve
            </button>

            <button
              onClick={() => markUnpaid(item.id)}>
              Mark Unpaid
            </button>

            <button
              onClick={() =>
              deleteContribution(item.id)}>
              Delete
            </button>
          </div>
        ))}

      </div>
    </div>
  );
};

export default AdminDashboard;
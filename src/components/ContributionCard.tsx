import type { Contribution } from "../types";

type Props = {
  contribution: Contribution;
};

const ContributionCard = ({ contribution }: Props) => {
  return (
    <div className="card">

      <h3>{contribution.type.toUpperCase()}</h3>

      <p>Amount: ₦{contribution.amount}</p>

      <p>Status: {contribution.status}</p>

      <p>
        Verified By:{" "}
        {contribution.verifiedBy || "Not Verified"}
      </p>

      <p>Date: {contribution.date}</p>

      <p>Deadline: {contribution.deadline}</p>

      <p>Member ID: {contribution.memberId}</p>

    </div>
  );
};

export default ContributionCard;
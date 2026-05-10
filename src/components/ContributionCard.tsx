import type { Contribution } from "../types";

type Props = {
  contribution: Contribution;
};

const ContributionCard = ({
  contribution,
}: Props) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "10px",
      }}
    >
      <h3>
        {contribution.type.toUpperCase()}
      </h3>

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

      <p>
        Member ID:
        {contribution.memberId}
      </p>
    </div>
  );
};

export default ContributionCard;
type Props = {
  message: string;
  type?: "success" | "warning" | "info";
};

const Notification = ({
  message,
  type = "info",
}: Props) => {
  return (
    <div
      style={{
        padding: "10px",
        margin: "10px 0",
        borderRadius: "6px",
        background:
          type === "success"
            ? "#d4edda"
            : type === "warning"
            ? "#fff3cd"
            : "#d1ecf1",
      }}>
      {message}
    </div>
  );
};

export default Notification;
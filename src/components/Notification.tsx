type Props = {
  message: string;
};

const Notification = ({
  message,
}: Props) => {
  return (
    <div
      style={{
        background: "#d1e7dd",
        padding: "15px",
        marginBottom: "10px",
        borderRadius: "10px",
      }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
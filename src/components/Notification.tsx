type Props = {
  message: string;
  type?: "success" | "warning" | "info";
};

const Notification = ({
  message,
  type = "info",
}: Props) => {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
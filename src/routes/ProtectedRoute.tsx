import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  role: "admin" | "member";
};

const ProtectedRoute = ({
  children, role,
}: Props) => {
  const user = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  if (!user.email) {
    return <Navigate to="/" />;
  }

  if (user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
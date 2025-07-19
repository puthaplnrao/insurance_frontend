import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, roles = [] }) {
  const location = useLocation();
  const reduxUser = useSelector((state) => state.auth.user);

  const storedUser = localStorage.getItem("user");
  console.log(storedUser);
  const user = reduxUser || (storedUser && JSON.parse(storedUser));

  if (!user) {
    return (
      <Navigate
        to={`/login?role=${roles[0] || "individual"}`}
        state={{ from: location }}
        replace
      />
    );
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}

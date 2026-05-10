import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser") || "{}"
  );

  const logout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div>
        <h2 className="navbar-title">
          Monthly Contribution System
        </h2>
      </div>

      <div className="navbar-links">

        {currentUser.role === "admin" && (
          <>
            <Link to="/admin" className="nav-link">
              Dashboard
            </Link>

            <Link to="/reports" className="nav-link">
              Reports
            </Link>
          </>
        )}

        {currentUser.role === "member" && (
          <Link to="/member" className="nav-link">
            Dashboard
          </Link>
        )}

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
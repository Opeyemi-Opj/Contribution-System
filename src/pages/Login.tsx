import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { members } from '../data/members';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = members.find( (member) => member.email === email && member.password === password);

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/member");
    }
  };

  return (
    <div className="login-container">
  <form className="login-form">
    <h1>Monthly Contribution System</h1>

    <input
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <input
      type="password"
      placeholder="Password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button onClick={handleLogin}>
      Login
    </button>
  </form>
</div>
  );
};

export default Login;
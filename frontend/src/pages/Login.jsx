import { useState } from "react";
import { login, register } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // login | register
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const data = await login({ email, password });
        loginUser(data.token);
        onLogin();
      } else {
        await register({ email, password });
        alert("Registered successfully. Please login.");
        setMode("login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
  <div style={styles.container}>
    <form style={styles.card} onSubmit={handleSubmit}>
      <h2 style={styles.title}>
        {mode === "login" ? "Admin Login" : "Register"}
      </h2>

      <div style={styles.fieldGroup}>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button style={styles.button}>
          {mode === "login" ? "Login" : "Register"}
        </button>
      </div>

      <p style={styles.switch}>
        {mode === "login" ? "No account?" : "Already have an account?"}
        <span
          style={styles.link}
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login" ? " Register" : " Login"}
        </span>
      </p>
    </form>
  </div>
);

};
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #e0e7ff, #f8fafc)"
  },

  card: {
    width: "360px",
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 20px 25px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb"
  },

  title: {
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "22px",
    fontWeight: "600",
    color: "#111827"
  },

  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none"
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer"
  },

  switch: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#374151"
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "600",
    marginLeft: "4px"
  }
};

export default Login;

import { useState } from "react";
import Login from "./pages/Login";
import Leads from "./pages/Leads";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated } = useAuth();
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());

  return (
    <div style={styles.app}>
      {loggedIn ? (
        <Leads />
      ) : (
        <Login onLogin={() => setLoggedIn(true)} />
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#f4f6f8"
  }
};

export default App;

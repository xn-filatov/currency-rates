import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Auth from "./Components/Auth";
import MainPage from "./Components/MainPage";

function App() {
  const [hasToken, setHasToken] = useState(false);
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token)
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users/checkToken`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((res) => {
          setHasToken(true);
        })
        .catch(console.log);
  }, []);

  return (
    <div className="App">
      <div
        className="p-2 text-center"
        style={{ backgroundColor: "darkblue", color: "white" }}
      >
        <h3>Your Exchange Rate Application</h3>
      </div>
      <div className="d-flex justify-content-center">
        {(!hasToken && <Auth setHasToken={setHasToken} />) || <MainPage />}
      </div>
    </div>
  );
}

export default App;

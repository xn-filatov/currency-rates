import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";

function TodaysRate(props) {
  const { currencyFrom } = props;
  const [cookies] = useCookies(["token"]);
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/todayrates/${currencyFrom}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((res) => {
        setCurrencies(res.data);
      })
      .catch(console.log);
  }, [currencyFrom]);

  const currenciesList =
    currencies &&
    Object.keys(currencies).map((key) => (
      <p>
        {key} {currencies[key].toFixed(4)}
      </p>
    ));

  return (
    <div className="col-6 col-md-4 border border-secondary">
      <div
        className="row"
        style={{ backgroundColor: "darkblue", color: "white" }}
      >
        <div className="col">Todays's rates</div>
        <div className="col text-left">1 {currencyFrom} = </div>
      </div>
      <div>{currenciesList}</div>
    </div>
  );
}

export default TodaysRate;

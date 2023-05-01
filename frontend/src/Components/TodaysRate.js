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
    Object.keys(currencies).map((key, i, arr) => (
      <div className="row px-5" key={key}>
        <div className="col"> {key}</div>
        <div className="col" style={{ textAlign: "right" }}>
          <p>{currencies[key].toFixed(4)}</p>
        </div>
        {i < arr.length - 1 && <hr />}
      </div>
    ));

  return (
    <div className="col-3 border border-secondary  px-0">
      <div style={{ backgroundColor: "darkblue", color: "white" }}>
        <div className="container row py-2">
          <div className="col">Todays's rates</div>
          <div className="col" style={{ textAlign: "right" }}>
            1 {currencyFrom} =
          </div>
        </div>
      </div>
      <div className="mt-2">{currenciesList}</div>
    </div>
  );
}

export default TodaysRate;

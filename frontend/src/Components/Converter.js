import { useCookies } from "react-cookie";
import axios from "axios";
import { useEffect, useState } from "react";
import currencyList from "../Static/currencyList.json";

function Converter(props) {
  const { currencyFrom, setCurrencyFrom, currencyTo, setCurrencyTo } = props;
  const [cookies] = useCookies(["token"]);
  const [amountToConvert, setAmountToConvert] = useState(1000);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    convert(currencyFrom, currencyTo);
  }, [amountToConvert, currencyFrom, currencyTo]);

  const convert = (from, to) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/convert/${from}/${to}`, {
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((res) => {
        setConvertedAmount((res.data[to] * amountToConvert).toFixed(2));
        setExchangeRate(res.data[to]);
      })
      .catch(console.log);
  };

  const currencyOptions = Object.keys(currencyList).map((key) => (
    <option key={key} value={key}>
      {currencyList[key]}
    </option>
  ));

  return (
    <div className="mx-3">
      <p>From</p>
      <div className="row">
        <div className="col">
          <input
            type="number"
            defaultValue={amountToConvert}
            step={0.05}
            onChange={(e) => {
              setAmountToConvert(parseFloat(e.target.value));
            }}
          />
        </div>
        <div className="col">
          <select
            defaultValue={currencyFrom}
            onChange={(e) => setCurrencyFrom(e.target.value)}
          >
            {currencyOptions}{" "}
          </select>
        </div>
      </div>
      <p>To</p>
      <div className="row">
        <div className="col">
          <input type="number" value={convertedAmount} disabled={true} />
        </div>
        <div className="col">
          <select
            defaultValue={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
          >
            {currencyOptions}
          </select>
        </div>
      </div>
      <hr />
      <div>
        <p>Your rate</p>
        <p>
          {currencyFrom} 1 = {`${currencyTo} ${exchangeRate.toFixed(4)}`}
        </p>
        <p>Last update 2018 Nov 26 18:11:04</p>
      </div>
    </div>
  );
}
export default Converter;

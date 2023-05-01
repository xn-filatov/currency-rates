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
        <div className="col-3">
          <input
            type="number"
            defaultValue={amountToConvert}
            step={0.05}
            onChange={(e) => {
              setAmountToConvert(parseFloat(e.target.value));
            }}
          />
        </div>
        <div className="col-9">
          <select
            defaultValue={currencyFrom}
            onChange={(e) => setCurrencyFrom(e.target.value)}
          >
            {currencyOptions}
          </select>
        </div>
      </div>
      <p>To</p>
      <div className="row">
        <div className="col-3">
          <input type="number" value={convertedAmount} disabled={true} />
        </div>
        <div className="col-9">
          <select
            defaultValue={currencyTo}
            onChange={(e) => setCurrencyTo(e.target.value)}
          >
            {currencyOptions}
          </select>
        </div>
      </div>
      <hr />

      <div>Your rate:</div>
      <div>
        {currencyFrom} 1 = {`${currencyTo} ${exchangeRate.toFixed(4)}`}
      </div>
      <div>Last update 2023 May 1 16:12:04</div>
    </div>
  );
}
export default Converter;

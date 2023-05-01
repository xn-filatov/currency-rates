import Currency from "./Currency/Currency";
import TodaysRate from "./TodaysRate";
import { useState } from "react";

function MainPage() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  return (
    <div className="container mt-5">
      <div className="row justify-content-around">
        <Currency
          currencyFrom={currencyFrom}
          setCurrencyFrom={setCurrencyFrom}
          currencyTo={currencyTo}
          setCurrencyTo={setCurrencyTo}
        />
        <TodaysRate currencyFrom={currencyFrom} />
      </div>
    </div>
  );
}

export default MainPage;

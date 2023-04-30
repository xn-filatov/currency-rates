import Currency from "./Currency";
import TodaysRate from "./TodaysRate";
import { useState } from "react";

function MainPage() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyTo, setCurrencyTo] = useState("EUR");

  return (
    <div className="container mt-5">
      <div className="row g-0">
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

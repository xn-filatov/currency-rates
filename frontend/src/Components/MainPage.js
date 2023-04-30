import CurrencyConverter from "./CurrencyConverter";
import TodaysRate from "./TodaysRate";
import { useState } from "react";

function MainPage() {
  const [currencyFrom, setCurrencyFrom] = useState("USD");

  return (
    <div className="container mt-5">
      <div className="row g-0">
        <CurrencyConverter
          currencyFrom={currencyFrom}
          setCurrencyFrom={setCurrencyFrom}
        />
        <TodaysRate currencyFrom={currencyFrom} />
      </div>
    </div>
  );
}

export default MainPage;

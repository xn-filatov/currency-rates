import CurrencyConverter from "./CurrencyConverter";
import TodaysRate from "./TodaysRate";

function MainPage() {
  return (
    <div className="container mt-5">
      <div className="row g-0">
        <CurrencyConverter />
        <TodaysRate />
      </div>
    </div>
  );
}

export default MainPage;

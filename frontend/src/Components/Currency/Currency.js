import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Currency.scss";
import Converter from "../Converter";
import HistoricalRates from "../HistoricalRates/HistoricalRates";
import { useState } from "react";

function Currency(props) {
  const { currencyFrom, setCurrencyFrom, currencyTo, setCurrencyTo } = props;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <div className="col-8 border border-secondary px-0">
      <Tabs className="currency">
        <TabList className="pt-1">
          <Tab>Currency converter</Tab>
          <Tab>Historical rates</Tab>
        </TabList>
        <TabPanel>
          <Converter
            currencyFrom={currencyFrom}
            setCurrencyFrom={setCurrencyFrom}
            currencyTo={currencyTo}
            setCurrencyTo={setCurrencyTo}
          />
        </TabPanel>
        <TabPanel>
          <HistoricalRates
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            selectedTabIndex={selectedTabIndex}
            setSelectedTabIndex={setSelectedTabIndex}
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Currency;

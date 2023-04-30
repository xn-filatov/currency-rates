import { Tab, Tabs, TabList } from "react-tabs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function HistoricalRates(props) {
  const { currencyFrom, currencyTo, selectedTabIndex, setSelectedTabIndex } =
    props;
  const [cookies] = useCookies(["token"]);
  const [historicalRatesData, setHistoricalRatesData] = useState(null);

  useEffect(() => {
    const spans = [1, 3, 6, 12];
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/historyrates/${currencyFrom}/${currencyTo}/${spans[selectedTabIndex]}`,
        {
          headers: { Authorization: `Bearer ${cookies.token}` },
        }
      )
      .then((res) => {
        setHistoricalRatesData(res.data);
      })
      .catch(console.log);
  }, [selectedTabIndex]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${currencyFrom} vs ${currencyTo}`,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
        },
      },
    },
  };

  const labels = historicalRatesData && Object.keys(historicalRatesData);

  const data = {
    labels,
    datasets: [
      {
        fill: "origin",
        data:
          historicalRatesData &&
          Object.values(historicalRatesData).map((x) => x[currencyTo]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <Tabs
      selectedIndex={selectedTabIndex}
      onSelect={(tabIndex) => setSelectedTabIndex(tabIndex)}
    >
      <TabList>
        <Tab>Last month</Tab>
        <Tab>Last 3 months</Tab>
        <Tab>Last 6 months</Tab>
        <Tab>Last 12 months</Tab>
      </TabList>

      {historicalRatesData && <Line options={options} data={data} />}
    </Tabs>
  );
}

export default HistoricalRates;

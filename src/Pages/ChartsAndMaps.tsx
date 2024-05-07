import axios from "axios";

import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import WorldMap from "../Components/WorldMap";
interface ChartsAndMaps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    tension: number;
  }[];
}
const Dashboard = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [chartData, setChartData] = useState<ChartsAndMaps>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios("https://disease.sh/v3/covid-19/countries").then((res) => {
      const data = res.data;
      setCountriesData(data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((res) => {
        const data = res.data;

        const newChartData: ChartsAndMaps = {
          labels: Object.keys(data.cases),
          datasets: [
            {
              label: "Cases",
              data: Object.values(data.cases) as number[],
              fill: false,
              borderColor: "#f50057",
              tension: 0.2,
            },
          ],
        };

        setChartData(newChartData);
      });

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
  }, []);

  return (
    <div className="  w-full pt-20 px-4 pb-8">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">
        Corona Cases Chart
      </h1>
      <div className="border-2 border-red-100 w-11/12  m-auto 10 auto 10">
        {chartData.datasets ? (
          <Line data={chartData} />
        ) : (
          <h1 className="text-pink-600 mb-4 font-bold text-2xl">Loading...</h1>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-4 mt-4 text-blue-500">
        Corona Cases World Map
      </h1>
      <div className="border-2 border-blue-500 w-11/12  m-auto 5 auto 5">
        <WorldMap countriesData={countriesData} />
      </div>
    </div>
  );
};

export default Dashboard;
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function ScoreChart({ history }) {

  const data = {
    labels: history.map((_, index) => `Attempt ${index + 1}`),
    datasets: [
      {
        label: "Score",
        data: history.map(item => item.score),
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6"
      }
    ]
  };

  return <Line data={data} />;
}

export default ScoreChart;
import { useGetMonthlyPostChartQuery } from "@/redux/features/post/postApi";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MonthlyPostChart = () => {
  const { data, isLoading } = useGetMonthlyPostChartQuery({});

  console.log("post chartData:", data);
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        // <div>
        //   <h2 className="text-lg font-semibold text-emerald-500">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-center text-emerald-500">
            Monthly Post
            <span className="text-gray-500 text-xs ml-1">
              (based on current month)
            </span>
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data?.data}
              margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
            >
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="postCount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default MonthlyPostChart;

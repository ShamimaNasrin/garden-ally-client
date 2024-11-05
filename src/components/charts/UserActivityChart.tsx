/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetUserActivityChartQuery } from "@/redux/features/user/userApi";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import LoadingSpinner from "../UI/LoadingSpinner";

const COLORS = ["#82ca9d", "#8884d8"];

type TChartData = {
  status: string;
  count: number;
};

const UserActivityChart = () => {
  const { data, isLoading } = useGetUserActivityChartQuery({});

  // console.log("chartData hook:", data);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="">
          <h2 className="text-lg font-semibold text-emerald-500">
            User Activity{" "}
            <span className="text-gray-500 text-xs">
              (based on last 7 days)
            </span>
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={data?.data}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {data?.data.map((entry: TChartData, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default UserActivityChart;

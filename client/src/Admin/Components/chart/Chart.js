import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./chart.scss"

const Chart = ({ aspect, title }) => {
  const [monthlyEarningsData, setMonthlyEarningsData] = useState([]);

  useEffect(() => {
    // Fetch monthly earnings data
    fetch('/admin/monthlyEarnings')
      .then((response) => response.json())
      .then((data) => setMonthlyEarningsData(data))
      .catch((error) => console.error("Error fetching monthly earnings data:", error));
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={monthlyEarningsData} // Use the fetched data
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4800" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF4800" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#FF4800"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

import React, { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../../Admin/Components/chart/chart.scss"



const ChartS = ({ aspect, title }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/soleDistributor/monthlySales');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching monthly sales data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#107b9f" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#107b9f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Sales"
            stroke="#107b9f"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartS;

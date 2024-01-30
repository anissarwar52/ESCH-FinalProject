import React, { useState, useEffect } from 'react';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./featured.scss"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  const [target, setTarget] = useState(4000000); // Set your target revenue here
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [lastWeekEarnings, setLastWeekEarnings] = useState(0);
  const [lastMonthEarnings, setLastMonthEarnings] = useState(0);

  // Fetch data from your backend for today, last week, and last month earnings
  useEffect(() => {
    // Fetch today's earnings
    fetch('/admin/todayEarnings')
      .then((response) => response.json())
      .then((data) => setTodayEarnings(data.todayEarnings))
      .catch((error) => console.error('Error fetching today earnings:', error));

    // Fetch last week's earnings
    fetch('/admin/lastWeekEarnings')
      .then((response) => response.json())
      .then((data) => setLastWeekEarnings(data.lastWeekEarnings))
      .catch((error) => console.error('Error fetching last week earnings:', error));

    // Fetch last month's earnings
    fetch('/admin/lastMonthEarnings')
      .then((response) => response.json())
      .then((data) => setLastMonthEarnings(data.lastMonthEarnings))
      .catch((error) => console.error('Error fetching last month earnings:', error));
  }, []);

  const todayRevenuePercentage = Math.floor((todayEarnings / target) * 100);


  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={todayRevenuePercentage}
            text={`${todayRevenuePercentage}%`}
            strokeWidth={5}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">${todayEarnings}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">${target}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${lastWeekEarnings}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">${lastMonthEarnings}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;


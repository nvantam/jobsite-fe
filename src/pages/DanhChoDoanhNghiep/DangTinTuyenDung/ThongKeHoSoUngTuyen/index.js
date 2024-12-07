import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import classNames from "classnames/bind";
import styles from "./Thongkehosoungtuyen.module.scss";

const cx = classNames.bind(styles);

function ThongKeHoSoUngTuyen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); 
    const day = today.getDate().toString().padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`; 

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/company/analysist",
          { date: currentDate },  
          { withCredentials: true }
        );
        const apiData = response.data;

        const chartData = Object.keys(apiData).map((month) => ({
          thang: `Tháng ${month}`,
          soluong:  apiData[month], 
        }));

        setData(chartData);
        setLoading(false);
      } catch (error) {
        setError("Không thể tải dữ liệu. Vui lòng thử lại!");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={cx("loading")}>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className={cx("error")}>{error}</div>;
  }

  return (
    <div className={cx("thongkehosoungtuyen")}>
      <h2>Thống Kê Hồ Sơ Ứng Tuyển Theo Tháng</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="thang" />
          <YAxis  dataKey="soluong" />
          <Tooltip />
          <Legend formatter={() => "Ứng viên"} />
          <Bar
            dataKey="soluong"
            fill="blue"
            activeBar={<Rectangle fill="blue" stroke="blue" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ThongKeHoSoUngTuyen;

import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Thongtintkungvien.module.scss";

const cx = classNames.bind(styles);

function ThongTinTKDoanhNghiep() {
  const [ungvienData, setungvienData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/participant/profile", { withCredentials: true })
      .then((response) => {
        setungvienData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi lấy dữ liệu từ API");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Đang tải dữ liệu...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className={cx("ungvien-info")}>
      <h2>Thông Tin Tài Khoản Ứng Viên</h2>
      <div className={cx("profile")}>
        <img
          src= {`http://localhost:8080${ungvienData.photo_url}` }
          alt="ung vien Logo"
          className={cx("profile-photo")}
        />
        <h3>{ungvienData.name}</h3>
      </div>
      <div className={cx("details")}>
        <p>
          <strong>Email:</strong> {ungvienData.email}
        </p>
      
        <p>
          <strong>Số điện thoại:</strong> {ungvienData.phone}
        </p>
        <p>
          <strong>Trạng thái:</strong> {ungvienData.status}
        </p>
      </div>
    </div>
  );
}

export default ThongTinTKDoanhNghiep;

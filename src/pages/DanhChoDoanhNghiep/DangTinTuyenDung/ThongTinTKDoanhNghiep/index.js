import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Thongtintkdoanhnghiep.module.scss";

const cx = classNames.bind(styles);

function ThongTinTKDoanhNghiep() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/company", { withCredentials: true })
      .then((response) => {
        setCompanyData(response.data);
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
    <div className={cx("company-info-company")}>
      <h2>Thông Tin Tài Khoản Doanh Nghiệp</h2>
      <div className={cx("profile")}>
        <img
          src= {`http://localhost:8080${companyData.photo_url}` }
          alt="Company Logo"
          className={cx("profile-photo")}
        />
        <h3>{companyData.name}</h3>
      </div>
      <div className={cx("details")}>
        <p>
          <strong>Email:</strong> {companyData.email}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {companyData.address}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {companyData.phone}
        </p>
        <p>
          <strong>Mô tả:</strong> {companyData.description}
        </p>
        <p>
          <strong>Trạng thái:</strong> {companyData.status}
        </p>
      </div>
    </div>
  );
}

export default ThongTinTKDoanhNghiep;

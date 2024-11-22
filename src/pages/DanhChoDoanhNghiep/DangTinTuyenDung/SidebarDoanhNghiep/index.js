import classNames from "classnames/bind";
import styles from "./Sidebardoanhnghiep.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function SidebarDoanhNghiep({ activeTab, onTabClick }) {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/account/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.removeItem("userNameDoanhNghiep");
        window.location.href = "/trangchudoanhnghiep";
      }
    } catch (error) {}
  };

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
    <aside className={cx("sidebardangtintuyendung")}>
      <div className={cx("profile")}>
      <img
          src= {`http://localhost:8080${companyData.photo_url}` }
          alt="Company Logo"
          className={cx("profile-photo")}
        />
        <h3>{companyData.name}</h3>
      </div>
      <nav className={cx("nav")}>
        <ul>
          <li
            className={cx({ [styles.active]: activeTab === "dangbai" })}
            onClick={() => onTabClick("dangbai")}
          >
            Đăng bài tuyển dụng
          </li>
          <li
            className={cx({ [styles.active]: activeTab === "baidangcuatoi" })}
            onClick={() => onTabClick("baidangcuatoi")}
          >
            Bài đăng của tôi
          </li>
          <li
            className={cx({ [styles.active]: activeTab === "hosoungtuyen" })}
            onClick={() => onTabClick("hosoungtuyen")}
          >
            Hồ sơ ứng tuyển
          </li>
          <li
            className={cx({ [styles.active]: activeTab === "account" })}
            onClick={() => onTabClick("account")}
          >
            Thông tin tài khoản
          </li>
          <li
            className={cx({ [styles.active]: activeTab === "changePassword" })}
            onClick={() => onTabClick("changePassword")}
          >
            Đổi mật khẩu
          </li>
          <li onClick={handleLogout} >Đăng xuất</li>
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarDoanhNghiep;

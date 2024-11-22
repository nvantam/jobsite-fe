import React,{useEffect, useState} from "react";
import classNames from "classnames/bind";
import styles from "./Sidebarungvien.module.scss";

import axios from "axios";
const cx = classNames.bind(styles);

function SidebarUngVien({ activeTab, onTabClick }) {
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

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/account/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.removeItem("userNameUngVien");
        window.location.href = "/vieclam";
      }
    } catch (error) {}
  };
if (loading) return <h2>Đang tải dữ liệu...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <aside className={cx("sidebar")}>
      <div className={cx("profile")}>
      <img
          src= {`http://localhost:8080${ungvienData.photo_url}`}
          alt="ung vien Logo"
          className={cx("profile-photo")}
        />
        <h3>{ungvienData.name}</h3>
      </div>
      <nav className={cx("nav")}>
        <ul>
          <li
            className={cx({ [styles.active]: activeTab === "cv" })}
            onClick={() => onTabClick("cv")}
          >
            CV của tôi
          </li>
          <li
            className={cx({ [styles.active]: activeTab === "congviec" })}
            onClick={() => onTabClick("congviec")}
          >
            Công việc đã nộp CV
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
          <li onClick={handleLogout}>Đăng Xuất</li>
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarUngVien;

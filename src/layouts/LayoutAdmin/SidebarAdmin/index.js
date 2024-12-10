import React from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Sidebaradmin.module.scss";

const cx = classNames.bind(styles);

function Sidebar() {
  const navigate = useNavigate();
  const userNameAdmin = localStorage.getItem("userNameAdmin");
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/account/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.removeItem("userNameAdmin");

        alert("Tài khoản đã được đăng xuất");

        navigate("/admin");
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      alert("Đã xảy ra lỗi trong quá trình đăng xuất.");
    }
  };

  return (
    <div className={cx("sidebaradmin")}>
      <h2 className={cx("titleadmin")}>Tài khoản quản trị {userNameAdmin} </h2>
      <nav>
        <ul className={cx("menuadmin")}>
          <li className={cx("menu-itemadmin")}>
            <NavLink
              to="/admin/quanlytaikhoan"
              className={(navData) => cx({ active: navData.isActive })}
            >
              Quản Lý Tài Khoản Doanh Nghiệp
            </NavLink>
          </li>
          <li className={cx("menu-itemadmin")}>
            <NavLink
              to="/admin/quanlydangtin"
              className={(navData) => cx({ active: navData.isActive })}
            >
              Quản Lý Tin Tuyển Dụng
            </NavLink>
          </li>
          <li className={cx("menu-itemadmin")}>
            <NavLink
              to="/admin/quanlythongbao"
              className={(navData) => cx({ active: navData.isActive })}
            >
              Quản Lý Thông Báo
            </NavLink>
          </li>
          <li className={cx("menu-itemadmin")}>
            <NavLink
              to="/admin/quanlynhanvienquantri"
              className={(navData) => cx({ active: navData.isActive })}
            >
              Quản Lý Quản Lý Nhân Viên
            </NavLink>
          </li>
          <li className={cx("menu-itemadmin")}>
            <NavLink
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
            >
              Đăng Xuất
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import logo from "~/assets/logo.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";

const cx = classNames.bind(styles);

function Header() {
  const [thaXuong, datThaXuong] = useState(false);

  const thaXuongTaiKhoan = () => {
    datThaXuong(!thaXuong);
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div>
          <Link to="/"><img src={logo} className={cx("logo")} alt="logo" /></Link> 
        </div>
        <div className={cx("container")}>
          <Link to="/">Việc Làm</Link>
          <Link to="/hosocv">Hồ Sơ & CV</Link>
          <Link to="/dangtintuyendung">Đăng Tin Tuyển Dụng</Link>
          <Link to="/thongbao">Thông Báo</Link>
        </div>
        <div className={cx("account")}>
          <span onClick={thaXuongTaiKhoan}>
            <img src={logo} className={cx("avatar")} alt="avatar" />
            Tâm
          </span>
          <div style={{ display: thaXuong ? "block" : "none" }}>
            <ul>
              <li>
                <Link to="/taikhoan"> Tài Khoản</Link>
              </li>
              <li>Đăng Xuất</li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

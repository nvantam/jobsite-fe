import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import logo from "~/assets/logo.jpg";
import { Link } from "react-router-dom";
// import { useState } from "react";

const cx = classNames.bind(styles);

function Header() {
  // const [thaXuong, datThaXuong] = useState(false);

  // const thaXuongTaiKhoan = () => {
  //   datThaXuong(!thaXuong);
  // };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div>
          <Link to="/">
            <img src={logo} className={cx("logo")} alt="logo" />
          </Link>
        </div>
        <div className={cx("container")}>
          <Link to="/">Việc Làm</Link>
          <Link to="/hosocv">Hồ Sơ & CV</Link>
          <Link to="/thongbao">Thông Báo</Link>
        </div>
        <div className={cx("khoitaikhoan")}>
          {/* <div className={cx("account")} style={{ marginRight: "25px" }}>
            <span onClick={thaXuongTaiKhoan}>
              <img src={logo} className={cx("avatar")} alt="avatar" />
              Tâm
            </span>
            <div style={{ display: thaXuong ? "block" : "none" }}>
              <ul>
                <li>Đăng Xuất</li>
              </ul>
            </div>
          </div> */}
          <Link to="/dangnhaptktimviec">
            <div className={cx("text1")}>Người tìm việc</div> Đăng kí/Đăng nhập
          </Link>
          <hr
            style={{
              height: "60px",
              borderLeft: "0,3px  white",
              margin: "0 10px",
            }}
          />
          <Link to="/dangtintuyendung">
            <div className={cx("text1")}>Dành Cho</div> Nhà Tuyển Dụng
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

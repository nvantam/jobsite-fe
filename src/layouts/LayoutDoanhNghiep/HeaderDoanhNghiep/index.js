import classNames from "classnames/bind";
import styles from "./Headerdoanhnghiep.module.scss";
import logo from "~/assets/logo.jpg";
import { Link } from "react-router-dom";
// import { useState } from "react";

const cx = classNames.bind(styles);

function HeaderDoanhNghiep() {
  // const [thaXuong, datThaXuong] = useState(false);

  // const thaXuongTaiKhoan = () => {
  //   datThaXuong(!thaXuong);
  // };

  return (
    <header className={cx("wrapperdoanhnghiep")}>
      <div className={cx("innerdoanhnghiep")}>
        <div>
          <Link to="/trangchudoanhnghiep">
            <img src={logo} className={cx("logodoanhnghiep")} alt="logo" />
          </Link>
        </div>
        <div className={cx("containerdoanhnghiep")}>
          <Link to="/trangchudoanhnghiep">Dành Cho Doanh Nghiệp</Link>
          <Link to="/dangtintuyendung">Đăng Tin Tuyển Dụng</Link>
          <Link to="/thongbaodoanhnghiep">Thông Báo</Link>
        </div>
        <div className={cx("khoitaikhoandoanhnghiep")}>
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
          <Link to="/dangnhaptkdoanhnghiep">
            <div className={cx("text1")}>Nhà Tuyển Dụng</div> Đăng kí/Đăng nhập
          </Link>
          <hr
            style={{
              height: "60px",
              borderLeft: "0,3px  white",
              margin: "0 10px",
            }}
          />
          <Link to="/">
            <div className={cx("text1")}>Dành Cho</div> Người Tìm Việc
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderDoanhNghiep;

import classNames from "classnames/bind";
import styles from "./Headerdoanhnghiep.module.scss";
import logo from "~/assets/logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function HeaderDoanhNghiep() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userNameDoanhNghiep");
    if (storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/account/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.removeItem("userNameDoanhNghiep");
        setIsLoggedIn(false);
        setUserName("");
        navigate("/trangchudoanhnghiep");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const checkUserDoanhNghiep = (e, targetPath) => {
    const storedUserName = localStorage.getItem("userNameDoanhNghiep");
    if (storedUserName) {
      navigate(targetPath);
    } else {
      navigate("/dangnhaptkdoanhnghiep");
    }
    e.preventDefault();
  };

  const isDangTinTuyenDungPage = location.pathname === "/dangtintuyendung";

  return (
    <header className={cx("wrapperdoanhnghiep")}>
      <div className={cx("innerdoanhnghiep")}>
        <div className={cx("containerdoanhnghiepa")}>
          <Link to="/trangchudoanhnghiep">
            <img src={logo} className={cx("logodoanhnghiep")} alt="logo" />
          </Link>
          <div className={cx("containerdoanhnghiep")}>
            <Link to="/trangchudoanhnghiep">Dành Cho Doanh Nghiệp</Link>
            <Link
              to="/dangtintuyendung"
              onClick={(e) => checkUserDoanhNghiep(e, "/dangtintuyendung")}
            >
              Đăng Tin Tuyển Dụng
            </Link>
              
              <Link to="/thongbaodoanhnghiep" onClick={(e) => checkUserDoanhNghiep(e, "/thongbaodoanhnghiep")} >Thông Báo</Link>
          </div>
        </div>

        <div className={cx("khoitaikhoandoanhnghiep")}>
          {isLoggedIn ? (
            <div className={cx("account")} style={{ marginRight: "25px" }}>
              <span>
                <img src={logo} className={cx("avatar")} alt="avatar" />
                {userName}
              </span>
              <div>
                <ul>
                  <li onClick={handleLogout}>Đăng Xuất</li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/dangnhaptkdoanhnghiep">
              <div className={cx("text1")}>Nhà Tuyển Dụng</div> Đăng kí/Đăng
              nhập
            </Link>
          )}
          {!isDangTinTuyenDungPage && (
            <hr
              style={{
                height: "60px",
                borderLeft: "0.3px white",
                margin: "0 10px",
              }}
            />
          )}
          {!isDangTinTuyenDungPage && (
            <Link to="/vieclam">
              <div className={cx("text1")}>DÀNH CHO</div> Người Tìm Việc
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default HeaderDoanhNghiep;

import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import logo from "~/assets/logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userNameUngVien, setUserNameUngVien] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const storedUserName = localStorage.getItem("userNameUngVien");
    if (storedUserName) {
      setIsLoggedIn(true);
      setUserNameUngVien(storedUserName);
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
        localStorage.removeItem("userNameUngVien");
        setIsLoggedIn(false);
        setUserNameUngVien("");
        navigate("/vieclam");
      }
    } catch (error) {
    }
  };

  const checkUserAndNavigate = (e, targetPath) => {
    const storedUserName = localStorage.getItem("userNameUngVien");
    if (storedUserName) {
      navigate(targetPath);
    } else {
      navigate("/dangnhaptktimviec");
    }
    e.preventDefault();
  };

  const isHoSoCVPage = location.pathname === "/hosocv";

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("containera")}>
          <Link to="/vieclam">
            <img src={logo} className={cx("logo")} alt="logo" />
          </Link>
          <div className={cx("container")}>
            {/* <div className={cx("danhchoungvien")}>
              <Link to="/">Dành Cho Ứng Viên</Link>
            </div> */}
            <div className={cx("trangvieclam")}>
              <Link to="/vieclam">Việc Làm</Link>
            </div>

            <div className={cx("tranghoso")}>
              <Link
                to="/hosocv"
                onClick={(e) => checkUserAndNavigate(e, "/hosocv")}
              >
                Hồ Sơ & CV
              </Link>
            </div>
             <div className={cx("thongbaoungvien")}>
              <Link to="/thongbao" onClick={(e) => checkUserAndNavigate(e, "/thongbao")} >Thông Báo</Link>
            </div>
          </div>
        </div>

        <div className={cx("khoitaikhoan")}>
          {isLoggedIn ? (
            <div className={cx("account")} style={{ marginRight: "25px" }}>
              <span>
                <img src={logo} className={cx("avatar")} alt="avatar" />
                {userNameUngVien}
              </span>
              <div>
                <ul>
                  <li onClick={handleLogout}>Đăng Xuất</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              <Link to="/dangnhaptktimviec">
                <div className={cx("text1")}>Người tìm việc</div> Đăng kí/Đăng
                nhập
              </Link>
            </>
          )}

          {!isHoSoCVPage && (
            <hr
              style={{
                height: "60px",
                borderLeft: "0.3px white",
                margin: "0 10px",
              }}
            />
          )}

          {!isHoSoCVPage && (
            <Link to="/trangchudoanhnghiep">
              <div className={cx("text1")}>DÀNH CHO</div> Nhà Tuyển Dụng
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

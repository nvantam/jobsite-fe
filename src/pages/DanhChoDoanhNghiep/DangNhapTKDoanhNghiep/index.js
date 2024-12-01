import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import styles from "./Dangnhaptkdoanhnghiep.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DangNhapTKDoanhNghiep() {
  const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/account/login/company`, {
        email,
        password,
      },{ withCredentials: true } );

      if (response.status === 200) {
        
        localStorage.setItem("userNameDoanhNghiep", email.split("@")[0]);
        localStorage.removeItem("userNameUngVien");
        localStorage.removeItem("userNameAdmin");

        navigate("/trangchudoanhnghiep");
      } else {
        throw new Error("Đăng nhập thất bại. Vui lòng kiểm tra thông tin!");
      }
    } catch (error) {
      setErrorMessage("Đăng nhập thất bại. Sai thông tin tài khoản hoặc mật khẩu");
    }
  };

  const handleClose = () => {
    navigate("/trangchudoanhnghiep");
  };

  return (
    <div className={cx("logincontainertkdoanhnghiep")}>
      <div className={cx("formdangnhaptkdoanhnghiep")}>
        <button onClick={handleClose} className={cx("closeButton")}>
          ×
        </button>

        <h2 className={cx("tieudedangnhaptkdoanhnghiep")}>Nhà tuyển dụng đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <label className={cx("labelemailtkdoanhnghiep")}>
            Địa chỉ email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cx("emailtkdoanhnghiep")}
            />
          </label>
          <label className={cx("labelpasstkdoanhnghiep")}>
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cx("passwordtkdoanhnghiep")}
            />
          </label>
          {errorMessage && <p className={cx("error")}>{errorMessage}</p>}
          <button type="submit" className={cx("btndangnhaptkdoanhnghiep")}>
            Đăng nhập
          </button>
        </form>
        <div className={cx("quenmatkhautkdoanhnghiep")}>
          <Link to="/quenmatkhaudoanhnghiep" className={cx("linkquenmatkhaudoanhnghiep")}>
            Quên mật khẩu?
          </Link>
          <p className={cx("dangkitkdoanhnghiepmoi")}>
            Bạn là nhà tuyển dụng mới?{" "}
            <Link to="/dangkitkdoanhnghiep" className={cx("linkdangkidoanhnghiepmoi")}>
              Đăng ký tài khoản
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DangNhapTKDoanhNghiep;

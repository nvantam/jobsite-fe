import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import styles from "./Adminlogin.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function AdminLogin() {
  const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(
        `${URL}/admin/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("userNameAdmin", email.split("@")[0]);
        localStorage.removeItem("userNameDoanhNghiep");
        localStorage.removeItem("userNameUngvien");
        navigate("/admin/quanlytaikhoan");
      } else {
        throw new Error("Đăng nhập thất bại. Vui lòng kiểm tra thông tin!");
      }
    } catch (error) {
      setErrorMessage(
        "Đăng nhập thất bại. Sai thông tin tài khoản hoặc mật khẩu"
      );
    }
  };

  return (
    <div className={cx("logincontainertkadmin")}>
      <div className={cx("formdangnhaptkadmin")}>
        <h2 className={cx("tieudedangnhaptkadmin")}>
          Admin Đăng nhập 
        </h2>
        <form onSubmit={handleLogin}>
          <label className={cx("labelemailtkadmin")}>
            Địa chỉ email
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cx("emailtkadmin")}
            />
          </label>
          <label className={cx("labelpasstkadmin")}>
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cx("passwordtkadmin")}
            />
          </label>
          {errorMessage && <p className={cx("error")}>{errorMessage}</p>}
          <button type="submit" className={cx("btndangnhaptkadmin")}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import styles from "./Dangnhaptimviec.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DangNhapTKTimViec() {
  const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/account/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Đăng nhập thành công:", response.data);
        navigate("/");
      } else {
        throw new Error("Đăng nhập thất bại. Vui lòng kiểm tra thông tin!");
      }
    } catch (error) {
      setErrorMessage("Đăng nhập thất bại. Sai thông tin tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className={cx("logincontainertktimviec")}>
      <div className={cx("formdangnhaptktimviec")}>
        <h2  className={cx("tieudedangnhaptktimviec")} >Người tìm việc đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <label className={cx("labelemailtktimviec")}>
            Địa chỉ email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cx("emailtktimviec")}
            />
          </label>
          <label className={cx("labelpasstktimviec")} >
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cx("passwordtktimviec")}
            />
          </label>
          {errorMessage && <p className={cx("error")}>{errorMessage}</p>}
          <button type="submit" className={cx("btndangnhaptktimviec")}>
            Đăng nhập
          </button>
        </form>
        <div className={cx("quenmatkhautktimviec")}>
          <Link to="/quenmatkhautimviec" className={cx("linkquenmatkhautimviec")}>
            Quên mật khẩu?
          </Link>
          <p className={cx("dangkitktimviecmoi")}>
            Bạn là người tìm việc mới?{" "}
            <Link to="/dangkitktimviec" className={cx("linkdangkitimviecmoi")}>
              Đăng ký tài khoản
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DangNhapTKTimViec;

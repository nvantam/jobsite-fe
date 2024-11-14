import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styles from "./Dangnhaptimviec.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DangNhapTKTimViec() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login functionality here
    console.log("Logging in with", email, password);
  };

  return (
    <div className={cx("logincontainer")}>
      <div className={cx("formdangnhap")}>
        <h2>Người tìm việc đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <label>
            Địa chỉ email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={cx("email")}
            />
          </label>
          <label>
            Mật khẩu
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={cx("password")}
            />
          </label>
          <button type="submit" className={cx("btndangnhap")}>
            Đăng nhập
          </button>
        </form>
        <div className={cx("links")}>
          <Link to="/quenmatkhautimviec" className={cx("link")}>
            Quên mật khẩu?
          </Link>
          <p>
            Bạn là người tìm việc mới?{" "}
            <Link to="/dangkitktimviec" className={cx("link")}>
              Đăng ký tài khoản
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DangNhapTKTimViec;

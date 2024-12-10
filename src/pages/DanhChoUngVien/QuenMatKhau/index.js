import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Quenmatkhau.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function QuenMatKhau() {
  const URL = process.env.REACT_APP_URL || "http://localhost:8080"; 
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  const handleClose = () => {
    navigate("/vieclam");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); 
    setSuccessMessage(""); 

    try {
      const response = await axios.post(`${URL}/account/password`, { email });

      if (response.status === 200) {
        setSuccessMessage("Vui lòng kiểm tra email của bạn để lấy lại mật khẩu."); 
        setEmail(""); 
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Tài khoản của bạn không tồn tại trên hệ thống.");
      }
    }
  };

  return (
    <div className={cx("logincontainertktimviec")}>
      <div className={cx("formdangnhaptktimviec")}>
        <button onClick={handleClose} className={cx("closeButtonTimViec")}>
          ×
        </button>
        <h2 className={cx("tieudedangnhaptktimviec")}>
          Quên mật khẩu
        </h2>

        <form onSubmit={handleSubmit}> 
          <label className={cx("labelemailtktimviec")}>
            <h3>Tài khoản</h3>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập tài khoản của bạn để lấy mật khẩu"
              required
              className={cx("emailtktimviec")}
            />
          </label>

          {errorMessage && <p className={cx("error")}>{errorMessage}</p>}
          {successMessage && <p className={cx("success")}>{successMessage}</p>}

          <button type="submit" className={cx("btndangnhaptktimviec")}>
            Lấy lại mật khẩu
          </button>
        </form>

        <div className={cx("quenmatkhautktimviec")}>
          <p className={cx("dangkitktimviecmoi")}>
            Bạn là người tìm việc mới?{" "}
            <Link to="/dangkitktimviec" className={cx("linkdangkitimviecmoi")}>
              Đăng ký tài khoản
            </Link>
            <div></div>
            Bạn là nhà tuyển dụng mới?{" "}
            <Link to="/dangkitkdoanhnghiep" className={cx("linkdangkitimviecmoi")}>
              Đăng ký tài khoản
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuenMatKhau;

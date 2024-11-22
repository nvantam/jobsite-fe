import React, { useState } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import styles from "./Doimatkhauuv.module.scss";

const cx = classNames.bind(styles);

function DoiMatKhauUngVien() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và mật khẩu xác nhận không khớp.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    setError("");

    try {
      await axios.put(
        "http://localhost:8080/account/password",
        {
          password: newPassword,
          old_password: oldPassword,
        },
        {withCredentials: true},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Đổi mật khẩu thành công!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  return (
    <div className={cx("doi-mat-khau-ung-vien")}>
      <h2>Đổi Mật Khẩu Ứng Viên</h2>
      <div className={cx("form-container")}>
        <div className={cx("form-group")}>
          <label htmlFor="oldPassword">Mật khẩu cũ</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Nhập mật khẩu cũ"
            className={cx("input-field")}
          />
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="newPassword">Mật khẩu mới</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            className={cx("input-field")}
          />
        </div>

        <div className={cx("form-group")}>
          <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu mới"
            className={cx("input-field")}
          />
        </div>

        {error && <div className={cx("error-message")}>{error}</div>}
        {success && <div className={cx("success-message")}>{success}</div>}

        <button onClick={handleChangePassword} className={cx("btn-doimatkhau")}>
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
}

export default DoiMatKhauUngVien;

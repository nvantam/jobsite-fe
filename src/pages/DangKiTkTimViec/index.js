import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Dangkitimviec.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DangKiTKTimViec() {
  const URL = process.env.REACT_APP_URL;

  const [formData, setFormData] = useState({
    email: "",
    maXacThuc: "",
    hoVaTen: "",
    sdt: "",
    matKhau: "",
    avatar: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({
            ...formData,
            avatar: reader.result,
          });
        };
        reader.readAsDataURL(file);
      } else {
        alert("Vui lòng chọn file ảnh.");
      }
    }
  };
  const handleSendVerifyCode = async () => {
    if (!formData.email) {
      setErrorMessage("Vui lòng nhập email để nhận mã xác thực.");
      return;
    }

    try {
      const response = await fetch(`${URL}/account/send_email/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerifyMessage("Mã xác thực đã gửi về email của bạn.");
        setErrorMessage("");
      } else {
        setErrorMessage(data.message || "Không thể gửi mã xác thực.");
        setVerifyMessage("");
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra khi kết nối với máy chủ.");
      setVerifyMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.hoVaTen && formData.email && formData.matKhau && formData.maXacThuc && formData.sdt) {
      const phoneNumber = parseInt(formData.sdt, 10); 
      if (isNaN(phoneNumber)) {
        setErrorMessage("Số điện thoại không hợp lệ.");
        return;
      }
  
      try {
        const response = await fetch(`http://localhost:8080/account/register/participant`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.matKhau,
            name: formData.hoVaTen,
            phone: phoneNumber,  // Gửi số điện thoại dưới dạng integer
            code: formData.maXacThuc,
          }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setSuccessMessage("Đăng ký thành công!");
          setErrorMessage("");
          setFormData({
            hoVaTen: "",
            email: "",
            sdt: "",
            matKhau: "",
            maXacThuc: "",
            avatar: "",
          });
        } else {
          setErrorMessage(data.message || "Đăng ký thất bại.");
          setSuccessMessage("");
        }
      } catch (error) {
        setErrorMessage("Có lỗi xảy ra khi kết nối với máy chủ.");
        setSuccessMessage("");
      }
    } else {
      setErrorMessage("Vui lòng điền đầy đủ thông tin.");
    }
 
  };

  return (
    <div className={cx("formcontainerdangkitktimviec")}>
      <div className={cx("dangkitktimviec")}>
        <h2 className={cx("tieudedangkitktimviec")} >Đăng ký tài khoản dành cho người tìm việc</h2>
        <form className={cx("formdangkitktimviec")} onSubmit={handleSubmit}>
          <div className={cx("form-groupdangkitktimviec")}>
            <label className={cx("labelemaildangkitktimviec")}>Địa chỉ email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Điền email"
              required
            />
            <button
              type="button"
              onClick={handleSendVerifyCode}
              className={cx("btnverifydangkitktimviec")}
            >
              Nhận mã xác thực
            </button>
          </div>
          {verifyMessage && (
            <p className={cx("verifymessagedangkitktimviec")}>{verifyMessage}</p>
          )}

          <div className={cx("form-groupdangkitktimviec")}>
            <label className={cx("labelcodedangkitktimviec")}>Mã xác thực</label>
            <input
              type="text"
              name="maXacThuc"
              value={formData.maXacThuc}
              onChange={handleChange}
              placeholder="Điền mã xác thực"
              required
            />
          </div>
          <div className={cx("form-groupdangkitktimviec")}>
            <label className={cx("labeltendangkitktimviec")}>Tên Của Bạn</label>
            <input
              type="text"
              name="hoVaTen"
              value={formData.hoVaTen}
              onChange={handleChange}
              placeholder="Điền họ và tên"
              required
            />
          </div>
          <div className={cx("form-groupdangkitktimviec")}>
            <label className={cx("labelsdtdangkitktimviec")}>Số Điện Thoại</label>
            <input
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              placeholder="Điền số điện thoại"
              required
            />
          </div>
          <div className={cx("form-groupdangkitktimviec")}>
            <label className={cx("labelpassdangkitktimviec")}>Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              placeholder="Điền mật khẩu"
              required
            />
          </div>
          <div className={cx("form-groupdangkitktimviec")}>
            <label className={cx("labelavatardangkitktimviec")} htmlFor="avatar">Ảnh đại diện</label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className={cx("btndangkitktimviec")}>
            Hoàn thành đăng ký
          </button>
        </form>
        {successMessage && (
          <p className={cx("success-messagedangkitktimviec")}>{successMessage}</p>
        )}
        {errorMessage && <p className={cx("error-message")}>{errorMessage}</p>}
        <p className={cx("linkdangnhaptktimviec")}>
          Bạn đã có tài khoản? <Link to="/dangnhaptktimviec">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}

export default DangKiTKTimViec;

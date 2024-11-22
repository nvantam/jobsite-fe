import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Dangkitkdoanhnghiep.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function DangKiTKDoanhNghiep() {
  const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    maXacThuc: "",
    hoVaTen: "",
    sdt: "",
    diachi: "",
    mota: "",
    matKhau: "",
    urlfile: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; 
    const fileInput = e.target; 

    if (!file) {
        alert("Không có tệp nào được chọn.");
        return;
    }

    if (file.type !== "application/pdf") {
        alert("Vui lòng chọn một tệp PDF.");
        fileInput.value = ""; 
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        const arrayBuffer = reader.result; 
        const uint8Array = new Uint8Array(arrayBuffer); 

        const base64String = btoa(
            uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), "")
        );

        setFormData((prevData) => ({
            ...prevData,
            urlfile: base64String, 
        }));
    };

    reader.readAsArrayBuffer(file); 
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

    if (
      formData.hoVaTen &&
      formData.email &&
      formData.matKhau &&
      formData.maXacThuc &&
      formData.sdt
    ) {
      const phoneNumber = parseInt(formData.sdt, 10);
      if (isNaN(phoneNumber)) {
        setErrorMessage("Số điện thoại không hợp lệ.");
        return;
      }

      try {
        const response = await fetch(`${URL}/account/register/company`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.matKhau,
            name: formData.hoVaTen,
            phone: phoneNumber,
            address: formData.diachi,
            description: formData.mota,
            code: formData.maXacThuc,
            fileurl: formData.urlfile,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setFormData({
            hoVaTen: "",
            email: "",
            sdt: "",
            address: "",
            diachi: "",
            maXacThuc: "",
            mota: "",
            matKhau: "",
            urlfile: "",
          });
          setShowDialog(true);
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
  const handleCloseDialog = () => {
    setShowDialog(false);
    navigate("/dangnhaptkdoanhnghiep"); 
  };
  return (
    <div className={cx("formcontainerdangkitkdoanhnghiep")}>
      <div className={cx("dangkitkdoanhnghiep")}>
        <h2 className={cx("tieudedangkitkdoanhnghiep")}>
          Đăng ký tài khoản dành cho nhà tuyển dụng
        </h2>
        <form className={cx("formdangkitkdoanhnghiep")} onSubmit={handleSubmit}>
          <div className={cx("form-groupdangkitkdoanhnghiep")}>
            <label className={cx("labelemaildangkitkdoanhnghiep")}>
              Địa chỉ email
            </label>
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
              className={cx("btnverifydangkitkdoanhnghiep")}
            >
              Nhận mã xác thực
            </button>
          </div>
          {verifyMessage && (
            <p className={cx("verifymessagedangkitkdoanhnghiep")}>
              {verifyMessage}
            </p>
          )}

          <div className={cx("form-groupdangkitkdoanhnghiep")}>
            <label className={cx("labelcodedangkitkdoanhnghiep")}>
              Mã xác thực
            </label>
            <input
              type="text"
              name="maXacThuc"
              value={formData.maXacThuc}
              onChange={handleChange}
              placeholder="Điền mã xác thực"
              required
            />
          </div>
          <div className={cx("form-groupdangkitkdoanhnghiep")}>
            <label className={cx("labeltendangkitkdoanhnghiep")}>
              Tên của bạn
            </label>
            <input
              type="text"
              name="hoVaTen"
              value={formData.hoVaTen}
              onChange={handleChange}
              placeholder="Điền họ và tên"
              required
            />
          </div>
          <div className={cx("form-groupdangkitkdoanhnghiep")}>
            <label className={cx("labelsdtdangkitkdoanhnghiep")}>
              Số điện thoại
            </label>
            <input
              type="text"
              name="sdt"
              value={formData.sdt}
              onChange={handleChange}
              placeholder="Điền số điện thoại"
              required
            />
          </div>
          <div className={cx("form-groupdangkitkdoanhnghiep")}>
            <label className={cx("labeldiachidangkitkdoanhnghiep")}>
              Địa chỉ
            </label>
            <input
              type="text"
              name="diachi"
              value={formData.diachi}
              onChange={handleChange}
              placeholder="Điền địa chỉ"
              required
            />
          </div>
          <div className={cx("form-groupdangkitkdoanhnghiep")}>
            <label className={cx("labelmotadangkitkdoanhnghiep")}>
              Mô tả về công ty
            </label>
            <input
              type="text"
              name="mota"
              value={formData.mota}
              onChange={handleChange}
              placeholder="Điền mô tả"
              required
            />
          </div>
          <div className={cx("form-groupdangkitkdoanhnghiep")}>
            <label className={cx("labelpassdangkitkdoanhnghiep")}>
              Mật khẩu
            </label>
            <input
              type="password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleChange}
              placeholder="Điền mật khẩu"
              required
            />
          </div>
          <div className={cx("form-groupdangkitkdoanhnghiep")}>
            <label
              className={cx("labelfiledangkitkdoanhnghiep")}
              htmlFor="urlfile"
            >
              File giấy chứng nhận doanh nghiệp PDF
            </label>
            <input
              type="file"
              id="urlfile"
              name="urlfile"
              onChange={handleFileChange}
              accept=".pdf"
            />
          </div>

          <button type="submit" className={cx("btndangkitkdoanhnghiep")}>
            Hoàn thành đăng ký
          </button>
        </form>
        {successMessage && (
          <p className={cx("success-messagedangkitkdoanhnghiep")}>
            {successMessage}
          </p>
        )}
        {errorMessage && <p className={cx("error-message")}>{errorMessage}</p>}
        <p className={cx("linkdangnhaptkdoanhnghiep")}>
          Bạn đã có tài khoản?{" "}
          <Link to="/dangnhaptkdoanhnghiep">Đăng nhập</Link>
        </p>
      </div>
      {showDialog && (
        <div className={cx("dialog-overlay")}>
          <div className={cx("dialog")}>
            <h3>Đăng ký thành công!</h3>
            <p>Bạn đã đăng ký tài khoản thành công.</p>
            <button onClick={handleCloseDialog}>Đăng nhập ngay</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DangKiTKDoanhNghiep;

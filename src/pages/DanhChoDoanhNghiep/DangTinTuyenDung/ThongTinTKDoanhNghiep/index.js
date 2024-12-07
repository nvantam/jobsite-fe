import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Thongtintkdoanhnghiep.module.scss";

const cx = classNames.bind(styles);

function ThongTinTKDoanhNghiep() {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    urlfile: "",
  });

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

  const handleVerifyCompany = async () => {
    if (!formData.urlfile) {
      alert("Vui lòng chọn file xác minh!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        "http://localhost:8080/company/verify",
        { fileurl: formData.urlfile },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Gửi lại xác minh doanh nghiệp thành công chờ thông báo từ hệ thống!");
      }
    } catch (err) {
      alert("Đã xảy ra lỗi khi xác minh doanh nghiệp.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/company", { withCredentials: true })
      .then((response) => {
        setCompanyData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Lỗi khi lấy dữ liệu từ API");
        setLoading(false);
      });
  }, []);

  if (loading) return <h2>Đang tải dữ liệu...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className={cx("company-info-company")}>
      <h2>Thông Tin Tài Khoản Doanh Nghiệp</h2>
      <div className={cx("profile")}>
        <img
          src={`http://localhost:8080${companyData.photo_url}`}
          alt="Company Logo"
          className={cx("profile-photo")}
        />
        <h3>{companyData.name}</h3>
      </div>
      <div className={cx("details")}>
        <p>
          <strong>Email:</strong> {companyData.email}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {companyData.address}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {companyData.phone}
        </p>
        <p>
          <strong>Mô tả:</strong> {companyData.description}
        </p>
        <p>
          <strong>Trạng thái:</strong> {companyData.status}
        </p>
      </div>

      {companyData.status === "Chưa xác nhận" && (
        <div className={cx("guilaixacminhdoanhnghiep")}>
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

          <button
            type="button"
            className={cx("btndangkitkdoanhnghiep")}
            onClick={handleVerifyCompany}
            disabled={loading}
          >
           Gửi Lại Xác Minh Doanh Nghiệp
          </button>
        </div>
      )}
    </div>
  );
}

export default ThongTinTKDoanhNghiep;

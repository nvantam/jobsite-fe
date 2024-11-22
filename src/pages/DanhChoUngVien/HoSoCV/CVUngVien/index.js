import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./CVungvien.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function CVUngVien() {
  const [fileBase64, setFileBase64] = useState("");
  const [cvList, setCvList] = useState([]);
  const [filename, setFilename] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý khi chọn file
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      alert("Không có tệp nào được chọn.");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Vui lòng chọn một tệp PDF.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      const uint8Array = new Uint8Array(arrayBuffer);

      const base64String = btoa(
        uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), "")
      );

      setFileBase64(base64String);
    };

    reader.readAsArrayBuffer(file);
  };

  // Xử lý upload CV
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!fileBase64 || !filename) {
      alert("Vui lòng chọn file và nhập tên CV!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/cv",
        {
          filename,
          fileurl: fileBase64,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Tải lên thành công!");
        setFilename("");
        setFileBase64("");
        fetchCvList(); 
      }
    } catch (error) {
      alert("Đã xảy ra lỗi khi tải lên CV.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCvList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cv", {
        withCredentials: true,
      });
      setCvList(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setCvList([]); 
    }
  };

  useEffect(() => {
    fetchCvList();
  }, []);

  return (
    <div className={cx("ung-vien-container")}>
      <h2 className={cx("tieu-de")}>Trang CV Ứng Viên</h2>

      <form className={cx("form-upload")} onSubmit={handleUpload}>
        <div className={cx("form-group")}>
          <label className={cx("label")} htmlFor="filename">
            Tên CV:
          </label>
          <input
            type="text"
            id="filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className={cx("input")}
            placeholder="Nhập tên CV"
          />
        </div>
        <div className={cx("form-group")}>
          <label className={cx("label")} htmlFor="file">
            Chọn file PDF:
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            className={cx("input")}
            accept="application/pdf"
          />
        </div>
        <button type="submit" className={cx("button")} disabled={loading}>
          {loading ? "Đang tải lên..." : "Tải lên CV"}
        </button>
      </form>

      <h3 className={cx("tieu-de-danh-sach")}>Danh sách CV đã tải lên:</h3>
      {cvList.length === 0 ? (
        <p className={cx("no-data")}>Bạn vẫn chưa đăng tải CV lên Website</p>
      ) : (
        <ul className={cx("danh-sach-cv")}>
          {cvList.map((cv, index) => (
            <li key={index} className={cx("cv-item")}>
              <span className={cx("ten-cv")}>{cv.filename}</span>
              <a
                href={`http://localhost:8080${cv.fileurl}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cx("link-xem")}
              >
                Xem CV
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CVUngVien;

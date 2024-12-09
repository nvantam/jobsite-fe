import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Chitietvieclam.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ChiTietViecLam() {
  const { id } = useParams();
  const [chiTiet, setChiTiet] = useState(null);
  const [cvList, setCvList] = useState([]);
  const [selectedCv, setSelectedCv] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/post/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setChiTiet(response.data);
      })
      .catch(() => {});

    axios
      .get("http://localhost:8080/cv", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCvList(response.data);
      })
      .catch(() => {
        setCvList([]);
      });
  }, [id]);

  const idbaidang = id;
  const userNameUngVien = localStorage.getItem("userNameUngVien");
  const checkDangNhap = () => {
    if (!userNameUngVien) {
      setShowDialog(false);
      navigate("/dangnhaptktimviec");
    }
    if (userNameUngVien) {
      setShowDialog(true);
    }
  };

  const handleApply = () => {
    if (!selectedCv) {
      alert("Vui lòng chọn một CV để ứng tuyển!");
      return;
    }

    if (!description.trim()) {
      alert("Vui lòng nhập lý do ứng tuyển!");
      return;
    }

    axios
      .post(
        "http://localhost:8080/post/apply",
        {
          post_id: idbaidang,
          cv_id: selectedCv,
          description: description.trim(),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Ứng tuyển thành công!");
        setShowDialog(false);
      })
      .catch((error) => {
        setCvList([]);
        alert("Bạn đã ứng tuyển bài đăng này 1 lần rồi!");
      });
  };

  if (!chiTiet) {
    return <div>Đang tải dữ liệu...</div>;
  }

  return (
    <div className={cx("chitietvieclam")}>
      <h2 className={cx("chitietvieclamtitle")}>Chi Tiết Việc Làm</h2>
      <div className={cx("thongtinchung")}>
        <img
          src= {`http://localhost:8080${chiTiet.photo_url}`}
          alt="logo công ty"
          className={cx("logocongty")}
        />
        <div className={cx("thongtin")}>
          <h3>{chiTiet.name} </h3>
          <h2>{chiTiet.title}</h2>
          <div className={cx("thongtinluong")}>
            <div>Mức Lương: {chiTiet.salary} VNĐ</div>
            <div>
              Hạn nộp hồ sơ:{" "}
              {chiTiet.close_at
                ? new Date(chiTiet.close_at).toLocaleDateString()
                : "Đang cập nhật"}
            </div>
            <div>Địa Chỉ Làm Việc: {chiTiet.address}</div>
          </div>
          <div className={cx("nutnophoso")}>
            <button onClick={() => checkDangNhap()}>Ứng tuyển ngay</button>
          </div>
        </div>
      </div>

      <div className={cx("thongtinchitet")}>
        <div className={cx("motacongviec")}>
          <h3>Mô Tả Công Việc</h3>
          <div>{chiTiet.description}</div>
        </div>
        <div className={cx("yeucaukinang")}>
          <h3>Yêu Cầu Kĩ Năng</h3>
          <div>{chiTiet.skill}</div>
        </div>
        <div className={cx("diachilamviec")}>
          <h3>Địa Chỉ Làm Việc</h3>
          <div>{chiTiet.address}</div>
        </div>
        <div className={cx("soluongconlai")}>
          <h3>Số Lượng Còn Lại</h3>
          <div>{chiTiet.remain}</div>
        </div>
      </div>

      {showDialog && (
        <div className={cx("dialogUngTuyen")}>
          <div className={cx("dialog-content")}>
            <h3>Ứng tuyển công việc {chiTiet.title}</h3>
            {cvList && cvList.length > 0 ? (
              <div className={cx("select-cv")}>
                <label htmlFor="cvSelect" className={cx("label")}>
                  Chọn CV:
                </label>
                <select
                  id="cvSelect"
                  className={cx("cv-dropdown")}
                  value={selectedCv}
                  onChange={(e) => setSelectedCv(e.target.value)}
                >
                  <option value="">-- Chọn CV của bạn --</option>
                  {cvList.map((cv) => (
                    <option key={cv.id} value={cv.id}>
                      {cv.filename}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className={cx("no-cv")}>
                Bạn chưa có CV nào để ứng tuyển. Vui lòng đăng tải CV trước khi
                ứng tuyển.
              </div>
            )}
            <textarea
              className={cx("description-input")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập lý do hoặc thông tin bổ sung"
            />
            <div className={cx("dialog-actions")}>
              <button className={cx("button")} onClick={handleApply}>
                Gửi ứng tuyển
              </button>
              <button
                className={cx("button", "cancel")}
                onClick={() => setShowDialog(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChiTietViecLam;

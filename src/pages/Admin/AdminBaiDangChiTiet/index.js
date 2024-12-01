import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Adminbaidangchitet.module.scss";

const cx = classNames.bind(styles);

function AdminBaiDangChiTiet() {
  const { id } = useParams();
  const [jobPost, setJobPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeniedDialog, setShowDeniedDialog] = useState(false);
  const [deniedContent, setDeniedContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobPostDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/admin/post/${id}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setJobPost(response.data);
      } catch (err) {
        setError("Không thể tải chi tiết bài đăng.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobPostDetail();
  }, [id]);

  if (loading) return <div>Đang tải...</div>;

  if (error) return <div>{error}</div>;

  const handleButtonClickActive = (idtaikhoan) => {
    axios
      .put(
        "http://localhost:8080/admin/post",
        { id: idtaikhoan },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Bài đăng đã được kích hoạt thành công!");
        navigate("/admin/quanlydangtin");
      })
      .catch((error) => {});
  };

  const handleButtonClickDenied = (idtaikhoan) => {
    setShowDeniedDialog(true); // Mở dialog khi bấm nút Denied
  };

  const handleDeniedSubmit = () => {
    if (!deniedContent.trim()) {
      alert("Vui lòng nhập lý do từ chối.");
      return;
    }

    axios
      .put(
        "http://localhost:8080/admin/post/denied",
        { id: jobPost.id, content: deniedContent },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Bài đăng đã bị từ chối!");
        navigate("/admin/quanlydangtin");
      })
      .catch(() => {
        alert("Có lỗi xảy ra khi từ chối bài đăng.");
      })
      .finally(() => {
        setShowDeniedDialog(false); // Đóng dialog sau khi gửi dữ liệu
      });
  };

  return (
    <div className={cx("admin-baidang-chitiet")}>
      <h2>Bài Đăng Chi Tiết</h2>
      {jobPost && (
        <div className={cx("job-post-detail")}>
          <img
            src={`http://localhost:8080${jobPost.photo_url}`}
            alt={jobPost.name}
            className={cx("company-photo")}
          />
          <h3>{jobPost.title}</h3>
          <p>
            <strong>Công ty:</strong> {jobPost.name}
          </p>
          <p>
            <strong>Mô tả:</strong> {jobPost.description}
          </p>
          <p>
            <strong>Kỹ năng:</strong> {jobPost.skill}
          </p>
          <p>
            <strong>Địa điểm:</strong> {jobPost.address}
          </p>
          <p>
            <strong>Ngày hết hạn:</strong>{" "}
            {new Date(jobPost.close_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Lương:</strong> {jobPost.salary} VNĐ
          </p>
        </div>
      )}

      <div className={cx("button-group")}>
        <button
          onClick={() => handleButtonClickActive(jobPost.id)}
          className={cx("btnactivebaidang")}
        >
          Kích hoạt
        </button>
        <button
          onClick={() => handleButtonClickDenied(jobPost.id)}
          className={cx("btndeniedbaidang")}
        >
          Từ chối
        </button>
      </div>

      {showDeniedDialog && (
        <div className={cx("dialog-denied")}>
          <div className={cx("dialog-content")}>
            <h3>Nhập lý do từ chối bài đăng</h3>
            <textarea
              className={cx("reason-input")}
              value={deniedContent}
              onChange={(e) => setDeniedContent(e.target.value)}
              placeholder="Nhập lý do từ chối..."
            />
            <div className={cx("dialog-actions")}>
              <button onClick={handleDeniedSubmit} className={cx("submit-btn")}>
                Gửi lý do
              </button>
              <button
                onClick={() => setShowDeniedDialog(false)}
                className={cx("cancel-btn")}
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

export default AdminBaiDangChiTiet;

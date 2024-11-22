import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Adminquanlybaidang.module.scss";

const cx = classNames.bind(styles);

function AdminQuanLyBaiDang() {
  const [jobPosts, setJobPosts] = useState([]); 
  const [isDialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userNameAdmin = localStorage.getItem("userNameAdmin");
    if (!userNameAdmin) {
      setDialogOpen(true);
    }
    axios
      .get("http://localhost:8080/admin/post", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setJobPosts(response.data);
        } else {
          setJobPosts([]);
        }
      })
      .catch((error) => {
        setJobPosts([]);
      });
  }, []);

  const handleLoginRedirect = () => {
    setDialogOpen(false);
    navigate("/admin");
  };

  const handleClickPost = (id) => {
    navigate(`/admin/quanlydangtin/baidangchitiet/${id}`);
  };

  return (
    <div className={cx("adminquanlybaidangmoi")}>
      {isDialogOpen && (
        <div className={cx("dialog-overlay")}>
          <div className={cx("dialog")}>
            <h3>Yêu cầu đăng nhập</h3>
            <p>Bạn cần đăng nhập để truy cập vào trang này.</p>
            <button onClick={handleLoginRedirect} className={cx("dialog-btn")}>
              Đăng nhập
            </button>
          </div>
        </div>
      )}
      <h2 className={cx("adminquanlybaidang")}>Quản lý Bài Đăng</h2>
      <div className={cx("admindanhsachbaidang")}>
        {jobPosts.map((dangbai) => (
          <div
            key={dangbai.id}
            className={cx("adminbaidang")}
            onClick={() => handleClickPost(dangbai.id)} 
          >
            <img
              src={dangbai.photo_url}
              alt={dangbai.name}
              className={cx("company-photo")}
            />
            <h3>{dangbai.title}</h3>
            <p>
              <strong>Công ty:</strong> {dangbai.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminQuanLyBaiDang;

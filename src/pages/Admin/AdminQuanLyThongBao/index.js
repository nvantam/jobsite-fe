import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Adminquanlythongbao.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function AdminQuanLyThongBao() {
  const [notifications, setNotifications] = useState([]);
  const [notiTitle, setNotiTitle] = useState("");
  const [notiContent, setNotiContent] = useState("");
  const [isSendNotiDialogOpen, setSendNotiDialogOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios
      .get("http://localhost:8080/noti/admin/send", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setNotifications(response.data);
        } else {
          setNotifications([]);
        }
      })
      .catch(() => {
        setNotifications([]);
      });
  };

  const handleSendNotiDialogOpen = () => {
    setSendNotiDialogOpen(true);
  };

  const handleSendNotiDialogClose = () => {
    setSendNotiDialogOpen(false);
    setNotiTitle("");
    setNotiContent("");
  };

  const handleSendNotiSubmit = () => {
    if (!notiTitle || !notiContent) {
      alert("Vui lòng điền tiêu đề và nội dung thông báo.");
      return;
    }

    const requestData = {
      title: notiTitle,
      content: notiContent,
    };

    axios
      .post("http://localhost:8080/noti", requestData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Gửi thông báo thành công!");
          handleSendNotiDialogClose();
          fetchNotifications();
        } else {
          alert("Không thể gửi thông báo.");
        }
      })
      .catch(() => {
        alert("Có lỗi xảy ra khi gửi thông báo.");
      });
  };

  const handleDeleteNotiSubmit = (id) => {
    axios
      .delete("http://localhost:8080/noti", {
        data: { id },
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          alert("Xoá thông báo thành công");
          fetchNotifications();
        }
      });
  };

  return (
    <div className={cx("containerquanlythongbaoadmin")}>
      <h2>Quản Lý Thông Báo</h2>

      <button
        onClick={handleSendNotiDialogOpen}
        className={cx("btn-them-thong-bao")}
      >
        Gửi Thông Báo Mới
      </button>

      <div className={cx("notification-list")}>
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <div key={noti.id} className={cx("notification-item")}>
              <h4>{noti.title}</h4>
              <label onClick={() => handleDeleteNotiSubmit(noti.id)}>x</label>
            </div>
          ))
        ) : (
          <p>Không có thông báo nào</p>
        )}
      </div>

      {isSendNotiDialogOpen && (
        <div className={cx("dialogsendnoti")}>
          <div className={cx("dialogsend")}>
            <h3>Gửi thông báo hệ thống</h3>
            <input
              type="text"
              value={notiTitle}
              onChange={(e) => setNotiTitle(e.target.value)}
              placeholder="Nhập tiêu đề thông báo..."
              className={cx("dialog-input")}
            />
            <textarea
              className={cx("dialog-textarea")}
              value={notiContent}
              onChange={(e) => setNotiContent(e.target.value)}
              placeholder="Nhập nội dung thông báo..."
            />
            <div className={cx("dialog-actions")}>
              <button
                onClick={handleSendNotiSubmit}
                className={cx("dialog-btn")}
              >
                Gửi
              </button>
              <button
                onClick={handleSendNotiDialogClose}
                className={cx("dialog-btn-cancel")}
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

export default AdminQuanLyThongBao;

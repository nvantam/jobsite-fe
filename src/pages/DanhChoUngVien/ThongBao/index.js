import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import { Modal } from "antd"; 
import styles from "./Thongbao.module.scss";

const cx = classNames.bind(styles);

function ThongBao() {
  const [notifications, setNotifications] = useState([]); 
  const [selectedNotification, setSelectedNotification] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/noti", {
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
  }, []);

  const handleNotificationClick = (noti_id) => {
    axios
      .get(`http://localhost:8080/noti/${noti_id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setSelectedNotification(response.data);
        setIsModalOpen(true); 
      })
      .catch(() => {
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null); 
  };

  return (
    <div className={cx("containerthongbao")}>
      <h2>Thông Báo Dành Cho Ứng Viên</h2>
      <div className={cx("notification-list")}>
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <div
              key={noti.id}
              className={cx("notification-item")}
              onClick={() => handleNotificationClick(noti.id)} 
            >
              <p>{noti.title}</p>
            </div>
          ))
        ) : (
          <p>Không có thông báo nào</p>
        )}
      </div>

      <Modal
        title={selectedNotification?.title}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedNotification && (
          <div>
            <p><strong>Nội dung:</strong> {selectedNotification.content}</p>
            <p><strong>Người gửi:</strong> {selectedNotification.sender}</p>
            <p><strong>Ngày tạo:</strong> {new Date(selectedNotification.created_at).toLocaleString()}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ThongBao;

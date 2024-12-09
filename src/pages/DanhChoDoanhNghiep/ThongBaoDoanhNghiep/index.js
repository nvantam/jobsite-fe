import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import { Modal } from "antd";
import styles from "./Thongbaodoanhnghiep.module.scss";

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
          const updatedNotifications = response.data.map((noti) => {
            const isNew = new Date() - new Date(noti.created_at) < 7 * 24 * 60 * 60 * 1000;
            return { ...noti, isNew };
          });
          setNotifications(updatedNotifications);
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
      .catch(() => {});
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNotification(null);
  };

  return (
    <div className={cx("containerthongbaodoanhnghiep")}>
      <h2>Thông Báo Dành Cho Doanh Nghiệp</h2>
      <div className={cx("notification-list")}>
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <div
              key={noti.id}
              className={cx("notification-item", { new: noti.isNew })} 
              onClick={() => handleNotificationClick(noti.id)}
            >
              <h3>{noti.title}</h3>
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

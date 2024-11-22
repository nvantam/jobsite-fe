import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Adminquanlythongbao.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function AdminQuanLyThongBao() {
  const [notifications, setNotifications] = useState([]); 

  useEffect(() => {
    axios
      .get("http://localhost:8080/noti/admin", {
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
      .catch((error) => {
        setNotifications([]); 
      });
  }, []);

  return (
    <div className={cx("containerquanlythongbaoadmin")}>
      <h2>Quản Lý Thông Báo</h2>
      <div className={cx("notification-list")}>
        {notifications.length > 0 ? (
          notifications.map((noti) => (
            <div key={noti.id} className={cx("notification-item")}>
              <p>{noti.title}</p>
            </div>
          ))
        ) : (
          <p>Không có thông báo nào</p>
        )}
      </div>
    </div>
  );
}

export default AdminQuanLyThongBao;

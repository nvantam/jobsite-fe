import styles from "./Hosocv.module.scss";
import React, { useState } from "react";
import classNames from "classnames/bind";
import logocongty from "~/assets/logocongty.jpg"

const cx = classNames.bind(styles);

function HoSoCV () {
  const [activeTab, setActiveTab] = useState("cv");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={cx("container")}>
      <aside className={cx("sidebar")}>
        <div className={cx("profile")}>
          <img src={logocongty} alt="User Profile" />
          <h3>Nguyễn Tâm</h3>
        </div>
        <nav className={cx("nav")}>
          <ul>
          <li className={cx({ [styles.active]: activeTab === "cv" })} onClick={() => handleTabClick("cv")}>CV của tôi</li>
            <li className={cx({ [styles.active]: activeTab === "account" })} onClick={() => handleTabClick("account")}>
              Thông tin tài khoản
            </li>
            <li className={cx({ [styles.active]: activeTab === "changePassword" })} onClick={() => handleTabClick("changePassword")}>
              Đổi mật khẩu
            </li>
            <li>Đăng xuất</li>
          </ul>
        </nav>
      </aside>

      <main className={cx("content")}>

      </main>
    </div>
  );
};

export default HoSoCV;

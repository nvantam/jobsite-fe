import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Hosocv.module.scss";
import Sidebar from "./SidebarUngVien"; 
import CVUngVien from "./CVUngVien";
import CongViecUngTuyen from "./CongViecUngTuyen";
import ThongTinTKUngVien from "./ThongTinTKUngVien"
import DoiMatKhauUngVien from "./DoiMatKhauUngVien";
const cx = classNames.bind(styles);

function HoSoCV() {
  const [activeTab, setActiveTab] = useState("cv");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={cx("containeruv")}>
      <Sidebar activeTab={activeTab} onTabClick={handleTabClick} />

      <main className={cx("content")}>
        {activeTab === "cv" && <div><CVUngVien/> </div>}
        {activeTab === "congviec" && <div><CongViecUngTuyen/></div>}
        {activeTab === "account" && <div><ThongTinTKUngVien/></div>}
        {activeTab === "changePassword" && <div><DoiMatKhauUngVien/></div>}
      </main>
    </div>
  );
}

export default HoSoCV;

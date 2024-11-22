import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Dangtintuyendung.module.scss";
import Sidebar from "./SidebarDoanhNghiep"; 
import DangBaiUngTuyen from "./DangBaiTuyenDung";
import BaiDanngCuaToi from "./BaiDangCuaToi";
import HoSoUngTuyen from "./HoSoUngTuyen";
import ThongTinTKDoanhNghiep from "./ThongTinTKDoanhNghiep";
import DoiMatKhauDoanhNghiep from "./DoiMatKhauDoanhNghiep";
const cx = classNames.bind(styles);

function DangTinTuyenDung() {
  const [activeTab, setActiveTab] = useState("dangbai");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={cx("containerdn")}>
      <Sidebar activeTab={activeTab} onTabClick={handleTabClick} />

      <main className={cx("content")}>
        {activeTab === "dangbai" && <div> <DangBaiUngTuyen/> </div>}
        {activeTab === "baidangcuatoi" && <div><BaiDanngCuaToi/></div>}
        {activeTab === "hosoungtuyen" && <div><HoSoUngTuyen/></div>}
        {activeTab === "account" && <div><ThongTinTKDoanhNghiep/></div>}
        {activeTab === "changePassword" && <div><DoiMatKhauDoanhNghiep/></div>}
      </main>
    </div>
  );
}

export default DangTinTuyenDung;

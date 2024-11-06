import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Dangtintuyendung.module.scss";
import logocongty from "~/assets/logocongty.jpg";

const cx = classNames.bind(styles);

function DangTinTuyenDung() {
  const [activeTab, setActiveTab] = useState('dangbai');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const jobPosts = [
    { id: 1, title: "Nhân viên kinh doanh", company: "Công ty ABC", salary: "10 - 15 triệu", location: "TP HCM" },
    { id: 2, title: "Kế toán viên", company: "Công ty XYZ", salary: "12 - 18 triệu", location: "Hà Nội" },
  ];

  const handleEdit = (id) => {
    console.log("Chỉnh sửa bài đăng với ID:", id);
    setActiveTab('dangbai');
  };

  const handleDelete = (id) => {
    console.log("Xoá bài đăng với ID:", id);
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
            <li className={cx({ [styles.active]: activeTab === "dangbai" })} onClick={() => handleTabClick("dangbai")}>Đăng bài</li>
            <li className={cx({ [styles.active]: activeTab === "baidangcuatoi" })} onClick={() => handleTabClick("baidangcuatoi")}>Bài đăng của tôi</li>
            <li className={cx({ [styles.active]: activeTab === "taikhoan" })} onClick={() => handleTabClick("taikhoan")}>Thông tin tài khoản</li>
            <li className={cx({ [styles.active]: activeTab === "doimatkhau" })} onClick={() => handleTabClick("doimatkhau")}>Đổi mật khẩu</li>
            <li>Đăng xuất</li>
          </ul>
        </nav>
      </aside>

      <main className={cx("content")}>
        {activeTab === "dangbai" && (
          <div className={cx("jobPostForm")}>
            <h2>Đăng Bài Tuyển Dụng Công Việc</h2>
            <form>
              <div className={cx("formGroup")}>
                <label>Tên Công Việc</label>
                <input type="text" placeholder="Nhập tên công việc" />
              </div>
              <div className={cx("formGroup")}>
                <label>Mô Tả Công Việc</label>
                <textarea placeholder="Nhập mô tả công việc"></textarea>
              </div>
              <div className={cx("formGroup")}>
                <label>Kỹ Năng Yêu Cầu</label>
                <textarea placeholder="Nhập kỹ năng yêu cầu"></textarea>
              </div>
            
              <div className={cx("formGroup")}>
                <label>Nơi Làm Việc</label>
                <input type="text" placeholder="Nhập nơi làm việc" />
              </div>
              <div className={cx("formGroup")}>
                <label>Mức Lương</label>
                <input type="number" placeholder="Nhập mức lương" />
              </div>
              <div className={cx("formGroup")}>
                <label>Ngày Hết Hạn Bài Đăng</label>
                <input type="date" />
              </div>
              <button type="submit" className={cx("submitButton")}>Đăng bài</button>
            </form>
          </div>
        )}

        {activeTab === "baidangcuatoi" && (
          <div className={cx("danhsachbaidang")}>
            <h2>Bài Đăng Của Tôi</h2>
            <div className={cx("job-list")}>
              {jobPosts.map((dangbai) => (
                <div key={dangbai.id} className={cx("job-item")}>
                  <h3>{dangbai.title}</h3>
                  <p><strong>Công ty:</strong> {dangbai.company}</p>
                  <p><strong>Lương:</strong> {dangbai.salary}</p>
                  <p><strong>Địa điểm:</strong> {dangbai.location}</p>
                  <div className={cx("job-actions")}>
                    <button onClick={() => handleEdit(dangbai.id)}>Chỉnh sửa</button>
                    <button onClick={() => handleDelete(dangbai.id)}>Xoá</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DangTinTuyenDung;

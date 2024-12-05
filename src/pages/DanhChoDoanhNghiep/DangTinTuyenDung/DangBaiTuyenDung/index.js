import React, { useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Dangbaituyendung.module.scss";

const cx = classNames.bind(styles);

function DangBaiUngTuyen() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skill: "",
    address: "",
    close_at: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(formData.close_at);
    const currentDate = new Date();
    if(formData.skill ==="" || formData.title === "" || formData.salary==="" || formData.description==="" || formData.address===""){
      alert("Bạn không được để trống thông tin bài tuyển dụng.");
      return;
    }
    if (selectedDate <= currentDate) {
      alert("Ngày hết hạn phải lớn hơn ngày hiện tại. Vui lòng kiểm tra lại.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/company",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Đăng bài thành công!");
        setFormData({
          title: "",
          description: "",
          skill: "",
          address: "",
          close_at: "",
          salary: "",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Đã xảy ra lỗi khi đăng bài.";
      alert(errorMessage);
    }
  };

  return (
    <div className={cx("containerdangbaituyendung")}>
      <div className={cx("jobPostForm")}>
        <h2>Đăng Bài Tuyển Dụng Công Việc</h2>
        <form onSubmit={handleSubmit}>
          <div className={cx("formGroup")}>
            <label>Tên Công Việc</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Nhập tên công việc"
            />
          </div>
          <div className={cx("formGroup")}>
            <label>Mô Tả Công Việc</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Nhập mô tả công việc"
            ></textarea>
          </div>
          <div className={cx("formGroup")}>
            <label>Kỹ Năng Yêu Cầu</label>
            <textarea
              name="skill"
              value={formData.skill}
              onChange={handleInputChange}
              placeholder="Nhập kỹ năng yêu cầu"
            ></textarea>
          </div>
          <div className={cx("formGroup")}>
            <label>Nơi Làm Việc</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Nhập nơi làm việc"
            />
          </div>
          <div className={cx("formGroup")}>
            <label>Mức Lương</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Nhập mức lương"
            />
          </div>
          <div className={cx("formGroup")}>
            <label>Ngày Hết Hạn Bài Đăng</label>
            <div>
              <input
                type="date"
                name="close_at"
                value={formData.close_at ? formData.close_at.split("T")[0] : ""}
                onChange={handleInputChange}
                placeholder="Nhập ngày hết hạn (yyyy-mm-dd)"
              />
            </div>
          </div>
          <button type="submit" className={cx("submitButton")}>
            Đăng bài
          </button>
        </form>
      </div>
    </div>
  );
}

export default DangBaiUngTuyen;

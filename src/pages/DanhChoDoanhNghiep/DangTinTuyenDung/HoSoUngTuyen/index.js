import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Hosoungtuyen.module.scss";

const cx = classNames.bind(styles);

function HoSoUngTuyen() {
  const [applications, setApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);
  const [acceptedInterviews, setAcceptedInterviews] = useState([]);
  const [dialogSendReview, setDialogSendReview] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    content: "",
    address: "",
    hour: "",
    datereview: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchApplications();
    fetchAcceptedApplications();
    fetchAcceptedInterview();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("http://localhost:8080/admin/apply", {
        withCredentials: true,
      });
      setApplications(response.data || []);
    } catch (error) {
      setApplications([]);
    }
  };

  const fetchAcceptedInterview = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/apply/interview ",
        { withCredentials: true }
      );
      setAcceptedInterviews(response.data || []);
    } catch (error) {}
  };

  const fetchAcceptedApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/apply/pass",
        { withCredentials: true }
      );
      setAcceptedApplications(response.data || []);
    } catch (error) {}
  };
  const openSendReviewDialog = (id) => {
    setFormData({ ...formData, id });
    setDialogSendReview(true);
  };

  const closeSendReviewDialog = () => {
    setDialogSendReview(false);
    setFormData({ id: null, content: "", address: "", datereview: "" });
  };

  const handleStatusUpdateInterview = async (e) => {
    e.preventDefault();

    const formatDate = (datereview) => {
      const d = new Date(datereview);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const selectedDate = new Date(formData.datereview);
    const currentDate = new Date();

    if (
      formData.content === "" ||
      formData.address === "" ||
      formData.time === "" ||
      formData.hour === ""
    ) {
      alert("Bạn cần nhập đủ dữ liệu!");
      return;
    }
    if (selectedDate <= currentDate) {
      alert("Ngày phỏng vấn phải lớn hơn ngày hiện tại!");
      return;
    }

    try {
      const { id, content, address, hour, datereview } = formData;
      const payload = {
        id,
        status: "interview",
        message: content,
        address,
        time: formatDate(datereview),
        hour,
      };

      await axios.put("http://localhost:8080/admin/apply", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert(`Phỏng vấn đã được gửi thành công cho ứng viên.`);

      closeSendReviewDialog();
      fetchApplications();
      fetchAcceptedInterview();
      fetchAcceptedApplications();
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi thông tin phỏng vấn. Vui lòng thử lại.");
    }
  };

  const handleStatusDenyReview = async (id, status) => {
    try {
      await axios.put(
        "http://localhost:8080/admin/apply",
        { id, status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(
        `Trạng thái cập nhật thành công: ${
          status === "accept" ? "Chấp nhận" : "Từ chối"
        } Admin đã gửi thông báo đến ứng viên`
      );

      fetchApplications();
      fetchAcceptedApplications();
    } catch (error) {}
  };

  const handleStatusUpdatePass = async (id, status) => {
    try {
      await axios.put(
        "http://localhost:8080/admin/apply",
        { id, status },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(
        `Trạng thái cập nhật thành công: ${
          status === "accept" ? "Chấp nhận" : "Từ chối"
        } Admin đã gửi thông báo đến ứng viên`
      );

      fetchAcceptedInterview();
      fetchAcceptedApplications();
    } catch (error) {}
  };
  return (
    <div className={cx("hosoungtuyen")}>
      <div>
        <h2 className={cx("tieude")}>Danh Sách Hồ Sơ Đã Ứng Tuyển</h2>
        <div className={cx("banghoso")}>
          <table className={cx("banghosotable")}>
            <thead>
              <tr>
                <th className={cx("cottenhoso")}>Giới thiệu</th>
                <th className={cx("cottencv")}>CV ứng viên</th>
                <th className={cx("cottindang")}>Tin đăng</th>
                <th className={cx("cottrangthai")}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {applications.length >= 0 ? (
                applications.map((app) => (
                  <tr key={app.post_id}>
                    <td className={cx("cottenhoso")}>{app.description}</td>
                    <td className={cx("cottencv")}>
                      <a
                        href={`http://localhost:8080${app.cv_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx("link-xem")}
                      >
                        Xem CV
                      </a>
                    </td>
                    <td className={cx("cottindang")}>{app.title}</td>
                    <td className={cx("cottrangthai")}>
                      <button
                        className={cx("acceptButton")}
                        onClick={() => openSendReviewDialog(app.apply_id)}
                      >
                        Phỏng vấn
                      </button>
                      <button
                        className={cx("denyButton")}
                        onClick={() =>
                          handleStatusDenyReview(app.apply_id, "deny")
                        }
                      >
                        Từ chối
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className={cx("khongcoso")}>
                    <p>Chưa có hồ sơ ứng tuyển nào</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {dialogSendReview && (
        <div className={cx("guithongtinreview")}>
          <div className={cx("jobPostForm")}>
            <h2>Gửi Thông Tin Phỏng Vấn</h2>
            <form onSubmit={handleStatusUpdateInterview}>
              <div className={cx("formGroup")}>
                <label>Địa chỉ</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Nơi phỏng vấn"
                />
              </div>

              <div className={cx("formGroup")}>
                <label>Ngày</label>
                <input
                  type="date"
                  name="datereview"
                  value={formData.datereview}
                  onChange={handleInputChange}
                />
              </div>
              <div className={cx("formGroup")}>
                <label>Giờ</label>
                <input
                  type="time"
                  name="hour"
                  value={formData.hour}
                  onChange={handleInputChange}
                />
              </div>
              <div className={cx("formGroup")}>
                <label>Ghi chú</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Nhập ghi chú thêm"
                ></textarea>
              </div>

              <button type="submit" className={cx("submitButton")}>
                Gửi thông tin
              </button>

              <button
                type="button"
                className={cx("cancelButton")}
                onClick={closeSendReviewDialog}
              >
                Hủy
              </button>
            </form>
          </div>
        </div>
      )}
      <div className={cx("hosouchapnhan")}>
        <h2 className={cx("tieude")}>Hồ Sơ Đang Phỏng Vấn</h2>
        <div className={cx("banghoso")}>
          <table className={cx("banghosotable")}>
            <thead>
              <tr>
                <th className={cx("cottenhoso")}>Giới thiệu</th>
                <th className={cx("cottencv")}>CV ứng viên</th>
                <th className={cx("cottindang")}>Tin đăng</th>
                <th className={cx("cotcategory")}>Danh mục</th>
                <th className={cx("cottrangthai")}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {acceptedInterviews.length >= 0 ? (
                acceptedInterviews.map((app) => (
                  <tr key={app.post_id}>
                    <td className={cx("cottenhoso")}>{app.description}</td>
                    <td className={cx("cottencv")}>
                      <a
                        href={`http://localhost:8080${app.cv_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx("link-xem")}
                      >
                        Xem CV
                      </a>
                    </td>
                    <td className={cx("cottindang")}>{app.title}</td>
                    <td className={cx("cotcategory")}>{app.category}</td>
                    <td className={cx("cottrangthai")}>
                      <button
                        className={cx("acceptButton")}
                        onClick={() =>
                          handleStatusUpdatePass(app.apply_id, "accept")
                        }
                      >
                        Thông qua
                      </button>
                      <button
                        className={cx("denyButton")}
                        onClick={() =>
                          handleStatusUpdatePass(app.apply_id, "deny")
                        }
                      >
                        Từ chối
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={cx("khongcoso")}>
                    <p>Chưa có hồ sơ nào được chấp nhận</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className={cx("hosouchapnhan")}>
        <h2 className={cx("tieude")}>Hồ Sơ Đã Được Chấp Nhận</h2>
        <div className={cx("banghoso")}>
          <table className={cx("banghosotable")}>
            <thead>
              <tr>
                <th className={cx("cottenhoso")}>Giới thiệu</th>
                <th className={cx("cottencv")}>CV ứng viên</th>
                <th className={cx("cottindang")}>Tin đăng</th>
                <th className={cx("cotemail")}>Email</th>
                <th className={cx("cotphone")}>Số điện thoại</th>
                <th className={cx("cotcategory")}>Danh mục</th>
              </tr>
            </thead>
            <tbody>
              {acceptedApplications.length >= 0 ? (
                acceptedApplications.map((app) => (
                  <tr key={app.post_id}>
                    <td className={cx("cottenhoso")}>{app.description}</td>
                    <td className={cx("cottencv")}>
                      <a
                        href={`http://localhost:8080${app.cv_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cx("link-xem")}
                      >
                        Xem CV
                      </a>
                    </td>
                    <td className={cx("cottindang")}>{app.title}</td>
                    <td className={cx("cotemail")}>{app.email}</td>
                    <td className={cx("cotphone")}>{app.phone}</td>
                    <td className={cx("cotcategory")}>{app.category}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={cx("khongcoso")}>
                    <p>Chưa có hồ sơ nào được chấp nhận</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HoSoUngTuyen;

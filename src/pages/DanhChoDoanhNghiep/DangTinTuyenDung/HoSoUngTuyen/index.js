import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Hosoungtuyen.module.scss";

const cx = classNames.bind(styles);

function HoSoUngTuyen() {
  const [applications, setApplications] = useState([]);
  const [acceptedApplications, setAcceptedApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
    fetchAcceptedApplications();
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

  const fetchAcceptedApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/apply/pass",
        { withCredentials: true }
      );
      setAcceptedApplications(response.data || []);
    } catch (error) {
    }
  };

  const handleStatusUpdate = async (id, status) => {
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
    } catch (error) {
    }
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
                        onClick={() => handleStatusUpdate(app.apply_id, "accept")}
                      >
                        Chấp nhận
                      </button>
                      <button
                        className={cx("denyButton")}
                        onClick={() => handleStatusUpdate(app.apply_id, "deny")}
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

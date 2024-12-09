import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Adminquanlytaikhoan.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function AdminQuanLyTaiKhoan() {
  const [taikhoan, setTaiKhoan] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDeniedDialogOpen, setDeniedDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

  const [deniedContent, setDeniedContent] = useState("");
  const [currentAccountId, setCurrentAccountId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userNameAdmin = localStorage.getItem("userNameAdmin");
    if (!userNameAdmin) {
      setDialogOpen(true);
    }
  }, []);

  const handleLoginRedirect = () => {
    setDialogOpen(false);
    navigate("/admin");
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/admin/company", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTaiKhoan(response.data);
        } else {
          setTaiKhoan([]);
        }
      })
      .catch((error) => {
        setTaiKhoan([]);
      });
  }, []);

  const handleButtonClick = (idtaikhoan) => {
    axios
      .put(
        "http://localhost:8080/admin/company",
        { id: idtaikhoan },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Tài khoản đã được kích hoạt thành công!");
        window.location.reload();
      })
      .catch((error) => {});
  };
  const handleButtonDeleteClick = (idtaikhoan) => {
    setCurrentAccountId(idtaikhoan);
    setDeleteDialogOpen(true);
  };
  const handleButtonDeniedClick = (idtaikhoan) => {
    setCurrentAccountId(idtaikhoan);
    setDeniedDialogOpen(true);
  };

  const handleDeniedSubmit = () => {
    if (!deniedContent.trim()) {
      alert("Vui lòng nhập nội dung lý do từ chối.");
      return;
    }

    axios
      .put(
        "http://localhost:8080/admin/company/denied",
        { id: currentAccountId, content: deniedContent },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Tài khoản đã bị từ chối.");
        setDeniedDialogOpen(false);
        setDeniedContent("");
        window.location.reload();
      })
      .catch((error) => {
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      });
  };
  const handleDeleteSubmit = () => {
    if (!deniedContent.trim()) {
      alert("Vui lòng nhập nội dung lý do vô hiệu hoá tài khoản.");
      return;
    }

    axios
      .put(
        "http://localhost:8080/admin/company/looked",
        { id: currentAccountId, content: deniedContent },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        alert("Tài khoản đã bị vô hiệu hoá.");
        setDeniedDialogOpen(false);
        setDeniedContent("");
        window.location.reload();
      })
      .catch((error) => {});
  };
  
  const handleDeniedDialogClose = () => {
    setDeniedDialogOpen(false);
    setDeleteDialogOpen(false);
    setDeniedContent("");
  };

  const handleFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setFilterStatus(selectedStatus);

    axios
      .get(`http://localhost:8080/admin/company?status=${selectedStatus}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTaiKhoan(response.data);
        } else {
          setTaiKhoan([]);
        }
      })
      .catch((error) => {
        setTaiKhoan([]);
      });
  };

  return (
    <div className={cx("adminquanlitaikhoan")}>
      <h2 className={cx("title")}>Quản lý Tài Khoản Doanh Nghiệp</h2>
      {isDialogOpen && (
        <div className={cx("dialog-overlay")}>
          <div className={cx("dialog")}>
            <h3>Yêu cầu đăng nhập</h3>
            <p>Bạn cần đăng nhập để truy cập vào trang này.</p>
            <button onClick={handleLoginRedirect} className={cx("dialog-btn")}>
              Đăng nhập
            </button>
          </div>
        </div>
      )}

      <div className={cx("filter-container")}>
        <label htmlFor="status-filter">Lọc theo trạng thái:</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={handleFilterChange}
          className={cx("status-filter")}
        >
          <option value="">Mặc định</option>
          <option value="Xác nhận">Xác nhận</option>
          <option value="Chưa xác nhận">Chưa xác nhận</option>
          <option value="Khoá tài khoản">Bị vô hiệu hoá</option>
        </select>
      </div>

      {isDeniedDialogOpen && (
        <div className={cx("dialog-overlay")}>
          <div className={cx("dialog")}>
            <h3>Từ chối tài khoản</h3>
            <p>Nhập nội dung lý do từ chối:</p>
            <textarea
              className={cx("dialog-textarea")}
              value={deniedContent}
              onChange={(e) => setDeniedContent(e.target.value)}
              placeholder="Nhập lý do từ chối..."
            />
            <div className={cx("dialog-actions")}>
              <button onClick={handleDeniedSubmit} className={cx("dialog-btn")}>
                Gửi
              </button>
              <button
                onClick={handleDeniedDialogClose}
                className={cx("dialog-btn-cancel")}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteDialogOpen && (
        <div className={cx("dialog-overlay")}>
          <div className={cx("dialog")}>
            <h3>Vô hiệu hoá tài khoản</h3>
            <p>Nhập nội dung lý do vô hiệu hoá tài khoản:</p>
            <textarea
              className={cx("dialog-textarea")}
              value={deniedContent}
              onChange={(e) => setDeniedContent(e.target.value)}
              placeholder="Nhập lý do vô hiệu hoá tài khoản..."
            />
            <div className={cx("dialog-actions")}>
              <button onClick={handleDeleteSubmit} className={cx("dialog-btn")}>
                Gửi
              </button>
              <button
                onClick={handleDeniedDialogClose}
                className={cx("dialog-btn-cancel")}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      {taikhoan.length === 0 ? (
        <p>Không có dữ liệu tài khoản doanh nghiệp chưa được duyệt đăng kí.</p>
      ) : (
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Tên công ty</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Mô tả</th>
              <th>File URL</th>
              <th>Trạng trạng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {taikhoan.map((account) => (
              <tr key={account.id}>
                <td>{account.email}</td>
                <td>{account.name}</td>
                <td>{account.address}</td>
                <td>{account.phone}</td>
                <td>{account.description}</td>
                <td>
                  {account.fileurl ? (
                    <a
                      href={`http://localhost:8080${account.fileurl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      View File
                    </a>
                  ) : (
                    "No File"
                  )}
                </td>
                <td>{account.status}</td>

                <td>
                  {account.status === "Khoá tài khoản" ? <div></div> : account.status ===
                    "Xác nhận" ? (
                    <button
                      className={cx("btnxulytaikhoan")}
                      onClick={() => handleButtonDeleteClick(account.id)}
                    >
                      Vô hiệu hoá
                    </button>
                  ) : (
                    <div>
                      <button
                        className={cx("btnxulytaikhoan")}
                        onClick={() => handleButtonClick(account.id)}
                      >
                        Xác nhận
                      </button>
                      <button
                        className={cx("btnxulytaikhoan")}
                        onClick={() => handleButtonDeniedClick(account.id)}
                      >
                        Từ chối
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminQuanLyTaiKhoan;

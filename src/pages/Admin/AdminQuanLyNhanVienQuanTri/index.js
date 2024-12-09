import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Adminquanlynhanvienquantri.module.scss";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles);

function AdminQuanLyNhanVienQuanTri() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false); 
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    matKhau: "",
    role: [],
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    username: "",
    matKhau: "",
    role: [],
  });
  const [employees, setEmployees] = useState([]);

  const roles = ["Thông báo", "Doanh nghiệp", "Bài đăng"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prevData) => {
      const { role: selectedRoles } = prevData;
      if (selectedRoles.includes(role)) {
        return {
          ...prevData,
          role: selectedRoles.filter((item) => item !== role),
        };
      } else {
        return {
          ...prevData,
          role: [...selectedRoles, role],
        };
      }
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setFormData((prevData) => ({
        ...prevData,
        role: roles,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        role: [],
      }));
    }
  };
  const handleRoleChangeUpdate = (role) => {
    setFormDataUpdate((prevData) => {
      const { role: selectedRoles } = prevData;
      if (selectedRoles.includes(role)) {
        return {
          ...prevData,
          role: selectedRoles.filter((item) => item !== role),
        };
      } else {
        return {
          ...prevData,
          role: [...selectedRoles, role],
        };
      }
    });
  };

  const handleSelectAllUpdate = (e) => {
    if (e.target.checked) {
      setFormDataUpdate((prevData) => ({
        ...prevData,
        role: roles,
      }));
    } else {
      setFormDataUpdate((prevData) => ({
        ...prevData,
        role: [],
      }));
    }
  };
  const handleEmployeeClick = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/account/${id}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSelectedEmployee(data); 
        setDetailDialogOpen(true); 
      } else {
        setErrorMessage("Không thể tải thông tin nhân viên.");
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra khi kết nối với máy chủ.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username) {
      setErrorMessage("Chưa điền tên đăng nhập.");
      return;
    }
    if (!formData.matKhau) {
      setErrorMessage("Chưa điền mật khẩu.");
      return;
    }
    if (formData.role.length === 0) {
      setErrorMessage("Chưa chọn quyền cho tài khoản nhân viên.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/admin/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.username,
          password: formData.matKhau,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Đăng ký thành công!");
        setErrorMessage("");
        setFormData({
          username: "",
          matKhau: "",
          role: [],
        });
        fetchEmployees();
      } else {
        setErrorMessage(data.message || "Bạn không có quyền đăng ký");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra khi kết nối với máy chủ.");
      setSuccessMessage("");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/account", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setEmployees(data);
      } else {
        setErrorMessage("Không thể tải danh sách nhân viên.");
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra khi kết nối với máy chủ.");
    }
  };

  const handleLoginRedirect = () => {
    setDialogOpen(false);
    navigate("/admin/quanlytaikhoan");
  };

  const handleUpdateRoles = async () => {
    try {
      const response = await fetch("http://localhost:8080/admin/account/role", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          id: selectedEmployee.id,
          role: formDataUpdate.role, 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cập nhật quyền thành công!");
        fetchEmployees(); 
        setDetailDialogOpen(false); 
        
      } else {
        setErrorMessage(data.message || "Không thể cập nhật quyền.");
      }
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra khi kết nối với máy chủ.");
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/account`,
        {
          method: "DELETE",
          credentials: "include",
          body: JSON.stringify({
            id: selectedEmployee.id,
          }), 
        }
      );

      if (response.ok) {
        alert("Nhân viên đã được xóa thành công!");
        fetchEmployees(); 
        setDetailDialogOpen(false); 
      } 
    } catch (error) {
      setErrorMessage("Có lỗi xảy ra khi kết nối với máy chủ.");
    }
  };

  useEffect(() => {
    const userNameAdmin = localStorage.getItem("userNameAdmin");
    if (userNameAdmin !== "admin") {
      setDialogOpen(true);
    }
    fetchEmployees();
  }, []);

  return (
    <div className={cx("containerquanlynhanvienadmin")}>
      {isDialogOpen && (
        <div className={cx("dialog-overlay")}>
          <div className={cx("dialog")}>
            <h3>Yêu cầu đăng nhập</h3>
            <p>Bạn không có quyền truy cập vào mục này</p>
            <button onClick={handleLoginRedirect} className={cx("dialog-btn")}>
              Đóng
            </button>
          </div>
        </div>
      )}
      <h2>Tạo Tài Khoản Nhân Viên Quản Trị</h2>
      <div className={cx("taonhanvienmoi")}>
        <form className={cx("formdangkitknhanvien")} onSubmit={handleSubmit}>
          <div className={cx("form-formdangkitknhanvien")}>
            <label className={cx("labelemaildangkitknhanvien")}>
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Điền tên đăng nhập"
              required
            />
          </div>
          <div className={cx("form-formdangkitknhanvien")}>
            <label className={cx("labelpassdangkitknhanvien")}>Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              value={formData.matKhau}
              onChange={handleInputChange}
              placeholder="Điền mật khẩu"
              required
            />
          </div>

          <div className={cx("form-formdangkitknhanvien")}>
            <label className={cx("labelroledangkitknhanvien")}>
              Quyền sử dụng
            </label>
            <div className={cx("checkquyen")}>
              <input
                type="checkbox"
                checked={formData.role.length === roles.length}
                onChange={handleSelectAll}
              />
              <label>Chọn tất cả</label>
            </div>
            {roles.map((role) => (
              <div key={role} className={cx("checkquyen")}>
                <input
                  type="checkbox"
                  checked={formData.role.includes(role)}
                  onChange={() => handleRoleChange(role)}
                />
                <label>{role}</label>
              </div>
            ))}
          </div>

          {errorMessage && <p className={cx("errorMessage")}>{errorMessage}</p>}
          {successMessage && (
            <p className={cx("successMessage")}>{successMessage}</p>
          )}

          <button type="submit" className={cx("btndangkitknhanvien")}>
            Hoàn thành đăng ký
          </button>
        </form>
      </div>

      <div className={cx("danhsachnhanvien")}>
        <h2 className={cx("titlequanlynhanvien")}>
          Danh Sách Nhân Viên Quản Trị
        </h2>
        <div className={cx("adminnhanvien")}>
          {employees.map((employee) => (
            <div
              key={employee.id}
              className={cx("adminitemnhanvien")}
              onClick={() => handleEmployeeClick(employee.id)}
            >
              <img
                src={`http://localhost:8080${employee.photo_url}`}
                alt={employee.email}
                className={cx("avatartknhanvien")}
              />
              <div>
                <h3>{employee.email}</h3>
                <p>
                  <strong>Quyền:</strong> {employee.role.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isDetailDialogOpen && selectedEmployee && (
        <div className={cx("dialogchitietnhanvien-overlay")}>
          <div className={cx("dialogchitietnhanvien")}>
            <button
              className={cx("close-dialog")}
              onClick={() => setDetailDialogOpen(false)}
            >
              x
            </button>

            <h3>Chỉnh sửa quyền cho {selectedEmployee.email}</h3>
            <input
                type="checkbox"
                checked={formDataUpdate.role.length === roles.length}
                onChange={handleSelectAllUpdate}
              />
              <label>Chọn tất cả</label>
            {roles.map((role) => (
              <div key={role} className={cx("checkquyen")}>
                <input
                  type="checkbox"
                  checked={formDataUpdate.role.includes(role)}
                  onChange={() => handleRoleChangeUpdate(role)}
                />
                <label>{role}</label>
              </div>
            ))}

            <div className={cx("button-group")}>
              <button onClick={handleUpdateRoles} className={cx("btn-update")}>
                Cập nhật quyền
              </button>
              <button
                onClick={() => handleDeleteEmployee()}
                className={cx("btn-delete")}
              >
                Xóa nhân viên
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminQuanLyNhanVienQuanTri;

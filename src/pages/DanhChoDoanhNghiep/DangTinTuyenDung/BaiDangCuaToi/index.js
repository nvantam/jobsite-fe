import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Baidangcuatoi.module.scss";

const cx = classNames.bind(styles);

function BaiDangCuaToi() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skill: "",
    address: "",
    salary: "",
    close_at: "",
  });

  const [currentPostId, setCurrentPostId] = useState(null);

  const getPosts = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/company/post`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        setError("Không thể tải bài đăng. Vui lòng thử lại.");
      }
    } catch (error) {
      setPosts([]);
      setError(error.response?.data?.error || "Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditDialog = async (postId) => {
    setError(null);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/post/${postId}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setFormData(response.data);
        setCurrentPostId(postId);
        setEditDialogVisible(true);
      } else {
        setError("Không thể tải thông tin bài đăng. Vui lòng thử lại.");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Đã xảy ra lỗi khi tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const closeEditDialog = () => {
    setEditDialogVisible(false);
    setFormData({
      title: "",
      description: "",
      skill: "",
      address: "",
      salary: "",
      close_at: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
  
    const selectedDate = new Date(formData.close_at);
    const currentDate = new Date();
  
    if (
      formData.skill === "" ||
      formData.title === "" ||
      formData.salary === "" ||
      formData.description === "" ||
      formData.address === ""
    ) {
      alert("Bạn không được để trống thông tin bài tuyển dụng.");
      return;
    }
  
    if (selectedDate <= currentDate) {
      alert("Ngày hết hạn phải lớn hơn ngày hiện tại. Vui lòng kiểm tra lại.");
      return;
    }
  
    try {
      const updatedData = {
        ...formData,
        close_at: formatDate(formData.close_at), 
        post_id: currentPostId,
      };
  
      const response = await axios.put(
        `http://localhost:8080/company/post`,
        updatedData,
        { withCredentials: true }
      );
  
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === currentPostId ? { ...post, ...updatedData } : post
          )
        );
        alert("Cập nhật bài đăng thành công");
      } else {
        alert("Không thể cập nhật bài đăng. Vui lòng thử lại.");
      }
    } catch (error) {
      setError(
        error.response?.data?.error || "Đã xảy ra lỗi khi cập nhật dữ liệu."
      );
    }
  };
  

  const openDeleteDialog = (postId) => {
    setCurrentPostId(postId);
    setDeleteDialogVisible(true);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogVisible(false);
    setCurrentPostId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/company/post`, {
        data: { id: currentPostId },
        withCredentials: true,
      });
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== currentPostId)
        );
        alert("Đã xóa bài đăng thành công");
        closeDeleteDialog();
      } else {
        alert("Không thể xóa bài đăng. Vui lòng thử lại.");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Đã xảy ra lỗi khi xóa bài đăng.");
    }
  };


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={cx("danhsachbaidangtuyen")}>
      <h2>Bài Đăng Của Tôi</h2>
      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p className={cx("error")}>{error}</p>}
      <div className={cx("job-list")}>
        {posts.length === 0 ? (
          <p>Bạn chưa đăng bài tuyển dụng nào.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className={cx("job-item")}>
              <p>
                <strong>Tên Bài Đăng: </strong>
                {post.title}
              </p>
              <p>
                <strong>Lương:</strong> {post.salary}
              </p>
              <p>
                <strong>Địa Chỉ:</strong> {post.address}
              </p>
              <p>
                <strong>Ngày Hết Hạn:</strong>{" "}
                {new Date(post.close_at).toLocaleDateString()}
              </p>
              <p>
                <strong>Trạng thái:</strong> {post.status}
              </p>
              <div className={cx("job-actions")}>
                <button onClick={() => openEditDialog(post.id)}>
                  Chỉnh sửa
                </button>
                <button onClick={() => openDeleteDialog(post.id)} >Xoá</button>
              </div>
            </div>
          ))
        )}
         {deleteDialogVisible && (
        <div className={cx("deleteDialog")}>
          <div className={cx("deleteDialogContent")}>
            <h3>Bạn có chắc chắn muốn xóa bài đăng này không? Mọi hồ sơ được gửi đến bài đăng cũng sẽ bị xoá!</h3>
            <div className={cx("dialogActions")}>
              <button onClick={handleDelete}>Có</button>
              <button onClick={closeDeleteDialog}>Không</button>
            </div>
          </div>
        </div>
      )}
      </div>
     

      {editDialogVisible && (
        <div className={cx("containersuabaidangtuyendung")}>
          <div className={cx("jobPostForm")}>
            <h2>Chỉnh Sửa Bài Đăng Tuyển Dụng</h2>
            <div className={cx("submitclose")} onClick={closeEditDialog}>
              x
            </div>
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
                    value={
                      formData.close_at ? formData.close_at.split("T")[0] : ""
                    }
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button type="submit" className={cx("submitButton")}>
                Lưu
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BaiDangCuaToi;

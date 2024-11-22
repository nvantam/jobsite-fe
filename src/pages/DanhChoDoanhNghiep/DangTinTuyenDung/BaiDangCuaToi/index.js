import React, { useState, useEffect } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Baidangcuatoi.module.scss";

const cx = classNames.bind(styles);

function BaiDangCuaToi() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
      const errorMessage =
        error.response && error.response.data && error.response.data.error
          ? error.response.data.error
          : "Đã xảy ra lỗi khi tải dữ liệu.";
      setError(errorMessage);
    } finally {
      setLoading(false); 
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
                  <button>Chỉnh sửa</button>
                  <button>Xoá</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
  );
}

export default BaiDangCuaToi;

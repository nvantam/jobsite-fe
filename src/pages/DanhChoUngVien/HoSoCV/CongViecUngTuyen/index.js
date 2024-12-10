import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Congviecungtuyen.module.scss";
import axios from "axios";

const cx = classNames.bind(styles);

function CongViecUngTuyen() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/participant", {
          withCredentials: true,
        });
        setJobs(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleJobAction = async (postId, status) => {
    try {
      await axios.put(
        "http://localhost:8080/participant/apply",
        {
          post_id: postId,
          status: status, 
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(
        `Đã ${
          status === "accept" ? "chấp nhận" : "từ chối"
        } công việc thành công!`
      );
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === postId
            ? {
                ...job,
                category: status === "accept" ? "Đồng ý nhận việc" : "Từ chối nhận việc",
              }
            : job
        )
      );
    } catch (error) {
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  if (loading) {
    return <div className={cx("loading")}>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className={cx("error")}>Đã xảy ra lỗi: {error}</div>;
  }

  if (Array.isArray(jobs) && jobs.length === 0) {
    return (
      <div className={cx("baidangungtuyen")}>
        <h2 className={cx("title")}>Danh sách công việc đã ứng tuyển</h2>
        <p className={cx("no-jobs")}>Chưa có công việc nào được ứng tuyển.</p>
      </div>
    );
  }

  return (
    <div className={cx("baidangungtuyen")}>
      <h2 className={cx("title")}>Danh sách công việc đã ứng tuyển</h2>
      <div className={cx("job-list")}>
        {jobs.map((job) => (
          <div key={job.id} className={cx("job-card")}>
            <div className={cx("job-card-item")}>
              <img
                src={`http://localhost:8080${job.photo_url}`}
                alt={job.title}
                className={cx("job-image")}
              />
              <div className={cx("job-info")}>
                <h3 className={cx("job-title")}>{job.title}</h3>
                <p className={cx("job-salary")}>Mức lương: {job.salary}</p>
                <p className={cx("job-category")}>Trạng thái: {job.category}</p>
                {job.category === "Thông qua" && (
                  <div>
                    <button
                      className={cx("btnaccept")}
                      onClick={() => handleJobAction(job.id, "accept")}
                    >
                      Chấp nhận
                    </button>
                    <button
                      className={cx("btndeny")}
                      onClick={() => handleJobAction(job.id, "deny")}
                    >
                      Từ chối
                    </button>
                  </div>
                )}
              </div>
              <a
                href={`http://localhost:3000/vieclam/chitietvieclam/${job.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "blue" }}
              >
                Xem chi tiết
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CongViecUngTuyen;

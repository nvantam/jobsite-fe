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
        setJobs(response.data);
      } catch (err) {
        setJobs([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className={cx("loading")}>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className={cx("error")}>Đã xảy ra lỗi: {error}</div>;
  }

  return (
    <div className={cx("baidangungtuyen")}>
      <h2 className={cx("title")}>Danh sách công việc đã ứng tuyển</h2>
      {jobs.length === 0 ? (
        <p>Chưa có công việc nào được ứng tuyển.</p>
      ) : (
        <div className={cx("job-list")}>
          {jobs.map((job) => (
            <div key={job.id} className={cx("job-card")}>
              <div className={cx("job-card-item")} >
                <img
                  src={`http://localhost:8080${job.photo_url}`}
                  alt={job.title}
                  className={cx("job-image")}
                />
                <div className={cx("job-info")}>
                  <h3 className={cx("job-title")}>{job.title}</h3>
                  <p className={cx("job-salary")}>Mức lương: {job.salary}</p>
                  <p className={cx("job-category")}>
                    Trạng thái: {job.category}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CongViecUngTuyen;

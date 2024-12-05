import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Vieclam.module.scss";
import logocongty from "~/assets/logocongty.jpg";
import { Input, Button } from "antd";

const cx = classNames.bind(styles);

function ViecLam() {
  const [danhSachbaiDang, setDanhSachBaiDang] = useState([]);
  const [filters, setFilters] = useState({ title: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/post", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDanhSachBaiDang(response.data);
        } else {
          setDanhSachBaiDang([]); 
        }
      })
      .catch(() => {
        setDanhSachBaiDang([]); 
      });
  }, []);

  const handleSearch = async () => {
    if (!filters.title) {
      try {
        const response = await axios.get("http://localhost:8080/post", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (Array.isArray(response.data)) {
          setDanhSachBaiDang(response.data);
          return;
        } else {
          setDanhSachBaiDang([]); 
        }
      } catch (error) {
        setDanhSachBaiDang([]); 
      }
    } else {
      try {
        const response = await axios.get("http://localhost:8080/post", {
          params: { title: filters.title },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (Array.isArray(response.data)) {
          setDanhSachBaiDang(response.data);
        } else {
          setDanhSachBaiDang([]); 
        }
      } catch (error) {
        setDanhSachBaiDang([]); 
      }
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
  
    if (value !== '' ) {
      setFilters((prev) => ({ ...prev, title: value }));
    } else {
      setFilters({}); 
    }
    handleSearch();  
    console.log(value)
  };
  

  const handleClickPost = (id) => {
    navigate(`/vieclam/chitietvieclam/${id}`);
  };

  return (
    <div className={cx("noidung")}>
      <div className={cx("timkiemvieclam")}>
        <div
          style={{
            maxWidth: 1000,
            margin: "20px auto",
            display: "flex",
            gap: "10px",
          }}
        >
          <Input
            placeholder="Nhập tên việc làm bạn muốn tìm kiếm"
            allowClear
            size="large"
            style={{ flex: 3 }}
            value={filters.title}
            onChange={handleInputChange} 
          />

          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "#6e1fff", flex: 1 }}
            onClick={handleSearch}
          >
            Tìm việc
          </Button>
        </div>
      </div>
      <div className={cx("tatcabaidang")}>
        <h2>Danh Sách Việc Làm</h2>
        {danhSachbaiDang.length > 0 ? (
          danhSachbaiDang.map((baidang) => (
            <div
              key={baidang.id}
              className={cx("danhsachbaidang")}
              onClick={() => handleClickPost(baidang.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={cx("baidang")}>
                <div className={cx("thongtin")}>
                  <img
                    src={logocongty}
                    alt="logo công ty"
                    className={cx("logocongty")}
                  />
                  <div className={cx("thongtinbaidang")}>
                    <h4>{baidang.name}</h4>
                    <h3>{baidang.title}</h3>
                    <div>Lương: {baidang.salary}</div>
                    <div>Địa Chỉ: {baidang.address}</div>
                    <div>
                      Ngày Hết Hạn:{" "}
                      {new Date(baidang.close_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Không tìm thấy bài đăng nào phù hợp.</p>
        )}
      </div>
    </div>
  );
}

export default ViecLam;

import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate
import axios from "axios";
import styles from "./Vieclam.module.scss";
import logocongty from "~/assets/logocongty.jpg";
import { Input, Select, Button } from "antd";

const cx = classNames.bind(styles);
const { Search } = Input;
const { Option } = Select;

function ViecLam() {
  const [danhSachbaiDang, setdanhSachbaiDang] = useState([]);
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
          setdanhSachbaiDang(response.data);
        } else {
          setdanhSachbaiDang([]);
        }
      })
      .catch(() => {
        setdanhSachbaiDang([]);
      });
  }, []);

  const onSearch = (value) => {
    console.log("Tìm kiếm:", value);
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
          <Search
            placeholder="Nhập vị trí muốn ứng tuyển"
            allowClear
            size="large"
            style={{ flex: 3 }}
            onSearch={onSearch}
          />

          <Select
            placeholder="Lọc theo nghề nghiệp"
            size="large"
            style={{ flex: 1 }}
            allowClear
          >
            <Option value="kinhdoanh">Kinh Doanh</Option>
            <Option value="cntt">Công Nghệ Thông Tin</Option>
          </Select>

          <Select
            placeholder="Lọc theo tỉnh thành"
            size="large"
            style={{ flex: 1 }}
            allowClear
          >
            <Option value="hanoi">Hà Nội</Option>
            <Option value="tphcm">TP HCM</Option>
          </Select>

          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "#6e1fff", flex: 1 }}
          >
            Tìm việc
          </Button>
        </div>
      </div>
      <div className={cx("tatcabaidang")}>
        <h2>Danh Sách Việc Làm</h2>
        {danhSachbaiDang.map((baidang) => (
          <div
            key={baidang.id} 
            className={cx("danhsachbaidang")}
            onClick={() => handleClickPost(baidang.id)} 
            style={{ cursor: "pointer" }} 
          >
            <div className={cx("baidang")}>
              <h3>{baidang.title}</h3>
              <div className={cx("thongtin")}>
                <img src={logocongty} alt="logo" className={cx("logocongty")} />
                <div className={cx("thongtinbaidang")}>
                  <h4>Công ty {baidang.name}</h4>
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
        ))}
      </div>
    </div>
  );
}

export default ViecLam;

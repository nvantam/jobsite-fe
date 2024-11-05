import classNames from "classnames/bind";
import styles from "./Vieclam.module.scss";
import logocongty from "~/assets/logocongty.jpg";
import { Link } from "react-router-dom";
import { Input, Select, Button  } from "antd";

const cx = classNames.bind(styles);
const { Search } = Input;
const { Option } = Select;

function ViecLam() {
  const onSearch = (value) => {
    console.log("Tìm kiếm:", value);
  };

  return (
    <div className={cx("noidung")}>
      <div className={cx("timkiemvieclam")}>
      <div style={{ maxWidth: 1000, margin: "20px auto", display: 'flex', gap: '10px' }}>
        <Search
          placeholder="Nhập vị trí muốn ứng tuyển"
          allowClear
          size="large"
          style={{ flex: 3 }}
          onSearch={onSearch}
        />
        
        <Select placeholder="Lọc theo nghề nghiệp" size="large" style={{ flex: 1 }} allowClear>
          <Option value="kinhdoanh">Kinh Doanh</Option>
          <Option value="cntt">Công Nghệ Thông Tin</Option>
        </Select>

        <Select placeholder="Lọc theo tỉnh thành" size="large" style={{ flex: 1 }} allowClear>
          <Option value="hanoi">Hà Nội</Option>
          <Option value="tphcm">TP HCM</Option>
        </Select>

        <Button type="primary" size="large" style={{ backgroundColor: '#6e1fff', flex: 1 }}>
          Tìm việc
        </Button>
      </div>
    </div>
      <div className={cx("tatcabaidang")}>
        <h2>Danh Sách Việc Làm</h2>
        <div className={cx("danhsachbaidang")}>
          <Link to="/chitietvieclam" className={cx("baidang")}>
            <h3>Nhân viên kinh doanh</h3>
            <div className={cx("thongtin")}>
              <img src={logocongty} alt="logo" className={cx("logocongty")} />
              <div className={cx("thongtinbaidang")}>
                <h4>Công ty</h4>
                <div>Lương: 10 - 15 triệu</div>
                <div>Địa Chỉ: Tp Hcm</div>
              </div>
            </div>
          </Link>
          <Link to="/chitietvieclam" className={cx("baidang")}>
            <h3>Nhân viên kinh doanh</h3>
            <div className={cx("thongtin")}>
              <img src={logocongty} alt="logo" className={cx("logocongty")} />
              <div className={cx("thongtinbaidang")}>
                <h4>Công ty</h4>
                <div>Mức Lương: 10 - 15 triệu</div>
                <div>Địa Chỉ: Tp Hcm</div>
              </div>
            </div>
          </Link>
          <Link to="/chitietvieclam" className={cx("baidang")}>
            <h3>Nhân viên kinh doanh</h3>
            <div className={cx("thongtin")}>
              <img src={logocongty} alt="logo" className={cx("logocongty")} />
              <div className={cx("thongtinbaidang")}>
                <h4>Công ty</h4>
                <div>Lương: 10 - 15 triệu</div>
                <div>Địa Chỉ: Tp Hcm</div>
              </div>
            </div>
          </Link>
          <Link to="/chitietvieclam" className={cx("baidang")}>
            <h3>Nhân viên kinh doanh</h3>
            <div className={cx("thongtin")}>
              <img src={logocongty} alt="logo" className={cx("logocongty")} />
              <div className={cx("thongtinbaidang")}>
                <h4>Công ty</h4>
                <div>Lương: 10 - 15 triệu</div>
                <div>Địa Chỉ: Tp Hcm</div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className={cx("goiyvieclam")}>
        <h2>Gợi Ý Việc Làm</h2>
        <div className={cx("baidang")}>
          <h3>Nhân viên kinh doanh</h3>
          <div className={cx("thongtin")}>
            <img src={logocongty} alt="logo" className={cx("logocongty")} />
            <div className={cx("thongtinbaidang")}>
              <h4>Công ty</h4>
              <div>10 - 15 triệu</div>
              <div>Tp Hcm</div>
            </div>
          </div>
        </div>
        <div className={cx("baidang")}>
          <h3>Nhân viên kinh doanh</h3>
          <div className={cx("thongtin")}>
            <img src={logocongty} alt="logo" className={cx("logocongty")} />
            <div className={cx("thongtinbaidang")}>
              <h4>Công ty</h4>
              <div>10 - 15 triệu</div>
              <div>Tp Hcm</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViecLam;

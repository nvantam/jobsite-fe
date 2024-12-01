import React from "react";
import classNames from "classnames/bind";
import styles from "./Trangchudoanhnghiep.module.scss";
import logocongty from "~/assets/landing_page_right.png";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function TrangChuDoanhNghiep() {
  const navigate = useNavigate(); 

  const handleDangTinClick = () => {
    const userData = localStorage.getItem("userNameDoanhNghiep");

    if (userData) {
      navigate("/dangtintuyendung"); 
    } else {
      navigate("/dangnhaptkdoanhnghiep"); 

    }
  };

  return (
    <div className={cx("trangchudoanhnghiep")}>
      <div className={cx("gioithieu")}>
        <div className={cx("noidung")}>
          <h1>
            Nơi gặp gỡ giữa doanh nghiệp <br /> và{" "}
            <span>Nhiều ứng viên chất lượng</span>
          </h1>
          <p>
            Tuyển vị trí việc làm dễ dàng - Chúng tôi luôn có ứng viên phù hợp
            cho bạn
          </p>
          <button className={cx("nutdangtin")} onClick={handleDangTinClick}>
            Đăng tin ngay!
          </button>
        </div>
        <div className={cx("hinhanh")}>
          <img src={logocongty} alt="Hình ảnh minh họa" />
        </div>
      </div>

      <div className={cx("dichvu")}>
        <h2>
          Website tuyển dụng và tìm kiếm việc làm với thị
          trường đông đảo và năng nổ
        </h2>
        <div className={cx("danhsachdichvu")}>
          <div className={cx("mucdichvu")}>
            <div className={cx("icon")}>⏳</div>
            <h3>Nguồn ứng viên chất lượng</h3>
            <p>
              Nhà tuyển dụng có thể tiếp cận nguồn ứng viên dồi dào với hơn
              nhiều hồ sơ ứng viên và hơn 1 triệu lượt truy cập mỗi năm.
            </p>
          </div>
          <div className={cx("mucdichvu")}>
            <div className={cx("icon")}>💎</div>
            <h3>Trải nghiệm toàn diện</h3>
            <p>
              Tài khoản nhà tuyển dụng được tích hợp thêm các tính năng thông
              minh, giúp thuận tiện quản lý tin đăng.
            </p>
          </div>
          <div className={cx("mucdichvu")}>
            <div className={cx("icon")}>📞</div>
            <h3>Chất lượng CSKH chuyên nghiệp</h3>
            <p>
              Đội ngũ CSKH giờ tập trung chuyên nghiệp hơn & tận tình hơn, nhằm
              mang lại trải nghiệm tốt nhất.
            </p>
          </div>
        </div>
      </div>

      <div className={cx("footercta")}>
        <h2>
          Trải nghiệm dịch vụ đăng tin tại Tuyển Dụng Và Tìm Kiếm Việc Làm Trực
          Tuyến
        </h2>
        <button className={cx("nutdangtin")} onClick={handleDangTinClick}>
          Đăng tin ngay!
        </button>
      </div>

      <div className={cx("hoTroTuVan")}>
        <div
          className={cx("hoTroTuVanText")}
          style={{
            background: `url(${logocongty}) no-repeat center center`,
            backgroundSize: "cover",
          }}
        >
          <div className={cx("hoTroNoiDung")}>
            <h2>Hãy để chúng tôi hỗ trợ bạn</h2>
            <p>
              Chúng tôi luôn sẵn sàng hỗ trợ tư vấn và giải đáp mọi thắc mắc của
              bạn.
            </p>
          </div>
        </div>
        <div className={cx("hoTroForm")}>
          <h3>Đăng ký tư vấn</h3>
          <p>
            Vui lòng để lại thông tin, chúng tôi sẽ liên lạc lại với bạn sớm
            nhất có thể.
          </p>
          <form>
            <div className={cx("formGroup")}>
              <label htmlFor="hoVaTen">Họ và tên</label>
              <input id="hoVaTen" type="text" placeholder="Tên của bạn" />
            </div>
            <div className={cx("formGroup")}>
              <label htmlFor="email">Địa chỉ email</label>
              <input id="email" type="email" placeholder="Email của bạn" />
            </div>
            <div className={cx("formGroup")}>
              <label htmlFor="soDienThoai">Số điện thoại</label>
              <input id="soDienThoai" type="text" placeholder="Số điện thoại" />
            </div>
            <div className={cx("formGroup")}>
              <label htmlFor="nhuCau">Nhu cầu tư vấn</label>
              <select id="nhuCau">
                <option value="">Chọn nhu cầu</option>
                <option value="tuyenDung">Tuyển dụng</option>
                <option value="dichVu">Dịch vụ khác</option>
              </select>
            </div>
            <button type="submit" className={cx("formButton")}>
              Yêu cầu tư vấn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TrangChuDoanhNghiep;

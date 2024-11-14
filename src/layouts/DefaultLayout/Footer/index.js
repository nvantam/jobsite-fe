import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("chantrang")}>
          <div className={cx("vechungtoi")}>
            <h3>Về Chúng Tôi</h3>
            <p>
              Chúng Tôi Là Website Tuyển Dụng Và Tìm Kiếm Việc Làm Trực Tuyến <br/>
              Địa Chỉ: Định Công - Hoàng Mai - Hà Nội<br/>
              Đội Ngũ Phát Triển: Nhóm Đồ Án Tốt Nghiệp <br/> Hoàng Duy Khánh & Nguyễn Văn Tâm
            </p>
          </div>
          <div className={cx("thongtin")}>
            <h3>Thông Tin</h3>
            <ul>
              <li>
                <Link>Giới Thiệu</Link>
              </li>
              <li>
                <Link>Điều Khoản Sử Dụng</Link>
              </li>
              <li>
                <Link>Chính Sách Bảo Mật</Link>
              </li>
              <li>
                <Link>Trợ Giúp</Link>
              </li>
            </ul>
          </div>
          <div className={cx("ketnoi")}>
            <h3>Kết Nối Với Chúng Tôi</h3>
            <ul>
              <li>
                <Link to="/" target="_blank">Facebook</Link>
              </li>
              <li>
                <Link>Twitter</Link>
              </li>
              <li>
                <Link>Instagram</Link>
              </li>
            </ul>
          </div>
        </div>
        <br/> <hr/> <br/>
        <div class="banquyen">
          <p>
          © 2024 - Website Tuyển Dụng Và Tìm Kiếm Việc Làm Trực Tuyến - Bản Quyền Thuộc Về Chúng Tôi
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

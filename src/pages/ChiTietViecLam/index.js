import styles from "./Chitietvieclam.module.scss";
import classNames from "classnames/bind";
import logocongty from "~/assets/logocongty.jpg";

const cx = classNames.bind(styles);

function ChiTietViecLam() {
  return (
    <div className={cx("chitietvieclam")}>
      <h2>Chi Tiết Việc Làm</h2>
      <div className={cx("thongtinchung")}>
        <img src={logocongty} alt="logo" className={cx("logocongty")} />
        <div className="thongtin">
          <h3>Công ty</h3>
          <h2>Công việc</h2>
          <div className={cx("thongtinluong")}>
            <div>Mức Lương: 10-15 triệu</div>
            <div>Ngày Đăng Tin: 02/11/2024</div>
            <div>Hạn nộp hồ sơ: 02/12/2024</div>
            <div>Địa chỉ: Tp Hcm</div>
          </div>
          <div className={cx("nutnophoso")}>
            <button>Ứng tuyển ngay</button>
          </div>
        </div>
      </div>

      <div className={cx("thongtinchitet")}>
        <div className={cx("motacongviec")}>
          <h2>Mô Tả Công Việc</h2>
          <div>
            Tìm kiếm khách hàng mới: Chủ động tìm kiếm và tiếp cận các khách
            hàng tiềm năng có nhu cầu về thiết kế và thi công nội thất. Điều này
            bao gồm việc xây dựng mối quan hệ với các nhà thầu xây dựng, kiến
            trúc sư, chủ đầu tư dự án, và cá nhân có nhu cầu.
          </div>
          <div>
            Tư vấn khách hàng: Tư vấn cho khách hàng theo Data công ty cung cấp
            hoặc khách tự tìm kiếm về các dịch vụ thiết kế và thi công nội thất
            của công ty, giúp khách hàng hiểu rõ về quy trình làm việc, phong
            cách thiết kế, vật liệu sử dụng, và các giải pháp tối ưu cho không
            gian của họ.
          </div>
        </div>
        <div className={cx("yeucaukinang")}>
          <h2>Yêu Cầu Kĩ Năng</h2>
          <div>
            Trình độ học vấn: Tốt nghiệp từ Trung cấp trở lên, ưu tiên các ngành
            liên quan đến kinh doanh, quản trị kinh doanh, hoặc các ngành có
            liên quan đến kiến trúc, nội thất.
          </div>
          <div>
            Trình độ học vấn: Tốt nghiệp từ Trung cấp trở lên, ưu tiên các ngành
            liên quan đến kinh doanh, quản trị kinh doanh, hoặc các ngành có
            liên quan đến kiến trúc, nội thất. Kinh nghiệm: Có ít nhất 6 tháng
            kinh nghiệm trong lĩnh vực kinh doanh, ưu tiên ứng viên có kinh
            nghiệm trong lĩnh vực thiết kế và thi công nội thất. ( chưa có kinh
            nghiệm sẽ được đào tạo) Kỹ năng giao tiếp và đàm phán: Khả năng giao
            tiếp tốt, đàm phán và thuyết phục khách hàng hiệu quả. Kỹ năng làm
            việc nhóm: Có khả năng làm việc nhóm tốt, phối hợp hiệu quả với các
            phòng ban khác để đạt được mục tiêu chung. Am hiểu về thị trường nội
            thất: Có kiến thức cơ bản về thị trường nội thất, xu hướng thiết kế,
            và các vật liệu nội thất. Tinh thần trách nhiệm và nhiệt huyết: Chịu
            được áp lực công việc, có tinh thần trách nhiệm cao, và đam mê với
            công việc kinh doanh.
          </div>
          <div>
            Kỹ năng giao tiếp và đàm phán: Khả năng giao tiếp tốt, đàm phán và
            thuyết phục khách hàng hiệu quả.
          </div>
        </div>
        <div className={cx("diachilamviec")}>
          <h2>Địa Chỉ Làm Việc</h2>
          Hà Nội, Biệt thự số 25, đường 23, KĐT TP Giao Lưu ( cạnh Bộ Công An),
          Cổ Nhuế, Bắc Từ Liêm
        </div>
      </div>

      
    </div>
  );
}

export default ChiTietViecLam;

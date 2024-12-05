import HeaderDoanhNghiep from "./HeaderDoanhNghiep";
import FooterDoanhNghiep from "./FooterDoanhNghiep";
import classNames from "classnames/bind";
import styles from "./Layoutdoanhnghiep.module.scss";

const cx = classNames.bind(styles);

function LayoutDoanhNghiep({ children }) {
  return (
    <div className={cx("wrapperdoanhnghiep")}>
      <HeaderDoanhNghiep />
      <div className={cx("containerdoanhnghiep")}>
        <div className={cx("content")}>{children}</div>
      </div>
      
      <FooterDoanhNghiep />
    </div>
  );
}

export default LayoutDoanhNghiep;

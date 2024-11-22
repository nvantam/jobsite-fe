import React from "react";
import Sidebar from "./SidebarAdmin"; 
import classNames from "classnames/bind";
import styles from "./Layoutadmin.module.scss";

const cx = classNames.bind(styles);

function LayoutAdmin({ children }) {
  return (
    <div className={cx("wrapperadmin")}>
      <div className={cx("sidebaradmin")}>
        <Sidebar />
      </div>

      <div className={cx("contentadmin")}>
        {children}
      </div>
    </div>
  );
}

export default LayoutAdmin;

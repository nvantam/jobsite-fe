import ViecLam from "../pages/ViecLam";
import HoSoCV from "../pages/HoSoCV";
import TaiKhoan from "../pages/TaiKhoan";
import ChiTietViecLam from "../pages/ChiTietViecLam";
import DangTinTuyenDung from "../pages/DangTinTuyenDung";
import ThongBao from "~/pages/ThongBao";

//public routes
const publicRoutes = [
  { path: "/", component: ViecLam },
  { path: "/chitietvieclam", component: ChiTietViecLam },
  { path: "/dangtintuyendung", component: DangTinTuyenDung },
  { path: "/hosocv", component: HoSoCV },
  { path: "/thongbao", component: ThongBao },
  { path: "/taikhoan", component: TaiKhoan },
];

const privateRoutes = [
  // { path: '/taikhoan', component: TaiKhoan },
];

export { publicRoutes, privateRoutes };

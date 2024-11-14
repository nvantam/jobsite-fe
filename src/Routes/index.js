import ViecLam from "../pages/ViecLam";
import HoSoCV from "../pages/HoSoCV";
import TaiKhoan from "../pages/TaiKhoan";
import ChiTietViecLam from "../pages/ChiTietViecLam";
import DangTinTuyenDung from "../pages/DangTinTuyenDung";
import ThongBao from "~/pages/ThongBao";
import DangKiTKTimViec from "~/pages/DangKiTkTimViec";
import DangNhapTKTimViec from "~/pages/DangNhapTKTimViec";

//public routes
const publicRoutes = [
  { path: "/", component: ViecLam },
  { path: "/chitietvieclam", component: ChiTietViecLam },
  { path: "/dangtintuyendung", component: DangTinTuyenDung },
  { path: "/hosocv", component: HoSoCV },
  { path: "/thongbao", component: ThongBao },
  { path: "/taikhoan", component: TaiKhoan, layout: null },
  { path: "/dangkitktimviec", component: DangKiTKTimViec, layout: null },
  { path: "/dangnhaptktimviec", component: DangNhapTKTimViec, layout: null },

];

const privateRoutes = [
  // { path: '/taikhoan', component: TaiKhoan },
];

export { publicRoutes, privateRoutes };

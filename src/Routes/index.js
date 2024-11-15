import ViecLam from "../pages/ViecLam";
import HoSoCV from "../pages/HoSoCV";
import TrangChuDoanhNghiep from "../pages/TrangChuDoanhNghiep";
import ChiTietViecLam from "../pages/ChiTietViecLam";
import DangTinTuyenDung from "../pages/DangTinTuyenDung";
import ThongBao from "~/pages/ThongBao";
import DangKiTKTimViec from "~/pages/DangKiTkTimViec";
import DangNhapTKTimViec from "~/pages/DangNhapTKTimViec";
import ThongBaoDoanhNghiep from "~/pages/ThongBaoDoanhNghiep";
const publicRoutes = [
  { path: "/", component: ViecLam },
  { path: "/chitietvieclam", component: ChiTietViecLam },
  { path: "/hosocv", component: HoSoCV },
  { path: "/thongbao", component: ThongBao },
  { path: "/dangkitktimviec", component: DangKiTKTimViec, layout: null },
  { path: "/dangnhaptktimviec", component: DangNhapTKTimViec, layout: null },
];
const RoutersDoanhNghiep = [
  { path: "/trangchudoanhnghiep", component: TrangChuDoanhNghiep },
  { path: "/dangtintuyendung", component: DangTinTuyenDung },
  { path: "/thongbaodoanhnghiep", component: ThongBaoDoanhNghiep },
];

export { publicRoutes, RoutersDoanhNghiep };

import ViecLam from "../pages/DanhChoUngVien/ViecLam";
import HoSoCV from "../pages/DanhChoUngVien/HoSoCV";
import TrangChuDoanhNghiep from "../pages/DanhChoDoanhNghiep/TrangChuDoanhNghiep";
import ChiTietViecLam from "../pages/DanhChoUngVien/ChiTietViecLam";
import DangTinTuyenDung from "../pages/DanhChoDoanhNghiep/DangTinTuyenDung";
import ThongBao from "~/pages/DanhChoUngVien/ThongBao";
import DangKiTKTimViec from "~/pages/DanhChoUngVien/DangKiTkTimViec";
import DangNhapTKTimViec from "~/pages/DanhChoUngVien/DangNhapTKTimViec";
import ThongBaoDoanhNghiep from "~/pages/DanhChoDoanhNghiep/ThongBaoDoanhNghiep";
import DangKiTKDoanhNghiep from "~/pages/DanhChoDoanhNghiep/DangKiTkDoanhNghiep";
import DangNhapTKDoanhNghiep from "~/pages/DanhChoDoanhNghiep/DangNhapTKDoanhNghiep";
import AdminQuanLyTaiKhoan from "~/pages/Admin/AdminQuanLyTaiKhoan";
import AdminQuanLyBaiDang from "~/pages/Admin/AdminQuanLyBaiDang";
import AdminQuanLyThongBao from "~/pages/Admin/AdminQuanLyThongBao";
import AdminLogin from "~/pages/Admin/AdminLogin";
// import TrangChuUngVien from "~/pages/DanhChoUngVien/TrangChuUngVien";
import AdminBaiDangChiTiet from "~/pages/Admin/AdminBaiDangChiTiet";
import AdminQuanLyNhanVienQuanTri from "~/pages/Admin/AdminQuanLyNhanVienQuanTri";
const publicRoutes = [
  { path: "/", component: ViecLam },
  { path: "/vieclam", component: ViecLam },
  { path: "/vieclam/chitietvieclam/:id", component: ChiTietViecLam },
  { path: "/hosocv", component: HoSoCV },
  { path: "/thongbao", component: ThongBao },
  { path: "/dangkitktimviec", component: DangKiTKTimViec, layout: null },
  { path: "/dangnhaptktimviec", component: DangNhapTKTimViec, layout: null },
];
const routersDoanhNghiep = [
  { path: "/trangchudoanhnghiep", component: TrangChuDoanhNghiep },
  { path: "/dangtintuyendung", component: DangTinTuyenDung },
  { path: "/thongbaodoanhnghiep", component: ThongBaoDoanhNghiep },
  {
    path: "/dangkitkdoanhnghiep",
    component: DangKiTKDoanhNghiep,
    layout: null,
  },
  {
    path: "/dangnhaptkdoanhnghiep",
    component: DangNhapTKDoanhNghiep,
    layout: null,
  },
];
const routersAdmin = [
  { path: "/admin", component: AdminLogin, layout: null },
  { path: "/admin/quanlytaikhoan", component: AdminQuanLyTaiKhoan },
  { path: "/admin/quanlydangtin", component: AdminQuanLyBaiDang },
  { path: "/admin/quanlythongbao", component: AdminQuanLyThongBao },
  {
    path: "/admin/quanlynhanvienquantri",
    component: AdminQuanLyNhanVienQuanTri,
  },
  {
    path: "/admin/quanlydangtin/baidangchitiet/:id",
    component: AdminBaiDangChiTiet,
  },
];

export { publicRoutes, routersDoanhNghiep, routersAdmin };

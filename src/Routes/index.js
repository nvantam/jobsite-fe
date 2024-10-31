import ViecLam from "../pages/ViecLam";
import HoSoCV from "../pages/HoSoCV";
import TaiKhoan from "../pages/TaiKhoan";

//public routes
const publicRoutes = [
    { path: '/', component: ViecLam},
    { path: '/hosocv', component: HoSoCV},
]

const privateRoutes = [
    { path: '/taikhoan', component: TaiKhoan },
];

export { publicRoutes, privateRoutes}

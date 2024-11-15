import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes, RoutersDoanhNghiep } from "./routes";
import { Fragment } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import LayoutDoanhNghiep from "./layouts/LayoutDoanhNghiep";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          {RoutersDoanhNghiep.map((route, index) => {
            const Layoutdoanhnghiep = route.layout === null ? Fragment : LayoutDoanhNghiep;
            const PageDoanhNghiep = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layoutdoanhnghiep>
                    <PageDoanhNghiep />
                  </Layoutdoanhnghiep>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

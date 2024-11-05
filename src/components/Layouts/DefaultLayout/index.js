import Header from "./Header";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div className="noidung">{children}</div>
    </div>
  );
}

export default DefaultLayout;

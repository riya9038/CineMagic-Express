import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

function App() {
  return (
    <div
      className="w-full h-screen text-black rounded-10 m-auto "
      style={{ minWidth: "512px" }}
      data-testid="app"
    >
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

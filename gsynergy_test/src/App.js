import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="w-full h-full text-black rounded-10 m-auto">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

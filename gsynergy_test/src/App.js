import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { MovieContainer } from "./components/MovieContainer";

function App() {
  return (
    <div className="w-full h-full text-black rounded-10">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;

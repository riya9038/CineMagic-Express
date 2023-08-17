import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";

function App() {
  return (
    <div
      className="w-full h-full text-black rounded-10 m-auto flex flex-col "
      style={{ minWidth: "512px" }}
      data-testid="app"
    >
      <Header className="h-1/5" />
      <Outlet className="h-4/5" />
    </div>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { MovieContainer } from "./MovieContainer";

function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;

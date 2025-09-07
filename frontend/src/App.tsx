import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet /> {/* This will render the current page */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
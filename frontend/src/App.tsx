import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";


function App() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-2 py-3 sm:px-6 lg:px-8">
          <Home />
      </main>
      <Footer />
    </div>
  );
};

export default App;

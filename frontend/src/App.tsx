import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Header />
      <main className="py-3">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <h1>Welcome to Photega</h1>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

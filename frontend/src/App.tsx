import { BrowserRouter, Routes, Route } from 'react-router'
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Home from "./routes/Home";
import SignIn from './routes/SignIn';
import CreateAccount from './routes/CreateAccount';


function App() {
  return (
    <BrowserRouter>
      <Header />
        <main className="mx-auto max-w-7xl px-2 py-3 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<CreateAccount />} />
          </Routes>
        </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

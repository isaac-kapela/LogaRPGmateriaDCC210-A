import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import PromotionsPage from './pages/PromotionsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/promocoes" element={<PromotionsPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

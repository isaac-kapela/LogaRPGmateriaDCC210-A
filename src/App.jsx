import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductsSection from './components/ProductsSection';
import ProductModal from './components/ProductModal';
import About from './components/About';
import Footer from './components/Footer';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductsSection onOpenModal={setSelectedProduct} />
        <About />
      </main>
      <Footer />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}

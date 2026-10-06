import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Security from "../components/Security";
import BankingPreview from "../components/BankingPreview";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="bg-slate-50 overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Security />
      <BankingPreview />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
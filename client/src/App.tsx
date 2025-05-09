// import {
//   BenefitsSection1,
//   BenefitsSection2,
//   // BenefitsSection3,
// } from "./components/BenefitsSection";
// import CtaSection from "./components/CtaSection";
// import FaqSection from "./components/FaqSection";
// import FeaturesSection from "./components/FeaturesSection";
// import Footer from "./components/Footer";
// import HeroSection from "./components/Herosection";
// import Navbar from "./components/Navbar";
// import ProblemSection from "./components/ProblemSection";
// import SolutionSection from "./components/SolutionSection";

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <HeroSection />
//       <ProblemSection />
//       <SolutionSection />
//       <BenefitsSection1 />
//       <BenefitsSection2 />
//       {/* <BenefitsSection3 /> */}
//       <FeaturesSection />
//       <FaqSection />
//       <CtaSection />
//       <Footer /> {/* */}
//     </div>
//   );
// }

// export default App;








import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  BenefitsSection1,
  BenefitsSection2,
  // BenefitsSection3,
} from "./components/BenefitsSection";
import CtaSection from "./components/CtaSection";
import FaqSection from "./components/FaqSection";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import HeroSection from "./components/Herosection";
import Navbar from "./components/Navbar";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import Login from "./pages/credintials/login" // ✅ Create this component

function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection1 />
      <BenefitsSection2 />
      {/* <BenefitsSection3 /> */}
      <FeaturesSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import {
  BenefitsSection1,
  BenefitsSection2,
  // BenefitsSection3,
} from "../components/BenefitsSection";
import CtaSection from "../components/CtaSection";
import FaqSection from "../components/FaqSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/Herosection";
import Navbar from "../components/Navbar";
import ProblemSection from "../components/ProblemSection";
import SolutionSection from "../components/SolutionSection";

export default function HomePage() {
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
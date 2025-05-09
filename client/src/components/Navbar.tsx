import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { BorderBeam } from "./magicui/border-beam";
import { TextAnimate } from "./magicui/text-animate";
import { useNavigate } from "react-router-dom";
// import { AuroraText } from "./magicui/aurora-text";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 ">
      <div className="relative mx-16 mt-8 rounded-lg overflow-hidden shadow-sm">
        <div className=" bg-white border border-gray-100 rounded-lg ">
          <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center">
              <span
                className="text-2xl font-bold"
                // style={{
                //   background: "linear-gradient(to right, #ea384c, #FF719A)",
                //   WebkitBackgroundClip: "text",
                //   backgroundClip: "text",
                //   color: "transparent",
                //   WebkitTextFillColor: "transparent",
                //   display: "inline-block"
                // }}
              >
                {/* <AuroraText colors={["#ea384c", "#FF719A"]} className="text-2xl font-bold" speed={2}> */}
                <TextAnimate
                  animation="blurInUp"
                  by="character"
                  duration={5}
                  className="text-[#ea384c]"
                  // style={{
                  //   background: "linear-gradient(to right, #ea384c, #FF719A)",
                  //   WebkitBackgroundClip: "text",
                  //   backgroundClip: "text",
                  //   color: "transparent",
                  //   WebkitTextFillColor: "transparent",
                  //   display: "inline-block"
                  // }}
                >
                  WEZ-ERP
                </TextAnimate>
                {/* </AuroraText> */}
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-wez-red transition-colors"
              >
                Features
              </a>
              <a
                href="#problems"
                className="text-gray-700 hover:text-wez-red transition-colors"
              >
                Solutions
              </a>
              <a
                href="#benefits"
                className="text-gray-700 hover:text-wez-red transition-colors"
              >
                Benefits
              </a>
              <a
                href="#faq"
                className="text-gray-700 hover:text-wez-red transition-colors"
              >
                FAQ
              </a>
              <Button className="gradient-button" onClick={() => navigate("/login")} >Try for free</Button>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu />
              </Button>
            </div>
          </div>
        </div>
        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-[#ea384c] to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          className="from-transparent via-[#FF719A] to-transparent"
        />
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-gray-700 hover:text-wez-red transition-colors"
            >
              Features
            </a>
            <a
              href="#problems"
              className="text-gray-700 hover:text-wez-red transition-colors"
            >
              Solutions
            </a>
            <a
              href="#benefits"
              className="text-gray-700 hover:text-wez-red transition-colors"
            >
              Benefits
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-wez-red transition-colors"
            >
              FAQ
            </a>
            <Button className="gradient-button w-full" onClick={() => navigate("/login")} >Try for free</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

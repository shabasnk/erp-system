import React from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        {/* Brand Name */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#ea384c]">WEZ-ERP</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-700 hover:text-[#ea384c] transition-colors"
          >
            Features
          </a>
          <a
            href="#problems"
            className="text-gray-700 hover:text-[#ea384c] transition-colors"
          >
            Solutions
          </a>
          <a
            href="#benefits"
            className="text-gray-700 hover:text-[#ea384c] transition-colors"
          >
            Benefits
          </a>
          <a
            href="#faq"
            className="text-gray-700 hover:text-[#ea384c] transition-colors"
          >
            FAQ
          </a>
          <Button className="bg-gradient-to-r from-[#ea384c] to-[#FF719A] text-white" onClick={() => navigate("/login")}>Try for free</Button>
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

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t border-gray-200">
          <nav className="flex flex-col space-y-4">
            <a
              href="#features"
              className="text-gray-700 hover:text-[#ea384c] transition-colors"
            >
              Features
            </a>
            <a
              href="#problems"
              className="text-gray-700 hover:text-[#ea384c] transition-colors"
            >
              Solutions
            </a>
            <a
              href="#benefits"
              className="text-gray-700 hover:text-[#ea384c] transition-colors"
            >
              Benefits
            </a>
            <a
              href="#faq"
              className="text-gray-700 hover:text-[#ea384c] transition-colors"
            >
              FAQ
            </a>
            <Button className="bg-gradient-to-r from-[#ea384c] to-[#FF719A] text-white w-full" onClick={() => navigate("/login")}>
              Try for free
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

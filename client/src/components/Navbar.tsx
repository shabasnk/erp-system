import React from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-wez-red">WEZ-ERP</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-gray-700 hover:text-wez-red transition-colors">Features</a>
          <a href="#problems" className="text-gray-700 hover:text-wez-red transition-colors">Solutions</a>
          <a href="#benefits" className="text-gray-700 hover:text-wez-red transition-colors">Benefits</a>
          <a href="#faq" className="text-gray-700 hover:text-wez-red transition-colors">FAQ</a>
          <Button className="gradient-button">Try for free</Button>
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu />
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-white border-t">
          <nav className="flex flex-col space-y-4">
            <a href="#features" className="text-gray-700 hover:text-wez-red transition-colors">Features</a>
            <a href="#problems" className="text-gray-700 hover:text-wez-red transition-colors">Solutions</a>
            <a href="#benefits" className="text-gray-700 hover:text-wez-red transition-colors">Benefits</a>
            <a href="#faq" className="text-gray-700 hover:text-wez-red transition-colors">FAQ</a>
            <Button className="gradient-button w-full">Try for free</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

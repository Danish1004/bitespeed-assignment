import React from "react";

interface HeaderProps {
  onSave: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave }) => (
  //using flex to easily add any new elements into the header
  <div className="relative w-full flex items-center justify-end px-6 py-4 border-b border-white/30 bg-white/30 backdrop-blur-md shadow-sm overflow-hidden">
    {/* Gradient overlay */}
    <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-tr from-blue-200 via-purple-100 to-orange-100 opacity-60" />
    <button
      onClick={onSave}
      className="relative w-36 border-2 border-primaryBlue bg-white text-primaryBlue py-2 rounded z-10 text-sm font-semibold shadow-md hover:shadow-xl transition-all duration-300"
    >
      Save Changes
    </button>
  </div>
);

export default Header;

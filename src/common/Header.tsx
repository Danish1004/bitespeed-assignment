import React from "react";

interface HeaderProps {
  onSave: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSave }) => (
  //using flex to easily add any new elements into the header
  <div className="w-full flex items-center justify-end px-6 py-2 border-b bg-tertiary bg-opacity-30">
    <button
      onClick={onSave}
      className="w-36 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    >
      Save Changes
    </button>
  </div>
);

export default Header;

import React from "react";
import { Link } from "wouter";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex gap-6">
          <Link href="/">self.fit</Link>
          <Link href="/settings">Settings</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React, { ReactNode, useEffect, useState } from "react";

import Nav from "./Nav";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [backgroundImageSrc, setBackgroundImageSrc] = useState<string>("");

  useEffect(() => {
    setBackgroundImageSrc(`/bg/${Math.floor(Math.random() * 10) + 1}.JPG`);
  }, []);

  return (
    <div className="h-screen bg-neutral flex flex-col">
      <Nav />
      <main
        className="flex-1 px-6 py-8"
        style={{
          backgroundImage: `url(${backgroundImageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {children}
      </main>
      <footer>
        <div className="bg-secondary text-contrast px-6 py-4 flex items-center justify-between">
          <ul className="flex space-x-6 mx-auto">
            <li className="text-sm text-contrast/70">
              &copy; {new Date().getFullYear()} Datura Astrobotanics
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

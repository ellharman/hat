import React, { ReactNode, useEffect, useState } from "react";

import Nav from "./Nav";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
  alignCenter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, alignCenter }) => {
  const [backgroundImageSrc, setBackgroundImageSrc] = useState<string>("");

  useEffect(() => {
    setBackgroundImageSrc(`/bg/${Math.floor(Math.random() * 10) + 1}.JPG`);
  }, []);

  const pathname = usePathname();

  return (
    <div className="h-screen bg-neutral flex flex-col">
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <main
        className={`flex-1 relative ${alignCenter ? "content-center" : ""} ${
          pathname === "/" ? "px-0" : "px-6 py-8"
        }`}
        style={{
          backgroundImage: `url(${backgroundImageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]"></div>

        <div className="relative z-10">{children}</div>
      </main>
      {pathname !== "/" && (
        <footer>
          <div className="bg-secondary-700 text-contrast px-6 py-4 flex items-center justify-between">
            <ul className="flex space-x-6 mx-auto">
              <li className="text-sm text-contrast/70">
                &copy; {new Date().getFullYear()} Datura Astrobotanics
              </li>
            </ul>
          </div>
        </footer>
      )}
    </div>
  );
};
export default Layout;

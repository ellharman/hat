import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const Nav: React.FC<{ className?: string }> = ({ className }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return isMobile ? (
    <nav
      suppressHydrationWarning
      className={`sticky bg-secondary-700 text-contrast px-6 py-4 flex items-center justify-between top-0 ${className}`}
      style={{
        zIndex: 100000,
      }}
    >
      <a href="/" className="font-bold text-lg">
        Datura Astrobotanics
      </a>
      <button
        suppressHydrationWarning
        className="text-contrast hover:underline"
        style={{
          paddingRight: "0.7rem",
        }}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        Menu
      </button>
      {menuOpen && (
        <>
          <div
            className="absolute text-center top-12 right-0 bg-secondary-700 text-contrast rounded-lg shadow-lg z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col space-y-2">
              <li>
                <a href="/about" className="block px-4 py-2">
                  About
                </a>
              </li>
              <li className="relative group">
                <button suppressHydrationWarning className="block px-4 py-2">
                  Offerings
                </button>
                <ul
                  className="absolute right-full top-0 bg-secondary-700  text-contrast 
                  rounded-l-lg shadow-lg shadow-left hidden group-hover:block 
                  group-focus-within:block before:content-[''] before:absolute 
                  before:top-1/2 before:right-0 before:transform before:-translate-y-1/2 
                  before:w-2 before:h-2 before:bg-secondary before:rotate-45 
                  before:translate-x-1"
                >
                  <li>
                    <a
                      href="/offerings/introduction"
                      className="block px-4 py-2 hover:underline"
                    >
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a
                      href="/offerings/astroherbalism"
                      className="block px-4 py-2"
                    >
                      Astroherbalism & Medical Astrology
                    </a>
                  </li>
                  <li>
                    <a
                      href="/offerings/readings"
                      className="block px-4 py-2 hover:underline"
                    >
                      Readings
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/writing" className="block px-4 py-2">
                  Writing
                </a>
              </li>
              <li>
                <a href="/shop" className="block px-4 py-2">
                  Shop
                </a>
              </li>
              <li>
                <a href="/booking" className="block px-4 py-2">
                  Booking
                </a>
              </li>
            </ul>
          </div>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          ></div>
        </>
      )}
    </nav>
  ) : (
    <nav
      suppressHydrationWarning
      className="bg-secondary text-contrast px-6 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      <a href="/" className="font-bold text-lg">
        Datura Astrobotanics
      </a>
      <ul className="flex space-x-6">
        <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li>
        <li className="relative group">
          <button suppressHydrationWarning className="hover:underline">
            Offerings
          </button>
          <ul className="absolute left-0 top-full bg-secondary-700 text-contrast rounded-lg shadow-lg hidden group-hover:block group-focus-within:block">
            <li>
              <a
                href="/offerings/introduction"
                className="block px-4 py-2 hover:underline"
              >
                Introduction
              </a>
            </li>
            <li>
              <a
                href="/offerings/readings"
                className="block px-4 py-2 hover:underline"
              >
                Readings
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="/about" className="hover:underline">
            About
          </a>
        </li>
        <li>
          <a href="/writing" className="hover:underline">
            Writing
          </a>
        </li>
        <li>
          <a href="/shop" className="hover:underline">
            Shop
          </a>
        </li>
        <li>
          <a href="/booking" className="hover:underline">
            Booking
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

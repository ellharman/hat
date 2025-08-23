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
    <>
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
      </nav>
      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[99998]"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-out menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-secondary-700 text-contrast shadow-xl z-[99999] transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-bold text-lg">Navigation</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="text-contrast hover:underline text-xl"
            >
              ×
            </button>
          </div>

          <ul className="space-y-4">
            <li>
              <a
                href="/about"
                className="block py-3 text-lg border-b border-secondary-600 hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                About
              </a>
            </li>

            <li className="border-b border-secondary-600">
              <div className="py-3">
                <span className="block text-lg font-medium mb-2">
                  Offerings
                </span>
                <ul className="ml-4 space-y-2">
                  <li>
                    <a
                      href="/offerings/introduction"
                      className="block py-2 hover:underline"
                      onClick={() => setMenuOpen(false)}
                    >
                      Introduction
                    </a>
                  </li>
                  <li>
                    <a
                      href="/offerings/astroherbalism"
                      className="block py-2 hover:underline"
                      onClick={() => setMenuOpen(false)}
                    >
                      Astroherbalism & Medical Astrology
                    </a>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <a
                href="/writing"
                className="block py-3 text-lg border-b border-secondary-600 hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Writing
              </a>
            </li>

            <li>
              <a
                href="/shop"
                className="block py-3 text-lg border-b border-secondary-600 hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Shop
              </a>
            </li>

            <li>
              <a
                href="/booking"
                className="block py-3 text-lg hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Booking
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  ) : (
    <nav
      suppressHydrationWarning
      className={`bg-secondary-700 text-contrast px-6 py-4 flex items-center justify-between sticky top-0 z-50 ${className} ${isMobile ? "hidden" : ""}`}
      style={{
        zIndex: 100000,
      }}
    >
      <a href="/" className="font-bold text-lg">
        Datura Astrobotanics
      </a>
      <ul className="flex space-x-6">
        {/* <li>
          <a href="/" className="hover:underline">
            Home
          </a>
        </li> */}
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
                href="/offerings/astroherbalism"
                className="block px-4 py-2 hover:underline"
              >
                Astroherbalism & Medical Astrology
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

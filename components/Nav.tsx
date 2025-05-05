import React, { useEffect } from "react";

// get the screen width

const Nav: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return isMobile ? (
    <nav
      suppressHydrationWarning
      className="bg-secondary text-contrast px-6 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      <a href="/" className="font-bold text-lg">
        Datura Astrobotanics
      </a>
      <button
        suppressHydrationWarning
        className="text-contrast hover:underline"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        Menu
      </button>
      {menuOpen && (
        <div
          className="absolute top-16 right-6 bg-secondary text-contrast rounded-lg shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col space-y-2">
            <li>
              <a href="/" className="block px-4 py-2 hover:bg-secondary/80">
                Home
              </a>
            </li>
            <li className="relative group">
              <button
                suppressHydrationWarning
                className="block px-4 py-2 hover:bg-secondary/80"
              >
                Offerings
              </button>
              <ul className="absolute mt-2 right-10 bg-secondary text-contrast rounded-lg shadow-lg hidden group-hover:block group-focus-within:block">
                <li>
                  <a
                    href="/offerings/introduction"
                    className="block px-4 py-2 hover:bg-secondary/80"
                  >
                    Introduction
                  </a>
                </li>
                <li>
                  <a
                    href="/offerings/readings"
                    className="block px-4 py-2 hover:bg-secondary/80"
                  >
                    Readings
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                href="/about"
                className="block px-4 py-2 hover:bg-secondary/80"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/writing"
                className="block px-4 py-2 hover:bg-secondary/80"
              >
                Writing
              </a>
            </li>
            <li>
              <a href="/shop" className="block px-4 py-2 hover:bg-secondary/80">
                Shop
              </a>
            </li>
            <li>
              <a
                href="/booking"
                className="block px-4 py-2 hover:bg-secondary/80"
              >
                Booking
              </a>
            </li>
          </ul>
        </div>
      )}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 pointer-events-none"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </nav>
  ) : (
    <nav
      suppressHydrationWarning
      className="bg-secondary text-contrast px-6 py-4 flex items-center justify-between sticky top-0 z-50"
    >
      <div className="font-bold text-lg">Datura Astrobotanics</div>
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
          <ul className="absolute left-0 mt-2 bg-secondary text-contrast rounded-lg shadow-lg hidden group-hover:block group-focus-within:block">
            <li>
              <a
                href="/offerings/introduction"
                className="block px-4 py-2 hover:bg-secondary/80"
              >
                Introduction
              </a>
            </li>
            <li>
              <a
                href="/offerings/readings"
                className="block px-4 py-2 hover:bg-secondary/80"
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

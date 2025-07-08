import React from "react";

const Home: React.FC = () => {
  const [drift, setDrift] = React.useState(false);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDrift(true);
    setTimeout(() => {
      window.location.href = "/writing";
    }, 300); // match transition duration
  };
  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/venus.jpg')" }}
    >
      <a
        href="/writing"
        onClick={handleClick}
        className={`px-8 bg-primary text-contrast text-2xl font-bold rounded-lg shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 ${drift ? "translate-y-[-200%] opacity-0 pointer-events-none" : ""}`}
        style={{ backdropFilter: "blur(2px)" }}
      >
        Enter
      </a>
    </main>
  );
};

export default Home;

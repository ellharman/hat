import React from "react";

const Home: React.FC = () => {
  const [drift, setDrift] = React.useState(false);
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setDrift(true);
    setTimeout(() => {
      window.location.href = "/offerings/introduction";
    }, 300);
  };
  return (
    <main className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/img/venus.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(16px) brightness(0.5)",
        }}
      />
      <div className="relative z-10 w-full flex flex-col items-center justify-center h-full">
        <img
          src="/img/venus.jpg"
          alt="Venus"
          className="hidden md:block mx-auto rounded-xl object-contain h-[66vh]"
        />
        <a
          href="/offerings/introduction"
          onClick={handleClick}
          className={`absolute left-1/2 top-1/2 z-20 px-16 py-8 bg-primary text-contrast text-2xl font-bold rounded-3xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300 ${drift ? "translate-y-[-200%] opacity-0 pointer-events-none" : ""} -translate-x-1/2 -translate-y-1/2`}
          style={{
            backdropFilter: "blur(2px)",
            textShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          Enter
        </a>
      </div>
      <div
        className="md:hidden absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/img/venus.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </main>
  );
};

export default Home;

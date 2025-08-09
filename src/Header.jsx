const Header = () => {
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex flex-col md:flex-row items-center justify-between">
          
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-400">
              Destin Gollamudi
            </h1>
          </div>
          
          <div className="flex space-x-6">
            <button
              onClick={() => scrollToSection("#hero")}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("#experience")}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("#contact")}
              className="text-gray-300 hover:text-blue-400 transition-colors"
            >
              Contact
            </button>
          </div>
          
        </nav>
      </div>
    </header>
  );
}

export default Header;
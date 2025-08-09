const Header = () => {
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
            <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors">
              About
            </a>
            <a href="#projects" className="text-gray-300 hover:text-blue-400 transition-colors">
              Projects
            </a>
            <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">
              Contact
            </a>
          </div>
          
        </nav>
      </div>
    </header>
  )
}

export default Header;
import { useState, useEffect } from 'react';
import photo1 from './assets/viste3.jpg'; 
import photo2 from './assets/selfie.jpeg';

const Hero = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const texts = ['Aspiring Developer', 'React Enthusiast', 'Problem Solver', 'UF Student'];
  const images = [
    photo1,
    photo2
  ];
  
  useEffect(() => {
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    const type = () => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        
        if (charIndex === 0) {
          setIsDeleting(false);
          setCurrentIndex((currentIndex + 1) % texts.length);
        }
      } else {
        setCurrentText(current.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        
        if (charIndex === current.length) {
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      }
    };
    
    const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentIndex, texts]);

  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 
    
    return () => clearInterval(imageTimer);
  }, [images.length]);

  const scrollToSection = (sectionId) => {
  document.getElementById(sectionId)?.scrollIntoView({ 
    behavior: 'smooth' 
  });
};

  return (
    <section id="hero" className='bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex items-center'>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* Text side */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Hi, I'm <span className="text-blue-400">Destin</span>
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
              {currentText}<span className="animate-pulse">|</span>
            </h2>
            
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              Passionate about learning and building innovative solutions. Currently pursuing a degree in Computer Science at the University of Florida, with a minor in Statistics
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollToSection('projects')}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                View My Work
              </button>
              <button onClick={() => scrollToSection('contact')}
                className="border-2 border-gray-400 text-gray-300 hover:border-blue-400 hover:text-blue-400 font-semibold py-3 px-8 rounded-lg transition-all duration-300">
                Get In Touch
              </button>
            </div>
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 md:w-96 md:h-96">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 transform ${
                    index === currentImageIndex
                      ? 'opacity-100 scale-100 rotate-0'
                      : 'opacity-0 scale-95 rotate-6'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl shadow-2xl border-4 border-gray-700"
                  />
                </div>
              ))}
              
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 rounded-full opacity-10 animate-pulse animation-delay-1000"></div>
            </div>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-blue-400 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;
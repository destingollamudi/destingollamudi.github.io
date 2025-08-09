import { useState, useEffect } from 'react';
// Import your images here - add your actual company/school logos
import publixCelly from './assets/celly.jpg'; 
import publixExec from './assets/exec.jpg';
import ufSign from './assets/ufsign.jpg'; 
import ufFries from './assets/fries.jpg';
import gatorConnectImg from './assets/connect1.png'; 
import gatorConnectImg1 from './assets/connect2.png';

const Experience = () => {
  const [activeTab, setActiveTab] = useState('work');
  const [modalImage, setModalImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const openModal = (image, alt) => {
    setModalImage({ src: image, alt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const nextImage = (itemIndex, images) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [itemIndex]: ((prev[itemIndex] || 0) + 1) % images.length
    }));
  };

  const prevImage = (itemIndex, images) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [itemIndex]: (prev[itemIndex] || 0) > 0 ? (prev[itemIndex] || 0) - 1 : images.length - 1
    }));
  };

  const getCurrentImageIndex = (itemIndex) => {
    return currentImageIndex[itemIndex] || 0;
  };

  // Auto-switch images every 3 seconds
  useEffect(() => {
    const intervals = [];
    
    // Get current tab data
    let currentData = [];
    if (activeTab === 'work') currentData = workExperience;
    else if (activeTab === 'education') currentData = education;
    else if (activeTab === 'projects') currentData = projects;
    
    currentData.forEach((item, index) => {
      if (item.images && item.images.length > 1) {
        const interval = setInterval(() => {
          nextImage(index, item.images);
        }, 3000); // Switch every 3 seconds
        intervals.push(interval);
      }
    });

    // Cleanup intervals when component unmounts or data changes
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const workExperience = [
    {
      title: "Software Engineering Intern",
      company: "Publix Supermarkets",
      period: "May - July 2025",
      location: "Lakeland, FL",
      images: [publixCelly, publixExec], // Multiple images array
      description: [
        "Developed responsive web applications using Angular and ASP.NET",
        "Collaborated with senior developers on feature implementation",
        "Participated in code reviews and agile development processes",
        "Reduced page load times by 30% through SQL query optimization techniques"
      ],
      technologies: ["Angular", "ASP.NET", "TypeScript", "MS SQL Server"]
    }
  ];

  const education = [
    {
      title: "Bachelor of Science in Computer Science, Minor in Statistics",
      company: "University of Florida",
      period: "2022 - 2026 (Expected)",
      location: "Gainesville, FL",
      images: [ufSign, ufFries], 
      description: [
        "Relevant Coursework: Prog. Fund. 1 & 2, Data Structures and Algorithms, Computer Organization, Computational Linear Algebra, Operating Systems, Software Engineering, Programming with Data in R, Probability, Linear Regression, Networking, Natural Language Processing",
        "GPA: 3.6/4.0",
        "Dean's List: Fall 2023, Spring 2024",
        "Member of Software Engineering Club, Catholic Gators"
      ],
      technologies: ["Java", "Python", "C++", "SQL", "Data Structures"]
    }
  ];

  const projects = [
    {
      title: "GatorConnect",
      company: "",
      period: "Spring 2024",
      location: "",
      images: [gatorConnectImg, gatorConnectImg1], 
      description: [
        "Developed a full-stack CRUD application in a team of four using Agile methodology, delivering iterative features and enhancements in sprints.",
        "Constructed RESTful APIs using Node.js and Express.js, integrating with MongoDB for efficient data management and complex query handling.",
        "Implemented secure user authentication using JSON Web Tokens (JWT) including token generation, verification, and middleware-based route protection",
      ],
      technologies: ["React", "Express.js", "Node.js", "MongoDB"]
    }
  ];

  const tabs = [
    { id: 'work', label: 'Work Experience', data: workExperience },
    { id: 'education', label: 'Education', data: education },
    { id: 'projects', label: 'Projects', data: projects }
  ];

  const getCurrentData = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab ? currentTab.data : [];
  };

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            My Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From academic pursuits to professional experiences, here's how I've grown as a developer
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* GitHub Link - Only show when Projects tab is active */}
        {activeTab === 'projects' && (
          <div className="flex justify-center mb-8">
            <button 
              onClick={() => window.open("https://github.com/destingollamudi")}
              className="inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg group"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>View All Projects on GitHub</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        )}

        {/* Experience Content */}
        <div className="space-y-8">
          {getCurrentData().map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image Gallery Section - Top of card */}
              <div className="relative h-48 md:h-56 lg:h-64 bg-gradient-to-br from-blue-50 to-indigo-100">
                {item.images && item.images.length > 0 ? (
                  <div className="w-full h-full relative">
                    {/* Current Image */}
                    <div 
                      className="w-full h-full cursor-pointer group"
                      onClick={() => openModal(item.images[getCurrentImageIndex(index)], `${item.company || item.title} image ${getCurrentImageIndex(index) + 1}`)}
                    >
                      <img 
                        src={item.images[getCurrentImageIndex(index)]} 
                        alt={`${item.company || item.title} image ${getCurrentImageIndex(index) + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Overlay with zoom icon */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="bg-white bg-opacity-90 rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Arrows (only show if more than 1 image) */}
                    {item.images.length > 1 && (
                      <>
                        {/* Previous Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage(index, item.images);
                          }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
                          aria-label="Previous image"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>

                        {/* Next Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(index, item.images);
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
                          aria-label="Next image"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {item.images.map((_, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(prev => ({
                                  ...prev,
                                  [index]: imgIndex
                                }));
                              }}
                              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                getCurrentImageIndex(index) === imgIndex
                                  ? 'bg-white'
                                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                              }`}
                              aria-label={`Go to image ${imgIndex + 1}`}
                            />
                          ))}
                        </div>

                        {/* Image Counter */}
                        <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white text-sm px-2 py-1 rounded">
                          {getCurrentImageIndex(index) + 1} / {item.images.length}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm">No Images Available</p>
                    </div>
                  </div>
                )}
                
                {/* Gradient overlay for better text readability */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent h-24"></div>
                
                {/* Period badge */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-gray-800">{item.period}</span>
                </div>
                
                {/* Title overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  {item.company && (
                    <h4 className="text-lg font-semibold text-blue-200">
                      {item.company}
                    </h4>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8">
                {/* Location */}
                {item.location && (
                  <div className="flex items-center text-gray-600 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-medium">{item.location}</span>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <ul className="space-y-3">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h5 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Technologies & Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Full Screen Image */}
        {modalImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl max-h-full">
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300 transition-colors duration-200 z-10"
                aria-label="Close modal"
              >
                ×
              </button>
              
              {/* Full Screen Image */}
              <img
                src={modalImage.src}
                alt={modalImage.alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on image
              />
              
              {/* Image Caption */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
                {modalImage.alt}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;

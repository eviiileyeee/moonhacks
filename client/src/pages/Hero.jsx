import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, easeOut } from "framer-motion";
import Goals from "../components/subPages/Goals.jsx";
import { useTheme } from "../context/ThemeContext/ThemeContext.jsx";
import Button from "../components/ui/Button.jsx";
import AddEventCard from "../components/ui/AddEventCard.jsx";
import About from "../components/layout/footer/footerLinks/About.jsx";

const Hero = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  // Add a state for screen size
  const [windowWidth, setWindowWidth] = useState(0);

  const handleClick = () => {
    navigate("/events");
  };

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Set initial window width
    setWindowWidth(window.innerWidth);

    // Add window resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Animation Variants - Reduced y distance for mobile
  const textVariants = (delay = 0) => ({
    hidden: { 
      y: windowWidth < 640 ? 50 : 100, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: windowWidth < 640 ? 0.6 : 0.8, 
        ease: easeOut, 
        delay 
      }
    }
  });
  
  function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Format: Month Day Year (e.g., "May 12 2035")
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  // Determine button size based on window width
  const getButtonSize = () => {
    if (windowWidth < 640) return "sm";
    if (windowWidth < 768) return "md";
    return "lg";
  };

  return (
    <>
        <section
          className={`
            relative 
            h-screen 
            flex 
            items-start 
            sm:items-center 
            justify-center 
            px-6 
            overflow-hidden 
            transition-all 
            duration-500 
            ${darkMode ? "bg-gray-900" : "bg-white text-black"}
          `}
        >
          {/* Date - Positioned for visibility on mobile */}
          <div className="absolute right-4 top-20 sm:right-6 sm:top-8 md:top-10 lg:top-[17%] text-xs sm:text-xl md:text-2xl lg:text-2xl text-gray-500 font-arp z-10">
            {formatDate(new Date().toISOString())}
          </div>
          
          <div className="container mx-auto text-left max-w-6xl relative pt-28 sm:py-0">
            
            {/* Heading - Adjusted spacing for mobile */}
            <div className="font-extrabold font-heading text-6xl sm:text-[14rem] md:text-[14rem] lg:text-[11rem] leading-[0.75] sm:-mt-16 md:-mt-16 lg:mt-0 mb-10 sm:mb-12">
              
              <motion.div
                className="mt-0"
                initial="hidden"
                animate="visible"
                variants={textVariants(0)}
              >
                <span className={`
                  font-black 
                  ${darkMode ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent" : "text-[bg-secondary]"}
                `}>
                  PLAN
                </span>
              </motion.div>

              <motion.div
                className="mt-4 sm:mt-0"
                initial="hidden"
                animate="visible"
                variants={textVariants(0.3)}
              >
                <span className={`
                  font-black 
                  ${darkMode ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent" : "text-[bg-secondary]"}
                `}>
                  CONNECT
                </span>
              </motion.div>

              <motion.div
                className="mt-4 sm:mt-0"
                initial="hidden"
                animate="visible"
                variants={textVariants(0.6)}
              >
                <span className={`
                  font-black 
                  ${darkMode ? "bg-gradient-to-b from-gray-400 to-gray-600 bg-clip-text text-transparent" : "text-[bg-secondary]"}
                `}>
                  CELEBRATE
                </span>
              </motion.div>
            </div>

            {/* Location Info - Adjusted spacing and size */}
            <div className="flex flex-col items-end mt-8 sm:mt-6 text-gray-600 text-sm sm:text-xl md:text-2xl font-semibold">
              PRAVA CENTER, SAN FRANCISCO, CA
              <br />
              IN PERSON &amp; ONLINE
            </div>

            {/* Get Started Button - Using the new Button component */}
            <div className="flex justify-start mt-8 sm:mt-2">
              <Button 
                onClick={handleClick}
                size={getButtonSize()}
              >
                GET STARTED
              </Button>
            </div>

            {/* Scroll for More - Mobile Only */}
            <div className="sm:hidden flex justify-center mt-20">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-gray-500 text-lg font-semibold flex flex-col items-center"
              >
                <span>Scroll for More</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mt-2 text-2xl"
                >
                  ↓
                </motion.div>
              </motion.div>
            </div>

          </div>
        </section>
        <About/>
       <AddEventCard/>
        
      <Goals />
    </>
  );
};
export default Hero;
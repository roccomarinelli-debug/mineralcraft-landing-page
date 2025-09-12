import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Droplets, Sparkles, Leaf, Heart, ShoppingCart, Palette, ChevronDown } from 'lucide-react';
import './App.css';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  
  const [currentTheme, setCurrentTheme] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const colorThemes = useMemo(() => [
    // GRADIENT VERSIONS (Current Style)
    {
      name: "Original Gradients",
      primary: "#494B33",
      secondary: "#CEB49F", 
      accent: "#C27061",
      cream: "#E0D0D0",
      dark: "#35271C",
      useGradients: true
    },
    {
      name: "Coral Focus Gradients",
      primary: "#C27061",
      secondary: "#494B33",
      accent: "#CEB49F",
      cream: "#E0D0D0",
      dark: "#35271C",
      useGradients: true
    },
    {
      name: "Warm Cream Gradients",
      primary: "#CEB49F",
      secondary: "#C27061",
      accent: "#494B33",
      cream: "#E0D0D0",
      dark: "#35271C",
      useGradients: true
    },
    
    // SOLID COLOR VERSIONS
    {
      name: "Earth Green Solid",
      primary: "#494B33",
      secondary: "#CEB49F",
      accent: "#C27061",
      cream: "#E0D0D0",
      dark: "#35271C",
      useGradients: false
    },
    {
      name: "Coral Solid",
      primary: "#C27061",
      secondary: "#494B33",
      accent: "#CEB49F",
      cream: "#E0D0D0",
      dark: "#35271C",
      useGradients: false
    },
    {
      name: "Cream Solid",
      primary: "#CEB49F",
      secondary: "#C27061",
      accent: "#494B33",
      cream: "#E0D0D0",
      dark: "#35271C",
      useGradients: false
    },
    {
      name: "Dark Brown Solid",
      primary: "#35271C",
      secondary: "#CEB49F",
      accent: "#C27061",
      cream: "#E0D0D0",
      dark: "#494B33",
      useGradients: false
    },
    {
      name: "Light Cream Solid",
      primary: "#E0D0D0",
      secondary: "#494B33",
      accent: "#C27061",
      cream: "#CEB49F",
      dark: "#35271C",
      useGradients: false
    },
    
    // NEW MINERALCRAFT COLOR THEMES
    {
      name: "Alpine Heritage",
      primary: "#68A097",
      secondary: "#D0C9C0",
      accent: "#494B33",
      cream: "#A97C50",
      dark: "#F4F5F0",
      useGradients: false
    },
    {
      name: "Alpenglow",
      primary: "#E6A5A1",
      secondary: "#74819F",
      accent: "#DDC490",
      cream: "#3E4C66",
      dark: "#FBFBFB",
      useGradients: false
    },
    {
      name: "Mineral Flame",
      primary: "#BDB2D8",
      secondary: "#CD212A",
      accent: "#FFD700",
      cream: "#EEEEED",
      dark: "#1C1C1C",
      useGradients: false
    },
    
    // PANTONE 2025 FLORAL PATHWAYS
    {
      name: "Floral Pathways",
      primary: "#7BA05B",  // High Meadow (Willow)
      secondary: "#F5F1EB", // Dolomite Dust (Gardenia)
      accent: "#6B9BD9",   // Glacial Tarn (Cornflower Blue)
      cream: "#D4A574",    // Alpenglow Rose (Rose Tan)
      dark: "#8B4F47",     // Alpine Loam (Mocha Mousse)
      tertiary: "#E8A87C", // Peach Echo (tertiary for CTA)
      useGradients: false
    },
    
    // PANTONE 2025 REFINED HEX CODES
    {
      name: "Pantone Refined",
      primary: "#9A8B4F",  // Willow
      secondary: "#F5F3F0", // Gardenia (approximated)
      accent: "#7391C8",   // Cornflower Blue
      cream: "#D19C97",    // Rose Tan
      dark: "#A47864",     // Mocha Mousse
      tertiary: "#B8A082", // Warm Taupe (tertiary for CTA)
      useGradients: false
    }
  ], []);

  useEffect(() => {
    const theme = colorThemes[currentTheme];
    document.documentElement.style.setProperty('--primary-dark', theme.primary);
    document.documentElement.style.setProperty('--primary-light', theme.secondary);
    document.documentElement.style.setProperty('--accent-coral', theme.accent);
    document.documentElement.style.setProperty('--accent-cream', theme.cream);
    document.documentElement.style.setProperty('--dark-brown', theme.dark);
    
    // Set tertiary color for CTA buttons (for Floral Pathways and Pantone Refined)
    if (theme.tertiary) {
      document.documentElement.style.setProperty('--cta-color', theme.tertiary);
    } else {
      document.documentElement.style.setProperty('--cta-color', theme.accent);
    }
    
    // Set gradient mode
    if (theme.useGradients) {
      document.documentElement.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${theme.primary} 0%, ${theme.dark} 100%)`);
      document.documentElement.style.setProperty('--gradient-accent', `linear-gradient(135deg, ${theme.accent} 0%, ${theme.secondary} 100%)`);
    } else {
      document.documentElement.style.setProperty('--gradient-primary', theme.primary);
      document.documentElement.style.setProperty('--gradient-accent', theme.accent);
    }
  }, [currentTheme, colorThemes]);

  return (
    <div className="app">
      {/* Color Palette Switcher */}
      <motion.div 
        className="palette-switcher"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.button
          className="palette-button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette className="palette-icon" />
          <span className="palette-text">Colors</span>
          <motion.div
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="chevron-icon" />
          </motion.div>
        </motion.button>
        
        <motion.div
          className="palette-dropdown"
          initial={false}
          animate={{ 
            opacity: dropdownOpen ? 1 : 0,
            y: dropdownOpen ? 0 : -10,
            pointerEvents: dropdownOpen ? 'auto' : 'none'
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {colorThemes.map((theme, index) => (
            <motion.button
              key={index}
              className={`theme-option ${currentTheme === index ? 'active' : ''}`}
              onClick={() => {
                setCurrentTheme(index);
                setDropdownOpen(false);
              }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="theme-colors">
                <div className="color-dot" style={{ backgroundColor: theme.primary }}></div>
                <div className="color-dot" style={{ backgroundColor: theme.secondary }}></div>
                <div className="color-dot" style={{ backgroundColor: theme.accent }}></div>
              </div>
              <span className="theme-name">{theme.name}</span>
              {currentTheme === index && (
                <motion.div 
                  className="active-indicator"
                  layoutId="activeTheme"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="hero"
        style={{ y }}
        initial={{ opacity: 0 }}
        animate={{ opacity: heroInView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="hero-background">
          <motion.div 
            className="floating-bubbles"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="bubble"
                initial={{ y: 100, opacity: 0 }}
                animate={{ 
                  y: [-20, -100, -20],
                  opacity: [0, 0.7, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Promotional Banner */}
        <motion.div 
          className="promo-banner"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <div className="promo-text-container">
            <div className="promo-text">
              Use code 'LAUNCH' for 20% OFF your first purchase ✨ Use code 'LAUNCH' for 20% OFF your first purchase ✨ Use code 'LAUNCH' for 20% OFF your first purchase ✨
            </div>
          </div>
        </motion.div>

        <div className="hero-content">
          
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: heroInView ? 0 : 100, opacity: heroInView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            TRANSFORM YOUR BUBBLES
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hero-subtitle"
          >
            Elevate the taste of your Sodastream water to the mineral profile of the Italian Alps.
          </motion.p>
          
          <motion.button
            className="cta-button primary"
            initial={{ scale: 0 }}
            animate={{ scale: heroInView ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.6, type: "spring", bounce: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(196, 112, 97, 0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="button-icon" />
            TRY IT NOW
          </motion.button>
        </div>
        
        <motion.div
          className="hero-product-showcase"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: heroInView ? 1 : 0.8, opacity: heroInView ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
        >
          <motion.img
            src="/images/hero-product.webp"
            alt="MINERALCRAFT Premium Sparkling Water - Transform Your Bubbles"
            className="hero-product-image"
            whileHover={{ scale: 1.05, rotateY: 2 }}
            transition={{ duration: 0.3 }}
            loading="eager"
          />
          
          {/* Floating bubbles overlay */}
          <div className="hero-bubbles-overlay">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="hero-bubble"
                animate={{
                  y: [0, -40, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut"
                }}
                style={{
                  left: `${15 + Math.random() * 70}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        ref={featuresRef}
        className="features"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: featuresInView ? 1 : 0, y: featuresInView ? 0 : 50 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          NATURE'S SOFT DRINK, PERFECTED.
        </motion.h2>
        
        <div className="features-grid">
          {[
            {
              icon: <Droplets />,
              title: "EXCEPTIONAL TASTE",
              description: "Inspired by nature's most renowned mineral springs, savour the crisp, refreshing taste of premium water crafted at home.",
              delay: 0.3
            },
            {
              icon: <Heart />,
              title: "MUCH MORE THAN BUBBLES",
              description: "Infused with essential minerals like calcium, magnesium and potassium - supporting hydration, bone health and sustained energy.",
              delay: 0.5
            },
            {
              icon: <Sparkles />,
              title: "A LUXURIOUS HYDRATION RITUAL",
              description: "Bring your water to life and bathe every cell in your body with mineral-rich bubbles.",
              delay: 0.7
            },
            {
              icon: <Leaf />,
              title: "SUSTAINABLE & SMARTER",
              description: "No plastic waste, no shipping water across the planet, no water table degradation.",
              delay: 0.9
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ 
                opacity: featuresInView ? 1 : 0, 
                y: featuresInView ? 0 : 50,
                scale: featuresInView ? 1 : 0.9
              }}
              transition={{ delay: feature.delay, duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(73, 75, 51, 0.15)",
                y: -10
              }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section 
        ref={ctaRef}
        className="final-cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: ctaInView ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="cta-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: ctaInView ? 1 : 0.8, opacity: ctaInView ? 1 : 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: ctaInView ? 0 : 30, opacity: ctaInView ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            MAKES OVER 25 LITRES
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: ctaInView ? 0 : 20, opacity: ctaInView ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Add one scoop and carbonate for premium sparkling water at home.
          </motion.p>
          
          <motion.div 
            className="guarantee"
            initial={{ scale: 0 }}
            animate={{ scale: ctaInView ? 1 : 0 }}
            transition={{ delay: 0.7, duration: 0.6, type: "spring", bounce: 0.3 }}
          >
            <Heart className="guarantee-icon" />
            <span>LOVE IT OR MONEY BACK</span>
          </motion.div>
          
          <motion.button
            className="cta-button secondary"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: ctaInView ? 0 : 50, opacity: ctaInView ? 1 : 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 35px rgba(206, 180, 159, 0.4)" 
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="button-icon" />
            BUY NOW
          </motion.button>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default App;
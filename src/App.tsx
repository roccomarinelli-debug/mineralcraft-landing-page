import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Palette, ChevronDown, Plus } from 'lucide-react';
import './App.css';

// Analytics Tracking System
interface TrackingEvent {
  action: string;
  category: string;
  label: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

const trackEvent = (action: string, category: string, label: string) => {
  const event: TrackingEvent = {
    action,
    category,
    label,
    timestamp: Date.now(),
    sessionId: getSessionId()
  };

  // Console log for development
  console.log('🔍 Analytics Event:', event);
  
  // Send to Google Analytics 4 (if configured)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      custom_parameter_1: 'mineralcraft_landing'
    });
  }

  // Send to Facebook Pixel (if configured)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', action, {
      content_category: category,
      content_name: label
    });
  }

  // Store locally for debugging and backup tracking
  const events = JSON.parse(localStorage.getItem('mineralcraft_events') || '[]');
  events.push(event);
  // Keep only last 100 events
  if (events.length > 100) events.splice(0, events.length - 100);
  localStorage.setItem('mineralcraft_events', JSON.stringify(events));
};

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('mineralcraft_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('mineralcraft_session_id', sessionId);
  }
  return sessionId;
};

const trackPageView = (pageName: string) => {
  trackEvent('page_view', 'Navigation', pageName);
  
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  
  const [currentTheme, setCurrentTheme] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [stepsRef, stepsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [mineralsRef, mineralsInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const faqData = useMemo(() => [
    {
      question: "What is mineralcraft?",
      answer: "It's the finest tasting mineral water, crafted by you. We've blended the purest essential minerals to match the profile of the world's most popular springs so you can make luxurious sparkling mineral water at home."
    },
    {
      question: "How do I use it?",
      answer: "It's as easy as 1-2.\n\n1. Add a scoop of Mineralcraft's Italian Alps blend to your water bottle.\n\n2. Carbonate in a SodaStream\n\nInstantly boost your bubble's flavour and enjoy delicious water with pure minerals - no shipping water across the planet required."
    },
    {
      question: "Why the Italian Alps",
      answer: "Because nature does it best, and there's no more distinctive mineral water in the world than the sulphate rich flavour of the northern Italian Alps."
    },
    {
      question: "How is it better than bottled mineral water?",
      answer: "There's no plastic waste, no shipping heavy bottles of water around the globe and no paying for expensive brands.\n\nMineralcraft is way better than bottled mineral water, but with the same crisp, mineral-rich taste."
    },
    {
      question: "What makes mineralcraft so different?",
      answer: "Mineralcraft is a daily wellness upgrade. Treat your tastebuds to the simple but delicious taste of natural mineral water, devoid of artificial additives or sugary flavours.\n\nPerfectly balanced minerals to aid digestion, muscle recovery, and skin health. Mineralcraft is luxurious hydration."
    },
    {
      question: "Can I take it on the go?",
      answer: "Take premium mineral water beyond the table—perfect for your water bottle at work or the gym. Our compact, stylish tin ensures top-tier hydration anywhere—whether at the office, the gym, or on your own Alpine adventure."
    }
  ], []);
  
  const colorThemes = useMemo(() => [
    // GRADIENT VERSIONS (Current Style)
    {
      name: "Original Gradients",
      primary: "#494B33",
      secondary: "#CEB49F", 
      accent: "#C27061",
      cream: "#E0D0D0",
      dark: "#35271C",
      tertiary: "#8B7355",
      useGradients: true
    },
    {
      name: "Coral Focus Gradients",
      primary: "#C27061",
      secondary: "#494B33",
      accent: "#CEB49F",
      cream: "#E0D0D0",
      dark: "#35271C",
      tertiary: "#D49B8A",
      useGradients: true
    },
    {
      name: "Warm Cream Gradients",
      primary: "#CEB49F",
      secondary: "#C27061",
      accent: "#494B33",
      cream: "#E0D0D0",
      dark: "#35271C",
      tertiary: "#E5D5C7",
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
      tertiary: "#8B7355",
      useGradients: false
    },
    {
      name: "Coral Solid",
      primary: "#C27061",
      secondary: "#494B33",
      accent: "#CEB49F",
      cream: "#E0D0D0",
      dark: "#35271C",
      tertiary: "#D49B8A",
      useGradients: false
    },
    {
      name: "Cream Solid",
      primary: "#CEB49F",
      secondary: "#C27061",
      accent: "#494B33",
      cream: "#E0D0D0",
      dark: "#35271C",
      tertiary: "#E5D5C7",
      useGradients: false
    },
    {
      name: "Dark Brown Solid",
      primary: "#35271C",
      secondary: "#CEB49F",
      accent: "#C27061",
      cream: "#E0D0D0",
      dark: "#494B33",
      tertiary: "#6B4C38",
      useGradients: false
    },
    {
      name: "Light Cream Solid",
      primary: "#E0D0D0",
      secondary: "#494B33",
      accent: "#C27061",
      cream: "#CEB49F",
      dark: "#35271C",
      tertiary: "#F2ECE8",
      useGradients: false
    },
    
    // NEW MINERALCRAFT COLOR THEMES
    {
      name: "Alpine Heritage",
      primary: "#68A097",
      secondary: "#D0C9C0",
      accent: "#494B33",
      cream: "#A97C50",
      dark: "#2C3E3A",
      tertiary: "#9BC5BC",
      useGradients: false
    },
    {
      name: "Alpenglow",
      primary: "#E6A5A1",
      secondary: "#74819F",
      accent: "#DDC490",
      cream: "#3E4C66",
      dark: "#FBFBFB",
      tertiary: "#F0C5C2",
      useGradients: false
    },
    {
      name: "Mineral Flame",
      primary: "#BDB2D8",
      secondary: "#CD212A",
      accent: "#FFD700",
      cream: "#EEEEED",
      dark: "#1C1C1C",
      tertiary: "#D4C9E8",
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
    },
    
    // MONOCHROME THEME
    {
      name: "Monochrome",
      primary: "#1a1a1a",     // Near black
      secondary: "#f5f5f5",   // Light gray
      accent: "#666666",      // Medium gray
      cream: "#e0e0e0",       // Light gray
      dark: "#000000",        // Pure black
      tertiary: "#999999",    // Lighter gray for accents
      useGradients: false
    }
  ], []);

  // Track initial page load
  useEffect(() => {
    trackPageView('MINERALCRAFT Landing Page');
    trackEvent('Page_Load', 'Landing', 'Initial Visit');
  }, []);

  // Track section visibility
  useEffect(() => {
    if (heroInView) trackEvent('Section_View', 'Visibility', 'Hero Section');
  }, [heroInView]);

  useEffect(() => {
    if (featuresInView) trackEvent('Section_View', 'Visibility', 'Features Section');
  }, [featuresInView]);

  useEffect(() => {
    if (stepsInView) trackEvent('Section_View', 'Visibility', '2-Step Process Section');
  }, [stepsInView]);

  useEffect(() => {
    if (mineralsInView) trackEvent('Section_View', 'Visibility', 'Minerals Benefits Section');
  }, [mineralsInView]);


  useEffect(() => {
    if (ctaInView) trackEvent('Section_View', 'Visibility', 'Final CTA Section');
  }, [ctaInView]);

  useEffect(() => {
    if (faqInView) trackEvent('Section_View', 'Visibility', 'FAQ Section');
  }, [faqInView]);

  useEffect(() => {
    const theme = colorThemes[currentTheme];
    document.documentElement.style.setProperty('--primary-dark', theme.primary);
    document.documentElement.style.setProperty('--primary-light', theme.secondary);
    document.documentElement.style.setProperty('--accent-coral', theme.accent);
    document.documentElement.style.setProperty('--accent-cream', theme.cream);
    document.documentElement.style.setProperty('--dark-brown', theme.dark);
    
    // Set tertiary color for backgrounds and special elements
    if (theme.tertiary) {
      document.documentElement.style.setProperty('--tertiary-color', theme.tertiary);
      // For Floral Pathways and Pantone Refined, use existing tertiary for CTA
      if (theme.name === 'Floral Pathways' || theme.name === 'Pantone Refined') {
        document.documentElement.style.setProperty('--cta-color', theme.tertiary);
      } else {
        document.documentElement.style.setProperty('--cta-color', theme.accent);
      }
    } else {
      document.documentElement.style.setProperty('--tertiary-color', theme.accent);
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
          onClick={() => {
            setDropdownOpen(!dropdownOpen);
            trackEvent('Theme_Selector_Open', 'Customization', 'Color Palette Opened');
          }}
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
                trackEvent('Theme_Change', 'Customization', theme.name);
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
          onClick={() => {
            trackEvent('Promo_Banner_Click', 'Promotion', 'LAUNCH Code Banner');
            window.open('https://shop.app/checkout/82707906868/cn/hWN1OYjQsyU7yI5py65ncD8a/shoppay?_cs=3.AMPS&authorization=cGVFWXlJNW42TGpDMCtueWxxME9YMy9lbCt0V252a3h1Mkd2UmdHNDMzMEY1RGlEbVFWYm80cUpPWnY2VVFPNVllT2l4dlR3TW5PQ1MveUlIc1VGbkhpelVTZ3hFRk1hRUFtODhTSUkxUitoWFlubjlMekdZTUR6eGtoTUM0Y2ZaTkUyVEw5TGpnUlNOVExFaXdaVFgzRWZNMU51dzZORDJ0YWdXaTZGKzZBQnNvbzZFVlBUSkpXcEJuYjRZZnBTLS01OXdVK0dPVzl0OFQ3eDNvelJuWDNRPT0%3D--03538a3dd38f0f0e9f688ac50cc8360c171d62e5&discount_code=LAUNCH&preview_theme_id=167526138164&redirect_source=checkout_automatic_redirect&tracking_unique=1d7c29f8-1a25-4bec-921e-b76a5725034e&tracking_visit=0423dd0f-2e03-44a9-bea6-f29c2c9009c', '_blank', 'noopener,noreferrer');
          }}
          style={{ cursor: 'pointer' }}
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
            ELEVATE YOUR WATER
          </motion.h1>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: heroInView ? 0 : 50, opacity: heroInView ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="hero-subtitle"
          >
            Mineralcraft's Italian Alps blend transforms your Sodastream bubbly water into the most delicious, crisp tasting mineral water.
          </motion.p>
          
          <motion.a
            href="https://mineralcraft.co/products/italian-alps-1"
            className="cta-button primary"
            initial={{ scale: 0 }}
            animate={{ scale: heroInView ? 1 : 0 }}
            transition={{ delay: 1, duration: 0.6, type: "spring", bounce: 0.3 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(196, 112, 97, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => trackEvent('CTA_Click', 'Hero', 'Try It Now')}
          >
            <ShoppingCart className="button-icon" />
            TRY IT NOW
          </motion.a>
        </div>
        
        <motion.div
          className="hero-product-showcase"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: heroInView ? 1 : 0.8, opacity: heroInView ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
        >
          <motion.img
            src="/images/hero/hero-product.webp"
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
          Why craft your own mineral water at home?
        </motion.h2>
        
        <div className="features-grid">
          {[
            {
              image: "/images/features/1.png",
              imageAlt: "Pristine mountain lake - exceptional water taste",
              title: "EXCEPTIONAL TASTE",
              description: "Inspired by nature's most renowned mineral springs, savour the crisp, refreshing taste of premium water crafted at home.",
              delay: 0.3
            },
            {
              image: "/images/features/2.png",
              imageAlt: "Majestic mountain peaks - essential minerals",
              title: "MUCH MORE THAN BUBBLES",
              description: "Infused with essential minerals like calcium, magnesium and potassium - supporting hydration, bone health and sustained energy.",
              delay: 0.5
            },
            {
              image: "/images/features/3.png",
              imageAlt: "Misty mountain landscape - luxurious hydration ritual",
              title: "A LUXURIOUS HYDRATION RITUAL",
              description: "Bring your water to life and bathe every cell in your body with mineral-rich bubbles.",
              delay: 0.7
            },
            {
              image: "/images/features/sustainable-smart.webp",
              imageAlt: "Lush forest and river - sustainable smart choice",
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
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={feature.image} 
                  alt={feature.imageAlt}
                  className="feature-image"
                />
              </motion.div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: featuresInView ? 1 : 0, 
            y: featuresInView ? 0 : 30 
          }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.a
            href="https://mineralcraft.co/products/italian-alps-1"
            className="cta-button primary"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(73, 75, 51, 0.3)" 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => trackEvent('CTA_Click', 'Features', 'Buy Now')}
          >
            <ShoppingCart className="button-icon" />
            BUY NOW
          </motion.a>
        </motion.div>
      </motion.section>

      {/* 2-Step Process Section */}
      <motion.section 
        ref={stepsRef}
        className="steps-section"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: stepsInView ? 1 : 0, y: stepsInView ? 0 : 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2
          className="steps-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: stepsInView ? 1 : 0, y: stepsInView ? 0 : 50 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Craft the taste of the Italian Alps in 2 steps
        </motion.h2>
        
        <div className="steps-content">
          <motion.div 
            className="steps-column"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: stepsInView ? 1 : 0, x: stepsInView ? 0 : -50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="step-item">
              <h3 className="step-title">Step 1</h3>
              <p className="step-description">Add a measured scoop of Mineralcraft to your water depending on your preferred taste.</p>
            </div>
            
            <div className="step-item">
              <h3 className="step-title">Step 2</h3>
              <p className="step-description">Carbonate to dissolve the minerals and gently mix the flavours.</p>
            </div>
            
            <motion.a
              href="https://mineralcraft.co/pages/how-it-works"
              className="cta-button tertiary learn-more-btn"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: stepsInView ? 0 : 20, opacity: stepsInView ? 1 : 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)" 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => trackEvent('CTA_Click', 'Steps_Section', 'Learn More')}
            >
              LEARN MORE
            </motion.a>
          </motion.div>
          
          <motion.div 
            className="video-column"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: stepsInView ? 1 : 0, x: stepsInView ? 0 : 50 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="video-container">
              <video
                src="https://mineralcraft.co/cdn/shop/videos/c/vp/4e7a153234274ac4819f37d0dd83937e/4e7a153234274ac4819f37d0dd83937e.HD-1080p-7.2Mbps-54297024.mp4?v=0"
                title="SodaStream Mineralcraft Process"
                controls
                muted
                autoPlay
                loop
                className="process-video"
              />
            </div>
          </motion.div>
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
        <div className="key-claims-grid">
          <motion.div 
            className="key-claim"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: ctaInView ? 1 : 0, x: ctaInView ? 0 : -50 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: ctaInView ? 0 : 20, opacity: ctaInView ? 1 : 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              MAKES OVER 25 LITRES
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: ctaInView ? 0 : 10, opacity: ctaInView ? 1 : 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Just add a measured scoop to water and carbonate.
            </motion.p>
          </motion.div>

          <motion.div 
            className="key-claim"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: ctaInView ? 1 : 0, x: ctaInView ? 0 : 50 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: ctaInView ? 0 : 20, opacity: ctaInView ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              LOVE IT OR YOUR MONEY BACK
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: ctaInView ? 0 : 10, opacity: ctaInView ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              We created this product for maximum refreshment. If you're not happy we'll refund you - no worries.
            </motion.p>
          </motion.div>
        </div>

        <motion.a
          href="https://mineralcraft.co/products/italian-alps-1"
          className="cta-button secondary"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: ctaInView ? 0 : 50, opacity: ctaInView ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 15px 35px rgba(206, 180, 159, 0.4)" 
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => trackEvent('CTA_Click', 'Final_CTA', 'Buy Now')}
        >
          <ShoppingCart className="button-icon" />
          BUY NOW
        </motion.a>
      </motion.section>

      {/* Minerals Benefits Section */}
      <motion.section 
        ref={mineralsRef}
        className="minerals-section"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: mineralsInView ? 1 : 0, y: mineralsInView ? 0 : 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2
          className="minerals-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: mineralsInView ? 1 : 0, y: mineralsInView ? 0 : 50 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          The benefits of minerals in your water
        </motion.h2>
        
        <div className="minerals-grid">
          {[
            {
              name: "Calcium",
              benefits: "Supports bone strength - muscle function - heart health.",
              delay: 0.3
            },
            {
              name: "Potassium", 
              benefits: "Enhances hydration - energy - athletic performance.",
              delay: 0.4
            },
            {
              name: "Magnesium",
              benefits: "Aids digestion - circulation - sleep - cellular function.",
              delay: 0.5
            },
            {
              name: "Sodium",
              benefits: "For fluid balance - nerve and muscle function.",
              delay: 0.6
            }
          ].map((mineral, index) => (
            <motion.div
              key={index}
              className="mineral-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: mineralsInView ? 1 : 0, 
                y: mineralsInView ? 0 : 30
              }}
              transition={{ delay: mineral.delay, duration: 0.8, ease: "easeOut" }}
            >
              <h3 className="mineral-name">{mineral.name}</h3>
              <p className="mineral-benefits">{mineral.benefits}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.p
          className="minerals-summary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mineralsInView ? 1 : 0, y: mineralsInView ? 0 : 20 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Mineralcraft delivers the essential electrolytes and trace minerals your body craves, supporting hydration at home, on the go, or during peak performance.
        </motion.p>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        ref={faqRef}
        className="faq-section"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 50 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          FREQUENTLY ASKED QUESTIONS
        </motion.h2>
        
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="faq-item"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: faqInView ? 1 : 0, y: faqInView ? 0 : 30 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.6 }}
            >
              <motion.button
                className="faq-question"
                onClick={() => {
                  const isOpening = openFaqIndex !== index;
                  setOpenFaqIndex(openFaqIndex === index ? null : index);
                  trackEvent('FAQ_Toggle', 'FAQ', `${faq.question} - ${isOpening ? 'Opened' : 'Closed'}`);
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openFaqIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="faq-icon"
                >
                  <Plus size={20} />
                </motion.div>
              </motion.button>
              
              <motion.div
                className="faq-answer-container"
                initial={false}
                animate={{
                  height: openFaqIndex === index ? "auto" : 0,
                  opacity: openFaqIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="faq-answer">
                  {faq.answer.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default App;

import React, { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShoppingCart, Plus, Utensils, Container } from 'lucide-react';
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

// Feature Card Component
interface FeatureCardProps {
  feature: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    delay: number;
  };
  index: number;
  featuresInView: boolean;
}

// Mineral Card Component
interface MineralCardProps {
  mineral: {
    name: string;
    benefits: string;
    delay: number;
    gradient: string;
    particleColor: string;
  };
  index: number;
  mineralsInView: boolean;
}

const MineralCard: React.FC<MineralCardProps> = ({ mineral, index, mineralsInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="mineral-card"
      style={{
        background: mineral.gradient,
        position: 'relative',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{
        opacity: mineralsInView ? 1 : 0,
        y: mineralsInView ? 0 : 30,
        scale: mineralsInView ? 1 : 0.9
      }}
      transition={{ delay: mineral.delay, duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        y: -10,
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating particles */}
      <motion.div
        className="mineral-particles"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: mineral.particleColor,
              borderRadius: '50%',
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: isHovered ? [-20, -40, -20] : [0],
              opacity: isHovered ? [0.8, 1, 0.8] : [0],
              scale: isHovered ? [1, 1.5, 1] : [0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="mineral-glow"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at center, ${mineral.particleColor}20 0%, transparent 70%)`,
          borderRadius: 'inherit',
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 0.9,
        }}
        transition={{ duration: 0.3 }}
      />

      <motion.h3
        className="mineral-name"
        animate={{
          color: isHovered ? '#ffffff' : 'inherit',
          textShadow: isHovered ? '0 2px 10px rgba(0,0,0,0.3)' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        {mineral.name}
      </motion.h3>
      <motion.p
        className="mineral-benefits"
        animate={{
          color: isHovered ? '#ffffff' : 'inherit',
          textShadow: isHovered ? '0 1px 5px rgba(0,0,0,0.3)' : 'none',
        }}
        transition={{ duration: 0.3 }}
      >
        {mineral.benefits}
      </motion.p>
    </motion.div>
  );
};

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index, featuresInView }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseXRelative = (e.clientX - centerX) / rect.width;
    const mouseYRelative = (e.clientY - centerY) / rect.height;

    setMouseX(mouseXRelative * 15); // Max 15 degrees tilt
    setMouseY(mouseYRelative * -15); // Inverted for natural feel
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseX(0);
    setMouseY(0);
  };

  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: featuresInView ? 1 : 0,
        y: featuresInView ? 0 : 50,
        scale: featuresInView ? 1 : 0.9,
        rotateX: mouseY,
        rotateY: mouseX,
      }}
      transition={{ delay: feature.delay, duration: 0.8, ease: "easeOut" }}
      whileHover={{
        scale: 1.08,
        y: -15,
        boxShadow: [
          "0 5px 15px rgba(73, 75, 51, 0.1)",
          "0 15px 35px rgba(73, 75, 51, 0.15)",
          "0 25px 50px rgba(73, 75, 51, 0.2)",
          "0 35px 65px rgba(73, 75, 51, 0.25)"
        ].join(', '),
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        '--card-index': index,
      } as any}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="feature-card-inner"
        animate={{
          rotateX: mouseY * 0.5,
          rotateY: mouseX * 0.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          className="feature-icon"
          animate={{
            rotateX: mouseY * 0.3,
            rotateY: mouseX * 0.3,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          style={{
            transform: `translateZ(${isHovered ? '20px' : '0px'})`,
          }}
        >
          <img
            src={feature.image}
            alt={feature.imageAlt}
            className="feature-image"
          />
          <motion.div
            className="feature-glow"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <motion.h3
          style={{
            transform: `translateZ(${isHovered ? '15px' : '0px'})`,
          }}
          transition={{ duration: 0.3 }}
        >
          {feature.title}
        </motion.h3>
        <motion.p
          style={{
            transform: `translateZ(${isHovered ? '10px' : '0px'})`,
          }}
          transition={{ duration: 0.3 }}
        >
          {feature.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  
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
  

  // Track initial page load
  useEffect(() => {
    trackPageView('Mineralcraft Landing Page');
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


  return (
    <div className="app">

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
        
        {/* Hero Logo - Integrated into Hero */}
        <motion.div
          className="hero-logo"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/images/products/updated logo.webp"
            alt="Mineralcraft"
            className="mineralcraft-logo"
          />
        </motion.div>

        {/* Promotional Text - Simple Scrolling */}
        <motion.div
          className="promo-banner"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <div className="promo-banner-content">
            <div
              className="promo-text"
              onClick={() => {
                trackEvent('Promo_Banner_Click', 'Promotion', 'LAUNCH Code Banner');
                window.open('https://shop.app/checkout/82707906868/cn/hWN1OYjQsyU7yI5py65ncD8a/shoppay?_cs=3.AMPS&authorization=cGVFWXlJNW42TGpDMCtueWxxME9YMy9lbCt0V252a3h1Mkd2UmdHNDMzMEY1RGlEbVFWYm80cUpPWnY2VVFPNVllT2l4dlR3TW5PQ1MveUlIc1VGbkhpelVTZ3hFRk1hRUFtODhTSUkxUitoWFlubjlMekdZTUR6eGtoTUM0Y2ZaTkUyVEw5TGpnUlNOVExFaXdaVFgzRWZNMU51dzZORDJ0YWdXaTZGKzZBQnNvbzZFVlBUSkpXcEJuYjRZZnBTLS01OXdVK0dPVzl0OFQ3eDNvelJuWDNRPT0%3D--03538a3dd38f0f0e9f688ac50cc8360c171d62e5&discount_code=LAUNCH&preview_theme_id=167526138164&redirect_source=checkout_automatic_redirect&tracking_unique=1d7c29f8-1a25-4bec-921e-b76a5725034e&tracking_visit=0423dd0f-2e03-44a9-bea6-f29c2c9009c', '_blank', 'noopener,noreferrer');
              }}
              style={{ cursor: 'pointer' }}
            >
              Use code 'LAUNCH' for 20% OFF ✨ Use code 'LAUNCH' for 20% OFF ✨ Use code 'LAUNCH' for 20% OFF ✨
            </div>
          </div>
        </motion.div>

        <div className="hero-content">
          
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: heroInView ? 0 : 100, opacity: heroInView ? 1 : 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          >
            Elevate your water
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
            alt="Mineralcraft Premium Sparkling Water - Transform Your Bubbles"
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
              title: "Exceptional taste",
              description: "Inspired by nature's most renowned mineral springs, savour the crisp, refreshing taste of premium water crafted at home.",
              delay: 0.3
            },
            {
              image: "/images/features/2.png",
              imageAlt: "Majestic mountain peaks - essential minerals",
              title: "Much more than bubbles",
              description: "Infused with essential minerals like calcium, magnesium and potassium - supporting hydration, bone health and sustained energy.",
              delay: 0.5
            },
            {
              image: "/images/features/3.png",
              imageAlt: "Misty mountain landscape - luxurious hydration ritual",
              title: "A luxurious hydration ritual",
              description: "Bring your water to life and bathe every cell in your body with mineral-rich bubbles.",
              delay: 0.7
            },
            {
              image: "/images/features/sustainable-smart.webp",
              imageAlt: "Lush forest and river - sustainable smart choice",
              title: "Sustainable & smarter",
              description: "No plastic waste, no shipping water across the planet, no water table degradation.",
              delay: 0.9
            }
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              featuresInView={featuresInView}
            />
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
            <motion.div
              className="step-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: stepsInView ? 1 : 0, y: stepsInView ? 0 : 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="step-icon">
                <Utensils size={28} />
              </div>
              <h3 className="step-title">Step 1</h3>
              <p className="step-description">Add a measured scoop of Mineralcraft to your water depending on your preferred taste.</p>
            </motion.div>

            <motion.div
              className="step-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: stepsInView ? 1 : 0, y: stepsInView ? 0 : 20 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="step-icon">
                <Container size={28} />
              </div>
              <h3 className="step-title">Step 2</h3>
              <p className="step-description">Carbonate to dissolve the minerals and gently mix the flavours.</p>
            </motion.div>
            
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
              Makes over 25 litres
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
              Love it or your money back
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
              delay: 0.3,
              gradient: "linear-gradient(135deg, #e8f4fd 0%, #b3d9f2 50%, #7bb3db 100%)",
              particleColor: "#b3d9f2"
            },
            {
              name: "Potassium",
              benefits: "Enhances hydration - energy - athletic performance.",
              delay: 0.4,
              gradient: "linear-gradient(135deg, #fff2d6 0%, #ffd93d 50%, #ff8500 100%)",
              particleColor: "#ffd93d"
            },
            {
              name: "Magnesium",
              benefits: "Aids digestion - circulation - sleep - cellular function.",
              delay: 0.5,
              gradient: "linear-gradient(135deg, #d4f1d4 0%, #7fb069 50%, #2d5a27 100%)",
              particleColor: "#7fb069"
            },
            {
              name: "Sodium",
              benefits: "For fluid balance - nerve and muscle function.",
              delay: 0.6,
              gradient: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #adb5bd 100%)",
              particleColor: "#e9ecef"
            }
          ].map((mineral, index) => (
            <MineralCard
              key={index}
              mineral={mineral}
              index={index}
              mineralsInView={mineralsInView}
            />
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
          Frequently asked questions
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

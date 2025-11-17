import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import './style.css'
import { BasicTooltip } from './components/BasicTooltip'
import CodeEditor from './components/CodeEditor'
import ParticleSystem from './components/ParticleSystem'
import SkillProgressBar from './components/SkillProgressBar'

function App() {
  const [displayedText, setDisplayedText] = useState('')
  const [showCaret, setShowCaret] = useState(true)
  const [counter, setCounter] = useState(0)
  const [counterScale, setCounterScale] = useState(1)
  const [buttonZap, setButtonZap] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [selectedColor, setSelectedColor] = useState('#84cc16')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [htmlTitle, setHtmlTitle] = useState('My Web Page')
  const [htmlContent, setHtmlContent] = useState('Hello, World!')
  const [selectedTag, setSelectedTag] = useState('h1')
  const [cssFontSize, setCssFontSize] = useState(24)
  const [cssColor, setCssColor] = useState('#3b82f6')
  const [cssBackground, setCssBackground] = useState('#1f2937')
  const [cssBorderRadius, setCssBorderRadius] = useState(8)
  const [deploymentVisible, setDeploymentVisible] = useState(false)
  const [editorCode, setEditorCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Interactive Web Page</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        button:hover {
            background: #764ba2;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Web Development!</h1>
        <p>This is an interactive example you can edit and see live results.</p>
        <button onclick="changeColor()">Click me!</button>
        <p id="message">Edit the code to see changes!</p>
    </div>
    
    <script>
        function changeColor() {
            const message = document.getElementById('message');
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            message.style.color = randomColor;
            message.textContent = 'Great! You clicked the button!';
        }
    </script>
</body>
</html>`)
  const fullText = '<html>'

  // Scroll progress and section refs
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const section1Ref = useRef(null)
  const section2Ref = useRef(null)
  const section3Ref = useRef(null)
  const section4Ref = useRef(null)
  const section5Ref = useRef(null)
  
  const section1InView = useInView(section1Ref, { once: true, margin: "-100px" })
  const section2InView = useInView(section2Ref, { once: true, margin: "-100px" })
  const section3InView = useInView(section3Ref, { once: true, margin: "-100px" })
  const section4InView = useInView(section4Ref, { once: true, margin: "-100px" })
  const section5InView = useInView(section5Ref, { once: true, margin: "-100px" })

  // Typing animation for <html>
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [])

  // Blinking caret (faster)
  useEffect(() => {
    const caretInterval = setInterval(() => {
      setShowCaret(prev => !prev)
    }, 300) // Blink speed: 300ms (faster)

    return () => clearInterval(caretInterval)
  }, [])


  // Deployment section animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDeploymentVisible(true)
    }, 500) // Show deployment elements after 0.5 seconds

    return () => clearTimeout(timer)
  }, [])

  // Counter click handler with enhanced animations
  const handleCounterClick = () => {
    setCounter(prev => prev + 1)
    
    // Scale animation for counter
    setCounterScale(1.3)
    setTimeout(() => {
      setCounterScale(1)
    }, 200)
    
    // Zap animation for button
    setButtonZap(true)
    setTimeout(() => {
      setButtonZap(false)
    }, 150)
  }

  // Restart journey function
  const handleRestartJourney = () => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Reset all states
    setTimeout(() => {
      setDisplayedText('')
      setShowCaret(true)
      setCounter(0)
      setCounterScale(1)
      setButtonZap(false)
      setTextInput('')
      setSelectedColor('#84cc16')
      setIsDarkMode(false)
      setHtmlTitle('My Web Page')
      setHtmlContent('Hello, World!')
      setSelectedTag('h1')
      setCssFontSize(24)
      setCssColor('#3b82f6')
      setCssBackground('#1f2937')
      setCssBorderRadius(8)
      setDeploymentVisible(false)
    }, 500) // Wait for scroll to complete
  }

  // New interactive handlers
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value)
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(e.target.value)
  }

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // HTML handlers
  const handleHtmlTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHtmlTitle(e.target.value)
  }

  const handleHtmlContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHtmlContent(e.target.value)
  }

  const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTag(e.target.value)
  }

  // CSS handlers
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCssFontSize(Number(e.target.value))
  }

  const handleCssColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCssColor(e.target.value)
  }

  const handleCssBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCssBackground(e.target.value)
  }

  const handleBorderRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCssBorderRadius(Number(e.target.value))
  }



  return (
    <div style={{
      height: '100vh',
      overflowY: 'scroll',
      scrollSnapType: 'y proximity',
      position: 'relative'
    }}>
      {/* Particle System Background */}
      <ParticleSystem />
      
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)',
          transformOrigin: '0%',
          zIndex: 1002,
          width: progressWidth
        }}
      />
      
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 1001,
        padding: '1rem 2rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <a href="#intro" className="mobile-hidden nav-link" style={{
            color: '#d1d5db !important',
            textDecoration: 'none !important',
            fontFamily: 'Inter, sans-serif !important',
            fontSize: '0.9rem !important',
            padding: '0.5rem 1rem !important',
            borderRadius: '4px !important',
            transition: 'all 0.3s ease !important',
            background: 'transparent !important',
            transform: 'none !important'
          }}>Intro</a>
          <a href="#html" className="mobile-hidden nav-link" style={{
            color: '#d1d5db !important',
            textDecoration: 'none !important',
            fontFamily: 'Inter, sans-serif !important',
            fontSize: '0.9rem !important',
            padding: '0.5rem 1rem !important',
            borderRadius: '4px !important',
            transition: 'all 0.3s ease !important',
            background: 'transparent !important',
            transform: 'none !important'
          }}>HTML</a>
          <a href="#css" className="mobile-hidden nav-link" style={{
            color: '#d1d5db !important',
            textDecoration: 'none !important',
            fontFamily: 'Inter, sans-serif !important',
            fontSize: '0.9rem !important',
            padding: '0.5rem 1rem !important',
            borderRadius: '4px !important',
            transition: 'all 0.3s ease !important',
            background: 'transparent !important',
            transform: 'none !important'
          }}>CSS</a>
          <a href="#javascript" className="mobile-hidden nav-link" style={{
            color: '#d1d5db !important',
            textDecoration: 'none !important',
            fontFamily: 'Inter, sans-serif !important',
            fontSize: '0.9rem !important',
            padding: '0.5rem 1rem !important',
            borderRadius: '4px !important',
            transition: 'all 0.3s ease !important',
            background: 'transparent !important',
            transform: 'none !important'
          }}>JavaScript</a>
          <a href="#deployment" className="mobile-hidden nav-link" style={{
            color: '#d1d5db !important',
            textDecoration: 'none !important',
            fontFamily: 'Inter, sans-serif !important',
            fontSize: '0.9rem !important',
            padding: '0.5rem 1rem !important',
            borderRadius: '4px !important',
            transition: 'all 0.3s ease !important',
            background: 'transparent !important',
            transform: 'none !important'
          }}>Deployment</a>
          <a href="#creator" className="mobile-hidden nav-link" style={{
            color: '#d1d5db !important',
            textDecoration: 'none !important',
            fontFamily: 'Inter, sans-serif !important',
            fontSize: '0.9rem !important',
            padding: '0.5rem 1rem !important',
            borderRadius: '4px !important',
            transition: 'all 0.3s ease !important',
            background: 'transparent !important',
            transform: 'none !important'
          }}>Creator</a>
          
          {/* Hamburger Menu Button */}
          <button 
            className="hamburger desktop-hidden"
            onClick={() => {
              const mobileNav = document.querySelector('.mobile-nav');
              if (mobileNav) {
                mobileNav.classList.toggle('active');
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#d1d5db',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.5rem',
              transition: 'color 0.3s ease'
            }}
          >
            ☰
          </button>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className="mobile-nav" style={{
          display: 'none',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'rgba(0, 0, 0, 0.98)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem 0',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          <a href="#intro" style={{
            display: 'block',
            padding: '0.75rem 2rem',
            textAlign: 'center',
            color: '#d1d5db',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease'
          }}>Intro</a>
          <a href="#html" style={{
            display: 'block',
            padding: '0.75rem 2rem',
            textAlign: 'center',
            color: '#d1d5db',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease'
          }}>HTML</a>
          <a href="#css" style={{
            display: 'block',
            padding: '0.75rem 2rem',
            textAlign: 'center',
            color: '#d1d5db',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease'
          }}>CSS</a>
          <a href="#javascript" style={{
            display: 'block',
            padding: '0.75rem 2rem',
            textAlign: 'center',
            color: '#d1d5db',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease'
          }}>JavaScript</a>
          <a href="#deployment" style={{
            display: 'block',
            padding: '0.75rem 2rem',
            textAlign: 'center',
            color: '#d1d5db',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease'
          }}>Deployment</a>
          <a href="#creator" style={{
            display: 'block',
            padding: '0.75rem 2rem',
            textAlign: 'center',
            color: '#d1d5db',
            textDecoration: 'none',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem',
            transition: 'all 0.3s ease'
          }}>Creator</a>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: progressWidth,
          height: '4px',
          background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
          boxShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4',
          zIndex: 1000
        }}
      />
      
      {/* Enhanced Hero Section */}
      <section id="intro" style={{
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #111827 50%, #1f2937 100%)',
        padding: '6rem 2rem 2rem 2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glassmorphism Hero Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateX: 45 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          whileHover={{ 
            scale: 1.02, 
            rotateX: 5, 
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '24px',
            padding: '3rem',
            maxWidth: '900px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          {/* Glitch Effect Title */}
          <motion.h1 
            className="glitch-text"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: '3.5rem',
              fontFamily: 'Orbitron, sans-serif',
              background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6, #ec4899)',
              backgroundSize: '400% 400%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'gradientShift 3s ease infinite, textGlow 2s ease-in-out infinite alternate',
              textAlign: 'center',
              marginBottom: '2rem',
              lineHeight: '1.1',
              textShadow: '0 0 30px rgba(59, 130, 246, 0.5)'
            }}
          >
            Web Development
            <br />
            <span style={{ fontSize: '2.5rem', opacity: 0.9 }}>Anatomy</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: '1.3rem',
              fontFamily: 'Inter, sans-serif',
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              maxWidth: '700px',
              lineHeight: '1.7',
              marginBottom: '3rem'
            }}
          >
            Dive deep into the building blocks of modern web development. 
            Explore HTML, CSS, and JavaScript through interactive examples and live code editing.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('html')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              Start Learning
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(139, 92, 246, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                border: '2px solid rgba(139, 92, 246, 0.5)',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
            >
              Try Playground
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: '2px',
              height: '30px',
              background: 'linear-gradient(to bottom, #3b82f6, transparent)',
              borderRadius: '1px'
            }}
          />
        </motion.div>
      </section>

      {/* Skills Showcase Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)',
          padding: '6rem 2rem'
        }}
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontSize: '3rem',
            fontFamily: 'Orbitron, sans-serif',
            background: 'linear-gradient(45deg, #06b6d4, #8b5cf6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            marginBottom: '3rem'
          }}
        >
          Technology Stack
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          width: '100%'
        }}>
          <SkillProgressBar
            skill="HTML5"
            percentage={95}
            icon="fab fa-html5"
            color="#e34c26"
            delay={0.2}
          />
          <SkillProgressBar
            skill="CSS3"
            percentage={90}
            icon="fab fa-css3-alt"
            color="#1572b6"
            delay={0.4}
          />
          <SkillProgressBar
            skill="JavaScript"
            percentage={88}
            icon="fab fa-js-square"
            color="#f7df1e"
            delay={0.6}
          />
          <SkillProgressBar
            skill="React"
            percentage={85}
            icon="fab fa-react"
            color="#61dafb"
            delay={0.8}
          />
          <SkillProgressBar
            skill="TypeScript"
            percentage={82}
            icon="fas fa-code"
            color="#3178c6"
            delay={1.0}
          />
          <SkillProgressBar
            skill="Node.js"
            percentage={80}
            icon="fab fa-node-js"
            color="#339933"
            delay={1.2}
          />
        </div>
      </motion.section>
        
        {/* Section 1: HTML Typing Animation */}
      <motion.section 
        ref={section1Ref}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={section1InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
        height: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #111827 50%, #1f2937 100%)'
      }}>
        <div style={{
          color: '#d1d5db',
          fontSize: '4rem',
          fontFamily: 'Fira Code, monospace',
          textShadow: '0 0 6px currentColor, 0 0 12px currentColor'
        }}>
          {displayedText}
          <span style={{
            opacity: showCaret ? 1 : 0,
            animation: 'blink 1s infinite'
          }}>|</span>
        </div>
      </motion.section>

      {/* Section 2: HTML Structure */}
      <motion.section 
        ref={section2Ref}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={section2InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
          alignItems: 'flex-start',
        justifyContent: 'center',
          background: 'linear-gradient(135deg, #111827 0%, #581c87 50%, #7c3aed 100%)',
          paddingTop: '2rem',
          paddingBottom: '2rem'
      }}>
        <div style={{
          color: '#f9fafb',
          fontFamily: 'Fira Code, monospace',
          textAlign: 'center',
          maxWidth: '1200px',
          width: '100%',
          padding: '1rem 2rem 2rem 2rem'
        }}>
          <BasicTooltip content="HTML (HyperText Markup Language) structures web content with tags.">
            <h2 style={{
              fontSize: '2rem',
              fontFamily: 'Orbitron, sans-serif',
              marginTop: '2rem',
              marginBottom: '3rem',
                color: '#a78bfa',
                textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
              cursor: 'help',
              textAlign: 'center',
              width: '100%'
            }}>
              HTML Structure
            </h2>
          </BasicTooltip>

          {/* HTML Code Display */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left',
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.9rem',
            color: '#e5e7eb'
          }}>
            <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>// HTML Structure</div>
            <div style={{ color: '#a78bfa' }}>&lt;!DOCTYPE html&gt;</div>
            <div style={{ color: '#a78bfa' }}>&lt;html&gt;</div>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;&lt;head&gt;</div>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;</div><span style={{ color: '#34d399' }}>{htmlTitle}</span><div style={{ color: '#a78bfa', display: 'inline' }}>&lt;/title&gt;</div>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;&lt;/head&gt;</div>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;&lt;body&gt;</div>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;&nbsp;&nbsp;&lt;</div><span style={{ color: '#34d399' }}>{selectedTag}</span><div style={{ color: '#a78bfa', display: 'inline' }}>&gt;</div><span style={{ color: '#34d399' }}>{htmlContent}</span><div style={{ color: '#a78bfa', display: 'inline' }}>&lt;/</div><span style={{ color: '#34d399' }}>{selectedTag}</span><div style={{ color: '#a78bfa', display: 'inline' }}>&gt;</div>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;&lt;/body&gt;</div>
            <div style={{ color: '#a78bfa' }}>&lt;/html&gt;</div>
          </div>

          {/* Interactive HTML Elements */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Title Input */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Page Title</h3>
              <BasicTooltip content="The &lt;title&gt; tag sets the browser tab title.">
                <input
                  type="text"
                  value={htmlTitle}
                  onChange={handleHtmlTitleChange}
                  placeholder="Enter page title..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #374151',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#f9fafb',
                    fontSize: '1rem',
                    fontFamily: 'Fira Code, monospace',
                    marginBottom: '1rem'
                  }}
                />
              </BasicTooltip>
              <div style={{
                fontSize: '0.9rem',
                color: '#c4b5fd',
                fontFamily: 'Fira Code, monospace'
              }}>
                &lt;title&gt;{htmlTitle}&lt;/title&gt;
              </div>
            </div>

            {/* Content Input */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Content</h3>
              <BasicTooltip content="The content inside HTML tags.">
                <input
                  type="text"
                  value={htmlContent}
                  onChange={handleHtmlContentChange}
                  placeholder="Enter content..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #374151',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#f9fafb',
                    fontSize: '1rem',
                    fontFamily: 'Fira Code, monospace',
                    marginBottom: '1rem'
                  }}
                />
              </BasicTooltip>
              <div style={{
                fontSize: '0.9rem',
                color: '#c4b5fd',
                fontFamily: 'Fira Code, monospace'
              }}>
                &lt;{selectedTag}&gt;{htmlContent}&lt;/{selectedTag}&gt;
              </div>
            </div>

            {/* Tag Selector */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#a78bfa', marginBottom: '1rem' }}>HTML Tag</h3>
              <BasicTooltip content="Different HTML tags have different purposes.">
                <select
                  value={selectedTag}
                  onChange={handleTagChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #374151',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#f9fafb',
                    fontSize: '1rem',
                    fontFamily: 'Fira Code, monospace',
                    marginBottom: '1rem'
                  }}
                >
                  <option value="h1">h1 - Main Heading</option>
                  <option value="h2">h2 - Sub Heading</option>
                  <option value="p">p - Paragraph</option>
                  <option value="div">div - Container</option>
                  <option value="span">span - Inline</option>
                  <option value="button">button - Clickable</option>
                </select>
              </BasicTooltip>
              <div style={{
                fontSize: '0.9rem',
                color: '#c4b5fd',
                fontFamily: 'Fira Code, monospace'
              }}>
                Selected: &lt;{selectedTag}&gt;
              </div>
            </div>

            {/* Live Preview */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#a78bfa', marginBottom: '1rem' }}>Live Preview</h3>
              <BasicTooltip content="This shows how your HTML will look in a browser.">
                <div style={{
                  background: '#ffffff',
                  color: '#000000',
                  padding: '1rem',
                  borderRadius: '8px',
                  minHeight: '100px',
                  border: '2px solid #374151',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>
                    Browser Tab: {htmlTitle}
                  </div>
                  {selectedTag === 'h1' && <h1 style={{ margin: 0, fontSize: '2rem' }}>{htmlContent}</h1>}
                  {selectedTag === 'h2' && <h2 style={{ margin: 0, fontSize: '1.5rem' }}>{htmlContent}</h2>}
                  {selectedTag === 'p' && <p style={{ margin: 0 }}>{htmlContent}</p>}
                  {selectedTag === 'div' && <div style={{ margin: 0, padding: '0.5rem', border: '1px dashed #ccc' }}>{htmlContent}</div>}
                  {selectedTag === 'span' && <span style={{ margin: 0, backgroundColor: '#f0f0f0', padding: '0.2rem' }}>{htmlContent}</span>}
                  {selectedTag === 'button' && <button style={{ margin: 0, padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>{htmlContent}</button>}
                </div>
              </BasicTooltip>
            </div>
            </div>
        </div>
      </motion.section>

      {/* Section 3: CSS Section */}
      <motion.section 
        ref={section3Ref}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={section3InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
          alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #6b21a8 100%)',
          paddingTop: '2rem',
          paddingBottom: '2rem'
      }}>
        <div style={{
          color: '#f9fafb',
          fontFamily: 'Fira Code, monospace',
          textAlign: 'center',
          maxWidth: '1200px',
          width: '100%',
          padding: '1rem 2rem 2rem 2rem'
        }}>
          <BasicTooltip content="CSS (Cascading Style Sheets) controls the visual appearance of web pages.">
            <h2 style={{
              fontSize: '2rem',
              fontFamily: 'Orbitron, sans-serif',
              marginTop: '2rem',
              marginBottom: '3rem',
              color: '#2dd4bf',
              textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
              cursor: 'help',
              textAlign: 'center',
          width: '100%'
        }}>
              CSS Styling
            </h2>
          </BasicTooltip>

          {/* CSS Code Display */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left',
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.9rem',
            color: '#e5e7eb'
          }}>
            <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>// CSS Styles</div>
            <div style={{ color: '#34d399' }}>.my-element</div> <div style={{ color: '#a78bfa', display: 'inline' }}>{'{'}</div><br/>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;font-size:</div> <span style={{ color: '#fbbf24' }}>{cssFontSize}px</span>;<br/>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;color:</div> <span style={{ color: '#fbbf24' }}>{cssColor}</span>;<br/>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;background:</div> <span style={{ color: '#fbbf24' }}>{cssBackground}</span>;<br/>
            <div style={{ color: '#a78bfa' }}>&nbsp;&nbsp;border-radius:</div> <span style={{ color: '#fbbf24' }}>{cssBorderRadius}px</span>;<br/>
            <div style={{ color: '#a78bfa' }}>{'}'}</div>
          </div>

          {/* Interactive CSS Controls */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Font Size Control */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#2dd4bf', marginBottom: '1rem' }}>Font Size</h3>
              <BasicTooltip content="CSS controls the size of text.">
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={cssFontSize}
                  onChange={handleFontSizeChange}
                  style={{
                    width: '100%',
                    marginBottom: '1rem'
                  }}
                />
              </BasicTooltip>
              <div style={{
                fontSize: '1rem',
                color: '#60a5fa',
                fontFamily: 'Fira Code, monospace'
              }}>
                {cssFontSize}px
              </div>
            </div>

            {/* Color Control */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#2dd4bf', marginBottom: '1rem' }}>Text Color</h3>
              <BasicTooltip content="CSS controls the color of text.">
                <input
                  type="color"
                  value={cssColor}
                  onChange={handleCssColorChange}
                  style={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                  }}
                />
              </BasicTooltip>
              <div style={{
                fontSize: '1rem',
                color: '#60a5fa',
                fontFamily: 'Fira Code, monospace'
              }}>
                {cssColor}
              </div>
            </div>

            {/* Background Control */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#2dd4bf', marginBottom: '1rem' }}>Background</h3>
              <BasicTooltip content="CSS controls the background color.">
                <input
                  type="color"
                  value={cssBackground}
                  onChange={handleCssBackgroundChange}
                  style={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                  }}
                />
              </BasicTooltip>
              <div style={{
                fontSize: '1rem',
                color: '#60a5fa',
                fontFamily: 'Fira Code, monospace'
              }}>
                {cssBackground}
              </div>
            </div>

            {/* Border Radius Control */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#2dd4bf', marginBottom: '1rem' }}>Border Radius</h3>
              <BasicTooltip content="CSS controls the roundness of corners.">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={cssBorderRadius}
                  onChange={handleBorderRadiusChange}
                  style={{
                    width: '100%',
                    marginBottom: '1rem'
                  }}
                />
              </BasicTooltip>
              <div style={{
                fontSize: '1rem',
                color: '#60a5fa',
                fontFamily: 'Fira Code, monospace'
              }}>
                {cssBorderRadius}px
              </div>
            </div>
          </div>

          {/* Live CSS Preview */}
              <div style={{
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '2rem'
          }}>
            <h3 style={{ color: '#2dd4bf', marginBottom: '1.5rem' }}>Live Preview</h3>
            <BasicTooltip content="This shows how your CSS styles will look when applied.">
              <div style={{
                background: '#ffffff',
                color: '#000000',
                padding: '2rem',
                borderRadius: '8px',
                border: '2px solid #374151',
                fontFamily: 'Arial, sans-serif'
              }}>
                <div style={{
                  fontSize: `${cssFontSize}px`,
                  color: '#ffffff',
                  background: cssBackground,
                  borderRadius: `${cssBorderRadius}px`,
                  padding: '1rem',
                  margin: '1rem 0'
                }}>
                  This element shows your CSS styles in action!
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  marginTop: '1rem'
                }}>
                  Font Size: {cssFontSize}px | Color: {cssColor} | Background: {cssBackground} | Border Radius: {cssBorderRadius}px
                </div>
              </div>
            </BasicTooltip>
              </div>
        </div>
      </motion.section>

      {/* Section 4: JavaScript Section */}
      <motion.section 
        ref={section4Ref}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={section4InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
          alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #14532d 0%, #0f766e 50%, #0d9488 100%)',
          paddingTop: '2rem',
          paddingBottom: '2rem'
      }}>
        <div style={{
          color: '#f9fafb',
          fontFamily: 'Fira Code, monospace',
          textAlign: 'center',
          maxWidth: '1200px',
          width: '100%'
        }}>
          <BasicTooltip content="This section demonstrates JavaScript interactivity and dynamic content updates.">
          <h2 style={{
            fontSize: '2rem',
            fontFamily: 'Orbitron, sans-serif',
              marginTop: '2rem',
              marginBottom: '3rem',
            color: '#84cc16',
              textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
              cursor: 'help',
              textAlign: 'center',
              width: '100%'
          }}>
            JavaScript Section
          </h2>
          </BasicTooltip>

          {/* JavaScript Code Display */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'left',
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.9rem',
            color: '#e5e7eb'
          }}>
            <div style={{ color: '#fbbf24', marginBottom: '1rem' }}>// JavaScript Code</div>
            <div style={{ color: '#a78bfa' }}>const</div> <span style={{ color: '#34d399' }}>counter</span> = <span style={{ color: '#fbbf24' }}>0</span>;<br/>
            <div style={{ color: '#a78bfa' }}>const</div> <span style={{ color: '#34d399' }}>button</span> = <span style={{ color: '#fbbf24' }}>document</span>.<span style={{ color: '#60a5fa' }}>querySelector</span>(<span style={{ color: '#fbbf24' }}>'button'</span>);<br/>
            <br/>
            <span style={{ color: '#34d399' }}>button</span>.<span style={{ color: '#60a5fa' }}>addEventListener</span>(<span style={{ color: '#fbbf24' }}>'click'</span>, <span style={{ color: '#a78bfa' }}>function</span>() {'{'}<br/>
            &nbsp;&nbsp;<span style={{ color: '#34d399' }}>counter</span>++;<br/>
            &nbsp;&nbsp;<span style={{ color: '#34d399' }}>display</span>.<span style={{ color: '#60a5fa' }}>textContent</span> = <span style={{ color: '#34d399' }}>counter</span>;<br/>
            {'}'});
          </div>

          {/* Interactive Elements Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            {/* Counter Section */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#84cc16', marginBottom: '1rem' }}>Counter</h3>
              <BasicTooltip content="JavaScript makes elements interactive.">
          <button
            onClick={handleCounterClick}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              border: 'none',
              borderRadius: '25px',
              padding: '12px 24px',
              color: '#000',
              fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: buttonZap ? 'scale(1.1)' : 'scale(1)',
                    marginBottom: '1rem'
            }}
          >
            Click Me
          </button>
              </BasicTooltip>
              <BasicTooltip content="JS updates content dynamically.">
          <div style={{
                  fontSize: '2.5rem',
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 'bold',
            color: '#84cc16',
            textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
            transform: `scale(${counterScale})`,
                  transition: 'transform 0.2s ease-in-out',
                  cursor: 'help'
          }}>
            {counter}
                </div>
              </BasicTooltip>
            </div>

            {/* Text Input Section */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#84cc16', marginBottom: '1rem' }}>Text Input</h3>
              <BasicTooltip content="JavaScript handles user input in real-time.">
                <input
                  type="text"
                  value={textInput}
                  onChange={handleTextChange}
                  placeholder="Type something..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #374151',
                    background: 'rgba(0, 0, 0, 0.3)',
                    color: '#f9fafb',
                    fontSize: '1rem',
                    fontFamily: 'Fira Code, monospace',
                    marginBottom: '1rem'
                  }}
                />
              </BasicTooltip>
              <div style={{
                fontSize: '1.2rem',
                color: '#60a5fa',
                fontFamily: 'Fira Code, monospace',
                minHeight: '2rem'
              }}>
                {textInput || 'No input yet...'}
              </div>
            </div>

            {/* Color Picker Section */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#84cc16', marginBottom: '1rem' }}>Color Picker</h3>
              <BasicTooltip content="JavaScript can change colors dynamically.">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={handleColorChange}
                  style={{
                    width: '100%',
                    height: '50px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '1rem'
                  }}
                />
              </BasicTooltip>
              <div style={{
                fontSize: '1.2rem',
                color: selectedColor,
                fontFamily: 'Fira Code, monospace',
                textShadow: `0 0 10px ${selectedColor}`
              }}>
                Selected: {selectedColor}
              </div>
            </div>

            {/* Toggle Section */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.2)',
              border: '1px solid #374151',
              borderRadius: '12px',
              padding: '1.5rem'
            }}>
              <h3 style={{ color: '#84cc16', marginBottom: '1rem' }}>Toggle Switch</h3>
              <BasicTooltip content="JavaScript can toggle states and conditions.">
                <button
                  onClick={handleToggleDarkMode}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #374151',
                    background: isDarkMode ? '#1f2937' : '#f9fafb',
                    color: isDarkMode ? '#f9fafb' : '#1f2937',
                    fontSize: '1rem',
                    fontFamily: 'Fira Code, monospace',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginBottom: '1rem'
                  }}
                >
                  {isDarkMode ? '🌙 Dark Mode ON' : '☀️ Light Mode ON'}
                </button>
              </BasicTooltip>
              <div style={{
                fontSize: '1rem',
                color: '#60a5fa',
                fontFamily: 'Fira Code, monospace'
              }}>
                Mode: {isDarkMode ? 'Dark' : 'Light'}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 5: Deployment Showcase */}
      <motion.section 
        ref={section5Ref}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={section5InView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
          alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #312e81 100%)',
        position: 'relative',
          overflow: 'hidden',
          paddingTop: '2rem',
          paddingBottom: '2rem'
      }}>
        {/* Animated Stars Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(2px 2px at 20px 30px, #00ffff, transparent),
            radial-gradient(2px 2px at 40px 70px, #ff00ff, transparent),
            radial-gradient(1px 1px at 90px 40px, #ffffff, transparent),
            radial-gradient(1px 1px at 130px 80px, #00ffff, transparent),
            radial-gradient(2px 2px at 160px 30px, #ff00ff, transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px',
          animation: 'twinkle 3s ease-in-out infinite alternate'
        }} />
        
        <div style={{
          color: '#f9fafb',
          fontFamily: 'Fira Code, monospace',
          textAlign: 'center',
          zIndex: 1,
          opacity: deploymentVisible ? 1 : 0,
          transform: deploymentVisible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'all 1s ease-out',
          maxWidth: '1200px',
          width: '100%',
          padding: '2rem'
        }}>
          {/* Deployment Header */}
          <div style={{
            fontSize: '2rem',
            fontFamily: 'Orbitron, sans-serif',
            color: '#38bdf8',
            textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
            fontWeight: 'bold',
            marginBottom: '2rem'
          }}>
            🚀 Deployed to the Web ✨
          </div>
          
          {/* Complete Website Preview */}
          <div style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '2rem',
            margin: '0 auto 2rem',
            boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)',
            border: '2px solid #38bdf8',
            maxWidth: '800px',
            fontFamily: 'Arial, sans-serif',
            color: '#000000'
          }}>
            {/* Browser Header */}
            <div style={{
              background: '#f0f0f0',
              padding: '0.5rem 1rem',
              borderRadius: '8px 8px 0 0',
              borderBottom: '1px solid #ddd',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f57' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#28ca42' }}></div>
            <div style={{
                background: '#fff', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '4px', 
              fontSize: '0.8rem',
                color: '#666',
                marginLeft: '1rem'
              }}>
                {htmlTitle}
              </div>
            </div>

            {/* Website Content */}
            <div style={{ padding: '1rem' }}>
              {/* H1 Heading */}
              <h1 style={{
                fontSize: '2.5rem',
                color: cssColor,
                marginBottom: '1.5rem',
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 6px currentColor'
              }}>
                {htmlContent}
              </h1>

              {/* Styled Container */}
              <div style={{
                background: cssBackground,
                padding: '1.5rem',
                borderRadius: `${cssBorderRadius}px`,
                marginBottom: '2rem',
                color: '#ffffff'
              }}>
                {/* Paragraph */}
                <p style={{
                  fontSize: `${cssFontSize}px`,
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  This is a styled paragraph with custom CSS properties applied. The font size, colors, and styling are all controlled by CSS.
                </p>

                {/* List */}
                <ul style={{
                  fontSize: `${cssFontSize}px`,
                  paddingLeft: '1.5rem'
                }}>
                  <li style={{ marginBottom: '0.5rem' }}>HTML structures the content</li>
                  <li style={{ marginBottom: '0.5rem' }}>CSS styles the appearance</li>
                  <li style={{ marginBottom: '0.5rem' }}>JavaScript adds interactivity</li>
                </ul>
              </div>

              {/* Interactive Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleCounterClick}
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    border: 'none',
                    borderRadius: '25px',
                    padding: '12px 24px',
                    color: '#000',
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: buttonZap ? 'scale(1.1)' : 'scale(1)',
                    marginBottom: '1rem'
                  }}
                >
                  Click Me
                </button>
                
                {/* Counter Display */}
                <div style={{
                  fontSize: '3rem',
                  fontFamily: 'Orbitron, sans-serif',
                  fontWeight: 'bold',
                  color: '#84cc16',
                  textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
                  transform: `scale(${counterScale})`,
                  transition: 'transform 0.2s ease-in-out'
                }}>
                  {counter}
                </div>
              </div>
            </div>
          </div>
          
          {/* Technology Stack */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid #374151',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            maxWidth: '800px',
            margin: '0 auto 2rem'
          }}>
            <h3 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Technologies Used:</h3>
          <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              fontSize: '0.9rem'
            }}>
              <div style={{ color: '#a78bfa' }}>🔧 HTML - Structure</div>
              <div style={{ color: '#2dd4bf' }}>🎨 CSS - Styling</div>
              <div style={{ color: '#84cc16' }}>⚡ JavaScript - Interactivity</div>
              <div style={{ color: '#38bdf8' }}>☁️ Deployment - Live on Web</div>
          </div>
        </div>
          
          {/* Restart Journey Button */}
          <motion.button
            onClick={handleRestartJourney}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              border: '2px solid #06b6d4',
              borderRadius: '25px',
              padding: '12px 24px',
              color: 'white',
              fontSize: '1.1rem',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(6, 182, 212, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            Restart Journey 🚀
          </motion.button>
        </div>
      </motion.section>

      {/* HTML Section */}
      <section id="html" style={{
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #111827 0%, #581c87 50%, #7c3aed 100%)',
        padding: '6rem 2rem 2rem 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1000px',
          color: '#f9fafb'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: 'Orbitron, sans-serif',
            color: '#a78bfa',
            textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
            marginBottom: '2rem'
          }}>
            <i className="fas fa-file-code" style={{ marginRight: '0.5rem', color: '#00bcd4' }}></i>
            The Skeleton: HTML
          </h2>
          <p style={{
            fontSize: '1.2rem',
            fontFamily: 'Fira Code, monospace',
            color: '#d1d5db',
            lineHeight: '1.6',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            HTML (HyperText Markup Language) is the foundation of every webpage. Think of it as the skeleton that gives structure to your content. It uses tags to define different elements like headings, paragraphs, and links.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '1.5rem',
            margin: '2rem 0',
            textAlign: 'left'
          }}>
            <pre style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '1rem',
              color: '#e5e7eb',
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              <code>{`<h1>Hello World</h1>
<p>This is my first website.</p>
<a href="https://example.com">Visit Example</a>`}</code>
            </pre>
          </div>
          
          <p style={{
            fontSize: '1rem',
            fontFamily: 'Fira Code, monospace',
            color: '#c4b5fd',
            lineHeight: '1.6',
            textAlign: 'left'
          }}>
            This simple HTML creates a heading, a paragraph, and a clickable link. Each tag has a specific purpose and tells the browser how to display the content.
          </p>
        </div>
      </section>

      {/* CSS Section */}
      <section id="css" style={{
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #6b21a8 100%)',
        padding: '6rem 2rem 2rem 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1000px',
          color: '#f9fafb'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: 'Orbitron, sans-serif',
            color: '#2dd4bf',
            textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
            marginBottom: '2rem'
          }}>
            <i className="fas fa-paint-brush" style={{ marginRight: '0.5rem', color: '#ff9800' }}></i>
            The Style: CSS
          </h2>
          <p style={{
            fontSize: '1.2rem',
            fontFamily: 'Fira Code, monospace',
            color: '#d1d5db',
            lineHeight: '1.6',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            CSS (Cascading Style Sheets) is what makes websites beautiful. While HTML provides the structure, CSS controls the appearance - colors, fonts, spacing, and layout. It's like the paint and decoration for your HTML skeleton.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '1.5rem',
            margin: '2rem 0',
            textAlign: 'left'
          }}>
            <pre style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '1rem',
              color: '#e5e7eb',
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              <code>{`body {
  background-color: #121212;
  color: white;
  font-family: Arial, sans-serif;
}

h1 {
  color: #2dd4bf;
  text-align: center;
}`}</code>
            </pre>
          </div>
          
          <p style={{
            fontSize: '1rem',
            fontFamily: 'Fira Code, monospace',
            color: '#5eead4',
            lineHeight: '1.6',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            This CSS sets a dark background, white text, and styles the heading with a teal color. CSS selectors target HTML elements and apply styling rules.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '2rem'
          }}>
            <button 
              id="theme-toggle"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                color: '#000',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Toggle Dark/Light Mode
            </button>
            
            <button 
              id="font-toggle"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                border: 'none',
                borderRadius: '25px',
                padding: '12px 24px',
                color: '#fff',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Change Font
            </button>
          </div>
        </div>
      </section>

      {/* JavaScript Section */}
      <section id="javascript" style={{
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #14532d 0%, #0f766e 50%, #0d9488 100%)',
        padding: '6rem 2rem 2rem 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1000px',
          color: '#f9fafb'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: 'Orbitron, sans-serif',
            color: '#84cc16',
            textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
            marginBottom: '2rem'
          }}>
            <i className="fas fa-code" style={{ marginRight: '0.5rem', color: '#84cc16' }}></i>
            The Brains: JavaScript
          </h2>
          <p style={{
            fontSize: '1.2rem',
            fontFamily: 'Fira Code, monospace',
            color: '#d1d5db',
            lineHeight: '1.6',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            JavaScript is the interactive "brain" of your website. While HTML provides structure and CSS handles styling, JavaScript makes things happen - responding to clicks, updating content dynamically, and creating engaging user experiences.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '1.5rem',
            margin: '2rem 0',
            textAlign: 'left'
          }}>
            <pre style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '1rem',
              color: '#e5e7eb',
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              <code>{`document.getElementById("theme-toggle")
  .addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
  });`}</code>
            </pre>
          </div>
          
          <p style={{
            fontSize: '1rem',
            fontFamily: 'Fira Code, monospace',
            color: '#a3e635',
            lineHeight: '1.6',
            textAlign: 'left'
          }}>
            This JavaScript code listens for clicks on the theme toggle button and switches between light and dark modes by adding/removing a CSS class. JavaScript bridges the gap between user interaction and visual changes.
          </p>
        </div>
      </section>

      {/* Interactive Code Playground Section */}
      <motion.section
        id="playground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{
          minHeight: '100vh',
          scrollSnapAlign: 'start',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
          padding: '6rem 2rem'
        }}
      >
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontSize: '3rem',
            fontFamily: 'Orbitron, sans-serif',
            background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          <i className="fas fa-code" style={{ marginRight: '1rem', color: '#06b6d4' }}></i>
          Live Code Playground
        </motion.h2>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            fontSize: '1.2rem',
            color: 'rgba(255, 255, 255, 0.8)',
            textAlign: 'center',
            maxWidth: '800px',
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}
        >
          Experiment with HTML, CSS, and JavaScript in real-time. Edit the code and see your changes instantly!
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            width: '100%',
            maxWidth: '1400px',
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '1px',
            minHeight: '500px'
          }}
        >
          {/* Code Editor Panel */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              <i className="fas fa-code" style={{ marginRight: '0.5rem', color: '#06b6d4' }}></i>
              Code Editor
            </div>
            <div style={{ flex: 1 }}>
              <CodeEditor
                initialCode={editorCode}
                onChange={setEditorCode}
                theme="vs-dark"
                language="html"
                height="460px"
              />
            </div>
          </div>

          {/* Live Preview Panel */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.05)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              <i className="fas fa-eye" style={{ marginRight: '0.5rem', color: '#10b981' }}></i>
              Live Preview
            </div>
            <div style={{ flex: 1, position: 'relative' }}>
              <iframe
                srcDoc={editorCode}
                style={{
                  width: '100%',
                  height: '460px',
                  border: 'none',
                  background: 'white'
                }}
                sandbox="allow-scripts"
                title="Live Preview"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(6, 182, 212, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const helloWorldCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            background: linear-gradient(45deg, #667eea, #764ba2);
            margin: 0; 
            padding: 20px; 
            color: white;
            text-align: center;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container { 
            background: rgba(255,255,255,0.1); 
            padding: 2rem; 
            border-radius: 15px; 
            backdrop-filter: blur(10px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        h1 { margin: 0 0 1rem 0; font-size: 2.5rem; }
        p { margin: 0; font-size: 1.2rem; opacity: 0.9; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, World! 🌍</h1>
        <p>Welcome to web development!</p>
    </div>
</body>
</html>`;
              setEditorCode(helloWorldCode);
            }}
            style={{
              background: 'linear-gradient(45deg, #06b6d4, #0891b2)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Hello World
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(139, 92, 246, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const interactiveCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Demo</title>
    <style>
        body { 
            font-family: 'Segoe UI', sans-serif; 
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            margin: 0; 
            padding: 20px; 
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .card { 
            background: linear-gradient(135deg, #667eea, #764ba2);
            padding: 2.5rem; 
            border-radius: 20px; 
            text-align: center;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            transition: transform 0.3s ease;
        }
        .card:hover { transform: translateY(-10px) scale(1.02); }
        h2 { margin: 0 0 1rem 0; font-size: 2rem; }
        p { margin: 1rem 0; font-size: 1.1rem; transition: all 0.3s ease; }
        button { 
            background: linear-gradient(45deg, #ff6b6b, #ff5252); 
            color: white; 
            border: none; 
            padding: 15px 30px; 
            border-radius: 25px; 
            cursor: pointer; 
            font-size: 16px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }
        button:hover { 
            background: linear-gradient(45deg, #ff5252, #f44336); 
            transform: scale(1.05); 
            box-shadow: 0 8px 25px rgba(255, 107, 107, 0.6);
        }
        .magic { color: #ffd700; font-weight: bold; }
    </style>
</head>
<body>
    <div class="card">
        <h2>🎨 Interactive Card</h2>
        <p id="text">Click the button to see magic!</p>
        <button onclick="changeText()">Click Me!</button>
    </div>
    <script>
        function changeText() {
            const text = document.getElementById('text');
            const messages = [
                '✨ Amazing!', 
                '🚀 Fantastic!', 
                '🎉 Wonderful!', 
                '💫 Incredible!',
                '🌟 Brilliant!',
                '🎯 Perfect!'
            ];
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            text.innerHTML = '<span class="magic">' + randomMessage + '</span>';
            text.style.transform = 'scale(1.1)';
            setTimeout(() => {
                text.style.transform = 'scale(1)';
            }, 200);
        }
    </script>
</body>
</html>`;
              setEditorCode(interactiveCode);
            }}
            style={{
              background: 'linear-gradient(45deg, #8b5cf6, #7c3aed)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Interactive Demo
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(236, 72, 153, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const originalCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Interactive Web Page</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 500px;
        }
        h1 {
            color: #333;
            margin-bottom: 1rem;
        }
        button {
            background: #667eea;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
        }
        button:hover {
            background: #764ba2;
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to Web Development!</h1>
        <p>This is an interactive example you can edit and see live results.</p>
        <button onclick="changeColor()">Click me!</button>
        <p id="message">Edit the code to see changes!</p>
    </div>
    
    <script>
        function changeColor() {
            const message = document.getElementById('message');
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            message.style.color = randomColor;
            message.textContent = 'Great! You clicked the button!';
        }
    </script>
</body>
</html>`;
              setEditorCode(originalCode);
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s ease'
            }}
          >
            Reset Code
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Deployment Section */}
      <section id="deployment" style={{
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #000000 0%, #1e3a8a 50%, #312e81 100%)',
        padding: '6rem 2rem 2rem 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1000px',
          color: '#f9fafb'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: 'Orbitron, sans-serif',
            color: '#38bdf8',
            textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
            marginBottom: '2rem'
          }}>
            <i className="fas fa-cloud" style={{ marginRight: '0.5rem', color: '#38bdf8' }}></i>
            The Deployment
          </h2>
          <p style={{
            fontSize: '1.2rem',
            fontFamily: 'Fira Code, monospace',
            color: '#d1d5db',
            lineHeight: '1.6',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            Deployment is the process of putting your website online so anyone in the world can access it. It's like moving from your local development environment to a public space on the internet.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '1.5rem',
            margin: '2rem 0',
            textAlign: 'left'
          }}>
            <p style={{
              fontSize: '1rem',
              fontFamily: 'Fira Code, monospace',
              color: '#60a5fa',
              lineHeight: '1.6',
              margin: 0
            }}>
              <strong>GitHub:</strong> A platform for storing and sharing code. It's like a digital filing cabinet for your projects.<br/><br/>
              <strong>Vercel:</strong> A deployment platform that automatically builds and hosts your website. Connect your GitHub repository, and Vercel handles the rest!
            </p>
          </div>
          
          <p style={{
            fontSize: '1rem',
            fontFamily: 'Fira Code, monospace',
            color: '#93c5fd',
            lineHeight: '1.6',
            textAlign: 'left'
          }}>
            The magic happens when you push your code to GitHub, and Vercel automatically detects changes and updates your live website. It's like having a personal assistant that publishes your work instantly!
          </p>
        </div>
      </section>

      {/* Creator Section */}
      <section id="creator" style={{
        minHeight: '100vh',
        scrollSnapAlign: 'start',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #7c2d12 0%, #dc2626 50%, #ea580c 100%)',
        padding: '6rem 2rem 2rem 2rem'
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '1000px',
          color: '#f9fafb'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontFamily: 'Orbitron, sans-serif',
            color: '#f97316',
            textShadow: '0 0 6px currentColor, 0 0 12px currentColor',
            marginBottom: '2rem'
          }}>
            <i className="fas fa-user" style={{ marginRight: '0.5rem', color: '#a78bfa' }}></i>
            The Creator
          </h2>
          <p style={{
            fontSize: '1.2rem',
            fontFamily: 'Fira Code, monospace',
            color: '#d1d5db',
            lineHeight: '1.6',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            This website was created by a curious learner, exploring the fascinating world of web development step by step with Cursor. Every line of code, every animation, and every interaction was crafted to demonstrate how the three pillars of web development work together.
          </p>
          
          <div style={{
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid #374151',
            borderRadius: '8px',
            padding: '1.5rem',
            margin: '2rem 0',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '1.1rem',
              fontFamily: 'Orbitron, sans-serif',
              color: '#fed7aa',
              lineHeight: '1.6',
              margin: 0,
              fontStyle: 'italic'
            }}>
              "The journey is just beginning 🚀"
            </p>
          </div>
          
          <p style={{
            fontSize: '1rem',
            fontFamily: 'Fira Code, monospace',
            color: '#fdba74',
            lineHeight: '1.6',
            textAlign: 'left'
          }}>
            From the first blinking cursor to the final deployment, this project showcases the magic that happens when HTML, CSS, and JavaScript come together. Every website tells a story, and this one tells the story of learning, experimenting, and creating something amazing from scratch.
          </p>
        </div>
      </section>
    </div>
  )
}

export default App

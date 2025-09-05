import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import './style.css'
import { BasicTooltip } from './components/BasicTooltip'

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
      scrollSnapType: 'y proximity'
    }}>
      {/* Scroll Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: progressWidth,
          height: '4px',
          background: 'linear-gradient(90deg, #06b6d4, #3b82f6)',
          boxShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4',
          zIndex: 1000
        }}
      />
      
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
    </div>
  )
}

export default App

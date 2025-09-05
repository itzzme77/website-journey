import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  children: React.ReactNode
  content: string
  accentColor?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  accentColor = '#a78bfa',
  position = 'top' 
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const getTooltipStyles = () => {
    const baseStyles = {
      position: 'absolute' as const,
      zIndex: 50,
      padding: '0.75rem',
      fontSize: '0.875rem',
      color: '#f9fafb',
      backgroundColor: '#111',
      borderRadius: '0.5rem',
      boxShadow: `0 0 20px ${accentColor}40, 0 4px 12px rgba(0, 0, 0, 0.3)`,
      border: `1px solid ${accentColor}60`,
      whiteSpace: 'nowrap' as const,
      pointerEvents: 'none' as const
    }

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '0.5rem'
        }
      case 'bottom':
        return {
          ...baseStyles,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '0.5rem'
        }
      case 'left':
        return {
          ...baseStyles,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '0.5rem'
        }
      case 'right':
        return {
          ...baseStyles,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '0.5rem'
        }
      default:
        return {
          ...baseStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '0.5rem'
        }
    }
  }

  const getArrowStyles = () => {
    const baseArrowStyles = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      border: '4px solid transparent'
    }

    switch (position) {
      case 'top':
        return {
          ...baseArrowStyles,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderTopColor: accentColor + '60',
          borderBottomColor: 'transparent'
        }
      case 'bottom':
        return {
          ...baseArrowStyles,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderBottomColor: accentColor + '60',
          borderTopColor: 'transparent'
        }
      case 'left':
        return {
          ...baseArrowStyles,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderLeftColor: accentColor + '60',
          borderRightColor: 'transparent'
        }
      case 'right':
        return {
          ...baseArrowStyles,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          borderRightColor: accentColor + '60',
          borderLeftColor: 'transparent'
        }
      default:
        return {
          ...baseArrowStyles,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          borderTopColor: accentColor + '60',
          borderBottomColor: 'transparent'
        }
    }
  }

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ 
              opacity: 0, 
              scale: 0.8, 
              y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0, 
              x: position === 'left' ? 10 : position === 'right' ? -10 : 0 
            }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0, 
              x: position === 'left' ? 10 : position === 'right' ? -10 : 0 
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={getTooltipStyles()}
          >
            {content}
            <div style={getArrowStyles()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

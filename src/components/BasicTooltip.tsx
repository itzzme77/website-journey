import React, { useState } from 'react'

interface TooltipProps {
  children: React.ReactNode
  content: string
}

export const BasicTooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px 12px',
            backgroundColor: '#111',
            color: '#f9fafb',
            fontSize: '14px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            border: '1px solid #333',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}

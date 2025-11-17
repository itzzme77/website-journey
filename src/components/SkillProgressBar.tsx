import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SkillProgressBarProps {
  skill: string;
  percentage: number;
  color: string;
  icon: string;
  delay?: number;
}

const SkillProgressBar: React.FC<SkillProgressBarProps> = ({
  skill,
  percentage,
  color,
  icon,
  delay = 0
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, delay);

    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="skill-progress-container"
      style={{
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '16px',
        border: `1px solid ${color}40`,
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background glow effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${color}10, transparent)`,
          borderRadius: '16px'
        }}
      />
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: `linear-gradient(135deg, ${color}, ${color}80)`,
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 20px ${color}40`
          }}>
            <i className={icon} style={{ color: 'white', fontSize: '18px' }}></i>
          </div>
          <span style={{
            color: '#f9fafb',
            fontSize: '1.2rem',
            fontWeight: '600',
            fontFamily: 'Inter, sans-serif'
          }}>
            {skill}
          </span>
        </div>
        
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: (delay + 500) / 1000 }}
          style={{
            color: color,
            fontSize: '1.5rem',
            fontWeight: '700',
            fontFamily: 'Inter, sans-serif',
            textShadow: `0 0 10px ${color}80`
          }}
        >
          {animatedPercentage}%
        </motion.span>
      </div>

      <div style={{
        width: '100%',
        height: '8px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animatedPercentage}%` }}
          transition={{ 
            duration: 1.5, 
            delay: (delay + 300) / 1000,
            ease: "easeOut"
          }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            borderRadius: '4px',
            boxShadow: `0 0 10px ${color}60`,
            position: 'relative'
          }}
        >
          {/* Animated shine effect */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shine 2s ease-in-out infinite',
              animationDelay: `${delay + 1000}ms`
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillProgressBar;

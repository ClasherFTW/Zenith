import React from 'react';

interface ZenithLogoProps {
  className?: string;
  darkMode?: boolean;
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

const ZenithLogo: React.FC<ZenithLogoProps> = ({ 
  className = '', 
  darkMode = false,
  size = 'md',
  hideText = false
}) => {
  const sizeClasses = {
    sm: { container: 'h-8 w-8', text: 'text-xl' },
    md: { container: 'h-12 w-12', text: 'text-2xl' },
    lg: { container: 'h-16 w-16', text: 'text-3xl' }
  };

  const colors = {
    light: {
      primary: '#5D4037',
      secondary: '#8D6E63',
      background: '#EFEBE9',
      border: '#D7CCC8'
    },
    dark: {
      primary: '#D7CCC8',
      secondary: '#A1887F',
      background: '#3E2723',
      border: '#5D4037'
    }
  };

  const currentColors = darkMode ? colors.dark : colors.light;

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`relative ${sizeClasses[size].container}`}>
        <svg 
          className="w-full h-full"
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circle background with subtle gradient */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={darkMode ? '#3E2723' : '#F5F0ED'} />
              <stop offset="100%" stopColor={darkMode ? '#2A211F' : '#EFEBE9'} />
            </linearGradient>
          </defs>
          
          <circle 
            cx="50" 
            cy="50" 
            r="47" 
            fill="url(#logoGradient)"
            stroke={currentColors.border}
            strokeWidth="2"
          />
          
          {/* Z shape with subtle curve */}
          <path 
            d="M30 35 C35 25 65 25 70 35 L45 75 C40 85 35 85 30 75 Z" 
            fill="none"
            stroke={currentColors.primary} 
            strokeWidth="6" 
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Dot with subtle shadow */}
          <circle 
            cx="70" 
            cy="35" 
            r="5"
            fill={currentColors.secondary}
          >
            <animate 
              attributeName="r" 
              values="5;6;5" 
              dur="3s" 
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
      
      {!hideText && (
        <span className={`ml-3 font-bold tracking-tight ${currentColors.primary} ${sizeClasses[size].text}`}>
          Zenith
        </span>
      )}
    </div>
  );
};

export default ZenithLogo;

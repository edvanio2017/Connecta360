import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
}

export default function Logo({ variant = 'dark', className = '', showText = true }: LogoProps) {
  const colorClass = variant === 'light' ? 'text-white' : 'text-slate-900';
  const iconColor = variant === 'light' ? 'white' : 'black';
  const secondaryColor = variant === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.2)';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
        {/* Central Dot */}
        <circle cx="20" cy="20" r="5" fill={iconColor} />
        
        {/* Radiating Lines and Dots */}
        {/* Top */}
        <line x1="20" y1="20" x2="20" y2="8" stroke={secondaryColor} strokeWidth="1.5" />
        <circle cx="20" cy="8" r="3" fill={secondaryColor} />
        
        {/* Top Left */}
        <line x1="20" y1="20" x2="10" y2="12" stroke={secondaryColor} strokeWidth="1.5" />
        <circle cx="10" cy="12" r="3" fill={secondaryColor} />
        
        {/* Left */}
        <line x1="20" y1="20" x2="6" y2="20" stroke={secondaryColor} strokeWidth="1.5" />
        <circle cx="6" cy="20" r="3" fill={secondaryColor} />
        
        {/* Bottom Left */}
        <line x1="20" y1="20" x2="10" y2="30" stroke={secondaryColor} strokeWidth="1.5" />
        <circle cx="10" cy="30" r="3" fill={secondaryColor} />
        
        {/* Bottom */}
        <line x1="20" y1="20" x2="20" y2="34" stroke={secondaryColor} strokeWidth="1.5" />
        <circle cx="20" cy="34" r="3" fill={secondaryColor} />
        
        {/* Bottom Right */}
        <line x1="20" y1="20" x2="30" y2="28" stroke={secondaryColor} strokeWidth="1.5" />
        <circle cx="30" cy="28" r="3" fill={secondaryColor} />
        
        {/* Right */}
        <line x1="20" y1="20" x2="34" y2="20" stroke={secondaryColor} strokeWidth="1.5" />
        <circle cx="34" cy="20" r="3" fill={secondaryColor} />
      </svg>
      
      {showText && (
        <span className={`text-2xl font-bold tracking-tight ${colorClass}`}>
          Connecta<span className={variant === 'light' ? 'text-slate-400' : 'text-slate-500'}>360</span>
        </span>
      )}
    </div>
  );
}

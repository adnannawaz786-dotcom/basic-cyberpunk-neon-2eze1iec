import { cn } from '../lib/utils';

const NeonText = ({ 
  children, 
  className = '', 
  color = 'cyan', 
  size = 'md',
  glow = true,
  flicker = false,
  ...props 
}) => {
  const colorClasses = {
    cyan: 'text-cyan-400 shadow-cyan-400/50',
    pink: 'text-pink-400 shadow-pink-400/50',
    green: 'text-green-400 shadow-green-400/50',
    purple: 'text-purple-400 shadow-purple-400/50',
    blue: 'text-blue-400 shadow-blue-400/50',
    red: 'text-red-400 shadow-red-400/50',
    yellow: 'text-yellow-400 shadow-yellow-400/50',
    white: 'text-white shadow-white/50'
  };

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    '5xl': 'text-5xl',
    '6xl': 'text-6xl'
  };

  const glowStyles = glow ? {
    textShadow: `
      0 0 5px currentColor,
      0 0 10px currentColor,
      0 0 15px currentColor,
      0 0 20px currentColor
    `
  } : {};

  const flickerAnimation = flicker ? 'animate-pulse' : '';

  return (
    <span
      className={cn(
        'font-bold tracking-wider select-none',
        colorClasses[color] || colorClasses.cyan,
        sizeClasses[size] || sizeClasses.md,
        flickerAnimation,
        className
      )}
      style={glowStyles}
      {...props}
    >
      {children}
    </span>
  );
};

export default NeonText;
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';

const Home = () => {
  const [glitchText, setGlitchText] = useState('HELLO WORLD');
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const originalText = 'HELLO WORLD';

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      let iterations = 0;
      
      const glitchInterval = setInterval(() => {
        setGlitchText(prev => 
          prev.split('').map((char, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }).join('')
        );
        
        if (iterations >= originalText.length) {
          clearInterval(glitchInterval);
          setIsGlitching(false);
        }
        
        iterations += 1 / 3;
      }, 30);
      
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-purple-900/20" />
        <div 
          className="absolute inset-0 bg-repeat opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            animate={{
              x: [0, Math.random() * 1920],
              y: [0, Math.random() * 1080],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Glitch Text */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8"
        >
          <h1 
            className={`text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 font-mono tracking-wider ${
              isGlitching ? 'animate-pulse' : ''
            }`}
            style={{
              textShadow: `
                0 0 5px currentColor,
                0 0 10px currentColor,
                0 0 15px currentColor,
                0 0 20px #00ffff,
                0 0 35px #00ffff,
                0 0 40px #00ffff
              `
            }}
          >
            {glitchText}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-12"
        >
          <p className="text-cyan-300 text-lg md:text-xl lg:text-2xl font-mono tracking-wide opacity-80">
            {'> WELCOME TO THE NEON REALM_'}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-cyan-400"
            >
              |
            </motion.span>
          </p>
        </motion.div>

        {/* Neon Boxes */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl"
        >
          {[
            { title: 'SYSTEM', content: 'ONLINE', color: 'cyan' },
            { title: 'STATUS', content: 'ACTIVE', color: 'purple' },
            { title: 'MODE', content: 'NEON', color: 'pink' }
          ].map((box, index) => (
            <motion.div
              key={index}
              className={`
                border-2 border-${box.color}-500 bg-black/50 p-6 rounded-lg
                shadow-[0_0_20px_rgba(0,255,255,0.3)] backdrop-blur-sm
                hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] transition-all duration-300
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className={`text-${box.color}-400 font-mono text-sm mb-2 tracking-wider`}>
                {box.title}
              </h3>
              <p className={`text-${box.color}-300 font-mono text-lg font-bold`}>
                {box.content}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
        >
          <Button
            className="
              bg-gradient-to-r from-cyan-500 to-purple-600 
              hover:from-cyan-400 hover:to-purple-500
              text-black font-bold px-8 py-4 text-lg
              border-2 border-cyan-400
              shadow-[0_0_20px_rgba(0,255,255,0.5)]
              hover:shadow-[0_0_30px_rgba(0,255,255,0.8)]
              transition-all duration-300
              font-mono tracking-wider
            "
            size="lg"
          >
            ENTER THE MATRIX
          </Button>
        </motion.div>

        {/* Bottom Scanner Line */}
        <motion.div
          className="absolute bottom-10 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.div>

      {/* Corner Decorations */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>
    </div>
  );
};

export default Home;
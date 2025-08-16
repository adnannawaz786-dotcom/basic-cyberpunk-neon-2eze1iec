import React from 'react'
import { Button } from './components/ui/button'

function App() {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(cyan 1px, transparent 1px),
              linear-gradient(90deg, cyan 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        ></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Neon border container */}
        <div className="relative p-8 border border-cyan-500/50 bg-black/50 backdrop-blur-sm rounded-lg shadow-2xl">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 blur-sm"></div>
          
          {/* Content */}
          <div className="relative z-10 text-center space-y-6">
            {/* Main title */}
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              HELLO
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300 tracking-wider">
              WORLD
            </h2>
            
            {/* Decorative line */}
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
            
            {/* Description */}
            <p className="text-lg text-gray-300 max-w-md mx-auto leading-relaxed">
              Welcome to the <span className="text-cyan-400 font-semibold">cyberpunk</span> dimension where neon dreams come alive
            </p>
            
            {/* Interactive button */}
            <div className="pt-4">
              <Button 
                className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-lg border border-cyan-400/50 shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/50 hover:scale-105"
                onClick={() => {
                  // Create ripple effect
                  const button = document.activeElement;
                  const ripple = document.createElement('div');
                  ripple.className = 'absolute inset-0 bg-white/20 rounded-lg animate-ping';
                  button.style.position = 'relative';
                  button.appendChild(ripple);
                  setTimeout(() => ripple.remove(), 600);
                }}
              >
                ENTER THE MATRIX
              </Button>
            </div>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 text-cyan-400 text-sm font-mono opacity-60 animate-bounce">
          {'>'} SYSTEM_ONLINE
        </div>
        <div className="absolute bottom-20 right-10 text-purple-400 text-sm font-mono opacity-60 animate-bounce delay-500">
          NEURAL_LINK_ACTIVE {'<'}
        </div>
        <div className="absolute top-1/3 left-10 text-pink-400 text-sm font-mono opacity-60 animate-bounce delay-1000">
          {'['}CONNECTED{']'}
        </div>
      </div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60"
          style={{
            animation: 'scan 4s linear infinite'
          }}
        ></div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default App
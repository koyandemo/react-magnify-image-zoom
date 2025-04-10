import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ImageMagnifierProps {
  src: string;
  width?: string | number;
  height?: string | number;
  magnifierSize?: number;
  zoomLevel?: number;
  className?: string;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  width = "100%",
  height = "auto",
  magnifierSize = 150,
  zoomLevel = 2.5,
  className,
}) => {
  const [showMagnifier, setShowMagnifier] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const updateMagnifierPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate position ratio (0 to 1)
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    // Keep values between 0 and 1
    setMousePosition({
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    setShowMagnifier(true);
    updateMagnifierPosition(e);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    updateMagnifierPosition(e);
  };

  const handleTouchStart = () => {
    if (!isMobile) return;
    setShowMagnifier(!showMagnifier);
  };

  // Calculate magnifier position
  const magnifierOffset = magnifierSize / 2;
  
  // Calculate background position for the zoomed image
  const backgroundX = `${mousePosition.x * 100}%`;
  const backgroundY = `${mousePosition.y * 100}%`;

  return (
    <div 
      className={cn("relative inline-block", className)}
      style={{ width, height }}
    >
      <div
        className="relative w-full h-full cursor-crosshair"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleTouchStart}
      >
        <img
          ref={imageRef}
          src={src}
          alt="Magnifiable"
          className="w-full h-full object-contain"
        />
        
        {showMagnifier && (
          <div
            className={cn(
              "absolute rounded-full shadow-lg border border-gray-200 pointer-events-none z-10",
              "transition-opacity duration-200",
              isMobile ? "opacity-90 fixed inset-0 rounded-none border-0 bg-white" : "opacity-100"
            )}
            style={{
              width: isMobile ? "100%" : `${magnifierSize}px`,
              height: isMobile ? "100%" : `${magnifierSize}px`,
              left: isMobile ? 0 : `calc(${mousePosition.x * 100}% - ${magnifierOffset}px)`,
              top: isMobile ? 0 : `calc(${mousePosition.y * 100}% - ${magnifierOffset}px)`,
              backgroundImage: `url(${src})`,
              backgroundPosition: `${backgroundX} ${backgroundY}`,
              backgroundSize: `${zoomLevel * 100}%`,
              backgroundRepeat: "no-repeat",
            }}
          >
            {isMobile && (
              <div className="absolute top-4 right-4 text-sm bg-black/70 text-white px-3 py-1 rounded-full">
                Tap to exit
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageMagnifier;

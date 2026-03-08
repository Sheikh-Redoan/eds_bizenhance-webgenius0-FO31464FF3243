import { useEffect, useRef, useState, useCallback } from 'react';

const useAutoScroll = (speed = 1, resetDelay = 2000) => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const animationRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  const scroll = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    
    if (!container || !content || isHovered) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    const maxScroll = content.scrollHeight - container.clientHeight;
    
    if (container.scrollTop >= maxScroll - 1) {
      setHasReachedEnd(true);
      
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      
      resetTimeoutRef.current = setTimeout(() => {
        if (container) {
          container.scrollTop = 0;
          setHasReachedEnd(false);
        }
      }, resetDelay);
      
      return;
    }
    
    container.scrollTop += speed;
    animationRef.current = requestAnimationFrame(scroll);
  }, [isHovered, speed, resetDelay]);

  useEffect(() => {
    if (!isHovered && !hasReachedEnd) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(scroll);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [isHovered, hasReachedEnd, scroll]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setHasReachedEnd(false);
    }
  }, []);

  return {
    containerRef,
    contentRef,
    isHovered,
    setIsHovered,
    hasReachedEnd
  };
};

export default useAutoScroll;

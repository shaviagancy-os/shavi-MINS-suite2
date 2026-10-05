import React, { useState, useEffect, useRef } from 'react';

interface LazyViewportProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export default function LazyViewport({ children, fallback, threshold = 0.01, rootMargin = '200px' }: LazyViewportProps) {
  const [hasEntered, setHasEntered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hasEntered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasEntered, threshold, rootMargin]);

  return (
    <div ref={containerRef} className="w-full">
      {hasEntered ? (
        <React.Suspense fallback={fallback}>
          {children}
        </React.Suspense>
      ) : (
        fallback
      )}
    </div>
  );
}

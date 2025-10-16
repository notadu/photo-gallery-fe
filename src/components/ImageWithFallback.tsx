import React, { useState } from "react";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const [didError, setDidError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setDidError(true);

  const { src, alt, className = "", ...rest } = props;

  const displaySrc = didError ? "/images/placeholder.svg" : src;

  return (
    <div className={`${className} overflow-hidden bg-stone-400 relative`}>
      <img
        src={displaySrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
        {...rest}
      />
    </div>
  );
}

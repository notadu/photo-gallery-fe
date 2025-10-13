import React, { useState } from "react";

export function ImageWithFallback(
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) {
  const [didError, setDidError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setDidError(true);

  const { src, alt, className = "", style, ...rest } = props;

  const displaySrc = didError ? "/images/placeholder.svg" : src;

  return (
    <img
      src={displaySrc}
      alt={alt}
      onLoad={handleLoad}
      onError={handleError}
      loading="lazy"
      {...rest}
      className={`
        ${className}
        transition-opacity duration-700 ease-in-out
        ${isLoaded ? "opacity-100" : "opacity-0"}
        bg-gray-200
        object-cover
      `}
      style={{
        ...style,
        backgroundImage: didError
          ? "none"
          : "linear-gradient(to bottom right, #f3f3f3, #e5e5e5)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}

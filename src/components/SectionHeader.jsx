import React from "react";

const SectionHeader = ({
  title,
  emoji,
  subtitle,
  gradient = true,
  align = "left",
  size = "large",
}) => {
  const sizes = {
    small: "text-2xl md:text-3xl",
    medium: "text-3xl md:text-4xl",
    large: "text-4xl md:text-5xl",
  };

  const alignments = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div className={`mb-12 px-6 ${alignments[align]} max-w-7xl w-full`}>
      {/* Main Title Row */}
      <div className="flex items-center space-x-4 mb-4">
        <span
          className={`${sizes[size]} transform hover:scale-110 transition-transform duration-300 hover:rotate-12`}
        >
          {emoji}
        </span>
        <h2
          className={`${sizes[size]} font-bold tracking-tight ${
            gradient
              ? "bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent"
              : "text-red-600"
          }`}
        >
          {title}
        </h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-300 text-lg md:text-xl font-light max-w-4xl leading-relaxed mb-6">
          {subtitle}
        </p>
      )}

      {/* Netflix-style decorative elements */}
      <div className="flex items-center space-x-3">
        <div className="h-1.5 w-20 bg-gradient-to-r from-red-600 to-red-400 rounded-full shadow-lg shadow-red-600/30"></div>
        <div className="h-1.5 w-12 bg-red-500 rounded-full shadow-lg shadow-red-500/30"></div>
        <div className="h-1.5 w-6 bg-red-400 rounded-full shadow-lg shadow-red-400/30"></div>
        <div className="h-1.5 w-3 bg-red-300 rounded-full shadow-lg shadow-red-300/30"></div>
        <div className="h-1.5 flex-1 bg-gradient-to-r from-red-300/50 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};

export default SectionHeader;

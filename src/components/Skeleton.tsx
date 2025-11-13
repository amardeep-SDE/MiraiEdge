import React from "react";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "1rem",
  rounded = "md",
  className = "",
}) => {
  return (
    <div
      className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-${rounded} ${className}`}
      style={{ width, height }}
    ></div>
  );
};

export default Skeleton;

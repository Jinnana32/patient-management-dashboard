interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  // Ideally we want this to be a color from the theme
  // but for now we use a hardcoded color for simplicity
  color?: 'blue' | 'green' | 'red' | 'purple';
}

const Spinner = ({ size = 'md', color = 'blue' }: SpinnerProps) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={`${sizeMap[size]} border-4 border-${color}-500 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default Spinner;

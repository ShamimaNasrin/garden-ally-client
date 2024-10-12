const LoadingSpinner = () => {
  return (
    <div className="w-full mx-auto flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-transparent border-gray-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;

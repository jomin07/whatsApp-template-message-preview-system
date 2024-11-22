const ErrorAlert = ({ message }) => {
  return (
    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-md">
      <p className="text-red-600 font-medium">{message}</p>
    </div>
  );
};

export default ErrorAlert;

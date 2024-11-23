import { FaExclamationTriangle } from "react-icons/fa";

const ErrorAlert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative transform transition-all scale-95">
        <div className="flex items-center space-x-4">
          <FaExclamationTriangle className="text-red-500 text-3xl" />
          <h3 className="text-2xl font-bold text-red-700">Error</h3>
        </div>
        <p className="mt-4 text-gray-800 text-lg leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none text-lg"
        >
          ✕
        </button>
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:from-red-600 hover:to-pink-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;

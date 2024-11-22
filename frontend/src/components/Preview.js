const Preview = ({ message }) => {
  return (
    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-green-700">Preview:</h3>
      <p className="text-gray-800 mt-2">{message}</p>
    </div>
  );
};

export default Preview;

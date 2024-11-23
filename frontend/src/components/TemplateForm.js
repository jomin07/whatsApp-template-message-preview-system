import { useState } from "react";
import { validateTemplate, previewTemplate } from "../api/api";
import ErrorAlert from "./ErrorAlert";
import Preview from "./Preview";

const TemplateForm = () => {
  const [template, setTemplate] = useState("");
  const [placeholders, setPlaceholders] = useState([]);
  const [sampleData, setSampleData] = useState({});
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const handleTemplateChange = async (e) => {
    const value = e.target.value;
    setTemplate(value);
    try {
      setError("");
      setPreview("");

      const allPlaceholders = value.match(/{{.*?}}/g) || [];

      const invalidPlaceholders = allPlaceholders.filter(
        (placeholder) => !/^{{\s*\w+\s*}}$/.test(placeholder)
      );

      if (invalidPlaceholders.length > 0) {
        throw new Error(
          `Invalid placeholders detected: ${invalidPlaceholders.join(", ")}`
        );
      }

      const result = await validateTemplate(value);
      setPlaceholders(result.placeholders);
      setSampleData({});
    } catch (error) {
      setPreview("");
      setPlaceholders([]);
      setError(error.response?.data?.message || "Failed to validate template.");
    }
  };

  const handleInputChange = (key, value) => {
    setSampleData({ ...sampleData, [key]: value });
  };

  const handlePreview = async () => {
    try {
      setError("");
      setPreview("");

      if (!template.trim()) {
        setError("Template cannot be empty. Please enter a valid template.");
        return;
      }

      if (template.includes("{{") && !/{{\s*\w+\s*}}/.test(template)) {
        setError("Template contains invalid or incomplete placeholders.");
        return;
      }

      const missingKeys = placeholders.filter(
        (key) => !sampleData[key] || sampleData[key].trim() === ""
      );

      if (missingKeys.length > 0) {
        setError(
          `Missing or invalid values for placeholders: ${missingKeys.join(
            ", "
          )}`
        );
        return;
      }

      const result = await previewTemplate(template, sampleData);
      setPreview(result.preview);
    } catch (error) {
      setPreview("");
      setError(error.response?.data?.message || "Failed to generate preview.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-teal-100 to-purple-100 shadow-xl rounded-lg mt-10 border border-gray-300">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          WhatsApp Template Parser
        </h1>
        <p className="text-gray-600 mt-2">
          Easily parse and preview message templates
        </p>
      </div>

      <textarea
        placeholder="Start typing your template here (e.g., Hello {{name}}!)..."
        value={template}
        onChange={handleTemplateChange}
        rows="5"
        className="w-full p-4 border-2 rounded-lg mb-6 shadow-sm focus:outline-none focus:ring-4 focus:ring-teal-400 transition bg-white"
      />

      <div className="space-y-6">
        {placeholders.length > 0 && (
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Fill in Placeholder Values
          </h3>
        )}
        {placeholders.map((placeholder) => (
          <div
            key={placeholder}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md"
          >
            <label className="text-gray-700 font-semibold">
              {placeholder}:
            </label>
            <input
              type="text"
              value={sampleData[placeholder] || ""}
              onChange={(e) => handleInputChange(placeholder, e.target.value)}
              className="flex-grow p-3 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-50"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreview}
          className="px-12 py-3 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-bold rounded-full shadow-md hover:from-teal-600 hover:to-purple-600 transition-transform transform hover:scale-105"
        >
          Generate Preview
        </button>
      </div>

      {error && (
        <div className="mt-6">
          <ErrorAlert message={error} onClose={() => setError("")} />
        </div>
      )}

      {preview && <Preview message={preview} onClose={() => setPreview("")} />}
    </div>
  );
};

export default TemplateForm;

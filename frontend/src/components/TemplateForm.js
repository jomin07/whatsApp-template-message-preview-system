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
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        WhatsApp Template Parser
      </h2>

      <textarea
        placeholder="Enter your template here..."
        value={template}
        onChange={handleTemplateChange}
        rows="5"
        className="w-full p-4 border rounded-lg mb-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-4">
        {placeholders.map((placeholder) => (
          <div key={placeholder} className="flex items-center gap-4">
            <label className="text-gray-600 font-medium">{placeholder}:</label>
            <input
              type="text"
              value={sampleData[placeholder] || ""}
              onChange={(e) => handleInputChange(placeholder, e.target.value)}
              className="flex-grow p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePreview}
        className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
      >
        Generate Preview
      </button>

      {error && <ErrorAlert message={error} />}
      {preview && <Preview message={preview} />}
    </div>
  );
};

export default TemplateForm;

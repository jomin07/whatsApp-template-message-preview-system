import {
  extractPlaceholders,
  replacePlaceholders,
} from "../utils/templateParser.js";

export const parseTemplate = (req, res, next) => {
  try {
    const { template, data } = req.body;

    if (!template || typeof template !== "string") {
      throw new Error("Invalid or missing template string.");
    }

    const parsedMessage = replacePlaceholders(template, data);
    res.status(200).json({ success: true, parsedMessage });
  } catch (error) {
    next(error);
  }
};

export const validateTemplate = (req, res, next) => {
  try {
    const { template } = req.query;

    if (!template || typeof template !== "string") {
      throw new Error("Invalid or missing template string.");
    }

    const placeholders = extractPlaceholders(template);
    res.status(200).json({ success: true, placeholders });
  } catch (error) {
    next(error);
  }
};

export const previewTemplate = (req, res, next) => {
  try {
    const { template, sampleData } = req.body;

    if (!template || typeof template !== "string") {
      throw new Error("Invalid or missing template string.");
    }

    const preview = replacePlaceholders(template, sampleData);
    res.status(200).json({ success: true, preview });
  } catch (error) {
    next(error);
  }
};

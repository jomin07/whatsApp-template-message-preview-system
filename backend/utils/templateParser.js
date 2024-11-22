export const extractPlaceholders = (template) => {
  const matches = template.match(/{{\s*\w+\s*}}/g) || [];
  return matches.map((placeholder) => placeholder.replace(/{{\s*|\s*}}/g, ""));
};

export const replacePlaceholders = (template, data) => {
  return template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
    if (data[key] === undefined || data[key] === null || data[key] === "") {
      throw new Error(`Value for placeholder '${key}' is missing or invalid.`);
    }
    return data[key];
  });
};

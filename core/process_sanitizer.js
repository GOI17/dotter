/**
 *
 * @param {string} text
 * @param {string?} charactersToTrim
 * @returns {string | Error} sanitized text
 */
const sanitize = (text, charactersToTrim) => {
  if (typeof text !== "string") throw new Error("text should be string");
  if (text.length === 0) throw new Error("text can not be an empty string");
  if (typeof charactersToTrim !== "string")
    throw new Error("charactersToTrim should be string");
  if (charactersToTrim.length === 0)
    throw new Error("charactersToTrim can not be an empty string");
  if (!text.includes(charactersToTrim))
    throw new Error(
      `The given text: ${text} does not include ${charactersToTrim}`,
    );

  return text.replace(charactersToTrim, "");
};

export { sanitize };

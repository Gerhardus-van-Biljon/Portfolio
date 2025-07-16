

/**
 * Returns either black or white text color based on the luminance
 * of the provided hex background color.
 *
 * @param {string} hex 3- or 6-digit hex code (with leading “#”).
 * @returns {string} “#000” if luminance > 0.5, otherwise “#fff”
 */
export function getContrastingColor(hex) {
  // Strip leading “#”
  const c = hex.charAt(0) === "#" ? hex.substring(1) : hex;
  // Parse r, g, b components
  const [r, g, b] = [
    parseInt(c.substr(0, 2), 16),
    parseInt(c.substr(2, 2), 16),
    parseInt(c.substr(4, 2), 16),
  ];
  // Relative luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000" : "#fff";
}

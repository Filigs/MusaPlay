// utils/importImages.js
export function importAll(r) {
  return r.keys().map((fileName) => ({
    src: r(fileName).default,
    fileName: fileName.substring(2).replace(/\.svg$/, ""), // Remove the leading './' and file extension
  }));
}

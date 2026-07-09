// ============================================================
//  AUTOMATIC WORKS LOADER
//  Drop ANY image (any filename: jpg/jpeg/png/webp/gif) into
//  src/assets/works/<folder>/ and it appears in that chapter
//  automatically — no lists to edit, no renaming required.
//  Files are shown in natural filename order (1, 2, 10 sorts
//  correctly), so name files in the order she wants them shown.
// ============================================================

const files = import.meta.glob(
  '../assets/works/*/*.{jpg,jpeg,png,webp,gif,JPG,JPEG,PNG,WEBP,GIF}',
  { eager: true, query: '?url', import: 'default' }
)

const ROMAN = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX']

export function worksFor(folder, label, captions = [], defaultCaption = '') {
  const entries = Object.entries(files)
    .filter(([path]) => path.includes(`/works/${folder}/`))
    .map(([path, url]) => ({ name: path.split('/').pop(), url }))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))

  return entries.map((f, i) => ({
    title: `${label} ${ROMAN[i] || i + 1}`,
    caption: captions[i] || defaultCaption,
    image: f.url
  }))
}

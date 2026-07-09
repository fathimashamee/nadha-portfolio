import { useState } from 'react'

/* Tries base.jpg -> base.jpeg -> base.png -> base.webp, then a themed placeholder. */
const EXTS = ['jpg', 'jpeg', 'png', 'webp']

export function makePlaceholder(text1, text2) {
  return (
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#d8c39a"/><text x="200" y="145" font-family="serif" font-style="italic" font-size="18" fill="#6b4a26" text-anchor="middle">${text1}</text><text x="200" y="172" font-family="serif" font-size="13" fill="#8a6b43" text-anchor="middle">${text2}</text></svg>`
    )
  )
}

const DEFAULT_PLACEHOLDER = makePlaceholder('plate awaiting artwork', 'add image to public/works/')

export default function SmartImg({ base, alt, placeholder = DEFAULT_PLACEHOLDER, ...rest }) {
  const [step, setStep] = useState(0)
  const src = step < EXTS.length ? `${base}.${EXTS[step]}` : placeholder
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setStep((s) => s + 1)}
      {...rest}
    />
  )
}

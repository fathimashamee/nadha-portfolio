import { useEffect, useRef, useId } from 'react'

const FONT_URL = 'https://cdn.jsdelivr.net/npm/vara@1.4.0/fonts/Satisfy/SatisfySL.json'

/**
 * Quill handwriting that writes once when its page becomes active.
 * Responsive: font sizes scale down to fit the page width.
 * Falls back to a styled handwriting font if the Vara CDN is unavailable.
 */
export default function VaraText({ lines, active, align = 'center' }) {
  const reactId = useId()
  const domId = 'vara-' + reactId.replace(/[^a-zA-Z0-9]/g, '')
  const written = useRef(false)

  useEffect(() => {
    if (!active || written.current) return
    written.current = true

    const el = document.getElementById(domId)
    const width = el?.clientWidth || 400
    const scale = Math.min(1, Math.max(0.5, width / 430))

    if (typeof window === 'undefined' || !window.Vara) {
      if (el) {
        el.innerHTML = lines
          .map(
            (l) =>
              `<div style="font-family:'Homemade Apple',cursive;font-size:${Math.round(
                l.fontSize * 0.6 * scale
              )}px;color:${l.color || '#4A2E14'};text-align:${align};line-height:1.9;">${l.text}</div>`
          )
          .join('')
      }
      return
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    new window.Vara(
      '#' + domId,
      FONT_URL,
      lines.map((l) => ({
        text: l.text,
        fontSize: Math.round(l.fontSize * scale),
        strokeWidth: l.strokeWidth ?? 1.4,
        color: l.color || '#4A2E14',
        textAlign: align,
        duration: reduced ? 0 : l.duration ?? 2400,
        delay: reduced ? 0 : l.delay ?? 0
      }))
    )
  }, [active, domId, lines, align])

  return <div id={domId} className="vara-slot" />
}

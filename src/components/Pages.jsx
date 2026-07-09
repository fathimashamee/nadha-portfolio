import { forwardRef, useEffect, useState } from 'react'
import VaraText from './VaraText.jsx'
import { artist, maker } from '../data/content.js'

const PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="#d8c39a"/><text x="200" y="145" font-family="serif" font-style="italic" font-size="18" fill="#6b4a26" text-anchor="middle">plate awaiting artwork</text><text x="200" y="172" font-family="serif" font-size="13" fill="#8a6b43" text-anchor="middle">add image to public/works/</text></svg>`
  )

const PORTRAIT_PLACEHOLDER =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="360"><rect width="300" height="360" fill="#d8c39a"/><circle cx="150" cy="140" r="52" fill="#c2a468"/><rect x="86" y="205" width="128" height="90" rx="45" fill="#c2a468"/><text x="150" y="330" font-family="serif" font-style="italic" font-size="15" fill="#6b4a26" text-anchor="middle">her portrait goes here</text></svg>`
  )

/* Base page shell — react-pageflip requires forwarded refs */
export const Page = forwardRef(function Page({ children, className = '', number }, ref) {
  return (
    <div className={`page ${className}`} ref={ref}>
      <div className="page-inner">
        {children}
        {number != null && (
          <span className={`page-number ${number % 2 === 0 ? 'left' : 'right'}`}>
            · {number} ·
          </span>
        )}
      </div>
    </div>
  )
})

/* Fades children in like drying ink once the page is active */
function InkFade({ active, delay = 1800, children, className = '' }) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!active || visible) return
    const t = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(t)
  }, [active, visible, delay])
  return <div className={`ink-fade ${visible ? 'visible' : ''} ${className}`}>{children}</div>
}

export const CoverPage = forwardRef(function CoverPage({ onOpen }, ref) {
  return (
    <div className="page cover" ref={ref} data-density="hard">
      <div className="cover-inner">
        <p className="cover-eyebrow">✦ The life &amp; works of ✦</p>
        <h1 className="cover-title">{artist.name}</h1>
        <p className="cover-sub">{artist.title}</p>
        <div className="cover-ornament">❦ ❦ ❦</div>
        <button className="cover-open" onClick={onOpen}>
          Open the book
        </button>
      </div>
    </div>
  )
})

export const TitlePage = forwardRef(function TitlePage({ active }, ref) {
  return (
    <Page ref={ref} number={1}>
      <div className="page-frame">
        <p className="chapter-numeral">Herein lies the life &amp; work of</p>
        <div className="folio-rule" />
        <VaraText
          active={active}
          lines={[
            { text: artist.fullName, fontSize: 40, duration: 2600 },
            { text: artist.title, fontSize: 20, color: '#6B3A1A', duration: 2200, delay: 300 }
          ]}
        />
        <InkFade active={active} delay={4800}>
          <p className="title-quote">
            “Turning simple ideas into thoughtful visual stories,
            <br />
            from the isle of Serendib.”
          </p>
          <p className="chapter-numeral" style={{ marginTop: 'auto' }}>
            — anno MMXXVI —
          </p>
        </InkFade>
      </div>
    </Page>
  )
})

export const ContentsPage = forwardRef(function ContentsPage({ entries, onGo }, ref) {
  return (
    <Page ref={ref} number={2}>
      <div className="page-frame">
        <h2 className="toc-heading">Contents</h2>
        <div className="folio-rule" />
        <ul className="toc-list compact">
          {entries.map((e) => (
            <li key={e.id} className={e.isPart ? 'toc-part' : ''}>
              <button className="toc-link" onClick={() => onGo(e.pageIndex)}>
                <span>{e.label}</span>
                <span className="toc-num">{e.folio}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Page>
  )
})

/* Decorative interleaf page — keeps every section opening on a fresh spread */
export const InterleafPage = forwardRef(function InterleafPage({ quote, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame interleaf">
        <div className="cover-ornament" style={{ color: '#8a6b43' }}>❦</div>
        <p className="title-quote">“{quote}”</p>
        <div className="cover-ornament" style={{ color: '#8a6b43' }}>❦</div>
      </div>
    </Page>
  )
})

/* ---- Preface, page 1: her story ---- */
export const PrefacePage = forwardRef(function PrefacePage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">Preface</p>
        <div className="folio-rule" />
        <VaraText active={active} lines={[{ text: 'My story', fontSize: 32 }]} />
        <InkFade active={active} delay={2400}>
          <p className="about-text dropcap">{artist.story[0]}</p>
          <p className="about-text">{artist.story[1]}</p>
        </InkFade>
      </div>
    </Page>
  )
})

/* ---- Preface, page 2: the reader in her ---- */
export const ReaderPage = forwardRef(function ReaderPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">Of stories &amp; readers</p>
        <div className="folio-rule" />
        <InkFade active={active} delay={400}>
          <p className="about-text dropcap">{artist.reader[0]}</p>
          <p className="about-text">{artist.reader[1]}</p>
          <p className="chapter-intro" style={{ marginTop: 'auto' }}>
            — which is why this portfolio is a book. —
          </p>
        </InkFade>
      </div>
    </Page>
  )
})

/* ---- About, page 1: portrait ---- */
export const AboutPage = forwardRef(function AboutPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">Of the artist herself</p>
        <div className="folio-rule" />
        <div className="portrait-row">
          <figure className="portrait-frame">
            <img
              src={artist.portrait}
              alt={`Portrait of ${artist.name}`}
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = PORTRAIT_PLACEHOLDER
              }}
            />
            <figcaption>{artist.name}</figcaption>
          </figure>
          <InkFade active={active} delay={600} className="portrait-side">
            <p className="about-text" style={{ marginTop: 0 }}>{artist.story[2]}</p>
          </InkFade>
        </div>
        <InkFade active={active} delay={1400}>
          <p className="about-text">{artist.about}</p>
        </InkFade>
      </div>
    </Page>
  )
})

/* ---- About, page 2: her personality ---- */
export const PersonalityPage = forwardRef(function PersonalityPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">In her own manner</p>
        <div className="folio-rule" />
        <VaraText active={active} lines={[{ text: 'Three languages, one voice', fontSize: 24 }]} />
        <InkFade active={active} delay={2200}>
          {artist.personality.map((p) => (
            <p className="about-text" key={p}>{p}</p>
          ))}
        </InkFade>
      </div>
    </Page>
  )
})

/* ---- Skills, page 1: what she can do ---- */
export const SkillsPage = forwardRef(function SkillsPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">The craft</p>
        <div className="folio-rule" />
        <VaraText active={active} lines={[{ text: 'What she can do', fontSize: 26 }]} />
        <InkFade active={active} delay={2200}>
          <ul className="tool-list">
            {artist.capabilities.map((c) => (
              <li key={c.name}>
                <strong>{c.name}</strong> — <em>{c.note}</em>
              </li>
            ))}
          </ul>
        </InkFade>
      </div>
    </Page>
  )
})

/* ---- Skills, page 2: commissions/services ---- */
export const ServicesPage = forwardRef(function ServicesPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">Commissions the artist accepts</p>
        <div className="folio-rule" />
        <InkFade active={active} delay={400}>
          <ul className="tool-list">
            {artist.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="seal-links">
            <a className="seal-link" href={artist.fiverr} target="_blank" rel="noreferrer">
              Commission on Fiverr
            </a>
          </div>
        </InkFade>
      </div>
    </Page>
  )
})

/* ---- Tools, page 1 ---- */
export const ToolsPage = forwardRef(function ToolsPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">Instruments of the trade</p>
        <div className="folio-rule" />
        <VaraText active={active} lines={[{ text: 'Tools', fontSize: 32 }]} />
        <InkFade active={active} delay={2200}>
          <ul className="tool-list">
            {artist.tools.map((t) => (
              <li key={t.name}>
                <strong>{t.name}</strong> — <em>{t.note}</em>
              </li>
            ))}
          </ul>
        </InkFade>
      </div>
    </Page>
  )
})

/* ---- Tools, page 2: how she works ---- */
export const ProcessPage = forwardRef(function ProcessPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">The method</p>
        <div className="folio-rule" />
        <VaraText active={active} lines={[{ text: 'How she works', fontSize: 26 }]} />
        <InkFade active={active} delay={2200}>
          <ol className="process-list">
            {artist.process.map((p, i) => (
              <li key={p.step}>
                <span className="process-step">
                  {i + 1}. {p.step}
                </span>
                <span className="process-note">{p.note}</span>
              </li>
            ))}
          </ol>
        </InkFade>
      </div>
    </Page>
  )
})

export const ChapterIntroPage = forwardRef(function ChapterIntroPage(
  { chapter, active, number },
  ref
) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">Chapter {chapter.numeral}</p>
        <div className="folio-rule" />
        <VaraText
          active={active}
          lines={[{ text: chapter.title, fontSize: 32, duration: 2400 }]}
        />
        <InkFade active={active} delay={2600}>
          <p className="chapter-intro dropcap">{chapter.intro}</p>
          <p className="chapter-intro" style={{ marginTop: 'auto', fontSize: 13 }}>
            {chapter.works.length} plates follow — tap any plate to view it in full.
          </p>
        </InkFade>
      </div>
    </Page>
  )
})

export const WorksPage = forwardRef(function WorksPage({ works, number, onView }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <div className={`plates ${works.length === 1 ? 'single' : ''}`}>
          {works.map((w) => (
            <figure key={w.image} className="plate tape" onClick={() => onView(w)}>
              <img
                src={w.image}
                alt={`${w.title} — ${w.caption}`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = PLACEHOLDER
                }}
              />
              <figcaption>{w.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Page>
  )
})

/* ---- Contact, page 1: the letter ---- */
export const ContactPage = forwardRef(function ContactPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">A letter to the artist</p>
        <div className="folio-rule" />
        <VaraText active={active} lines={[{ text: "Let's build something", fontSize: 28 }]} />
        <InkFade active={active} delay={2400}>
          <p className="contact-line">
            <span>Write to</span> {artist.email}
          </p>
          <p className="contact-line">
            <span>Or call</span> {artist.phone}
          </p>
          <p className="contact-line">
            <span>{artist.availability}</span>
          </p>
          <div className="seal-links">
            <a className="seal-link" href={artist.cv} download>
              Download her CV
            </a>
          </div>
        </InkFade>
      </div>
    </Page>
  )
})

/* ---- Contact, page 2: commission her ---- */
export const CommissionPage = forwardRef(function CommissionPage({ active, number }, ref) {
  return (
    <Page ref={ref} number={number}>
      <div className="page-frame">
        <p className="chapter-numeral">Where her work lives</p>
        <div className="folio-rule" />
        <InkFade active={active} delay={400}>
          <p className="chapter-intro">
            Browse the full archive, connect professionally, or commission a piece directly.
          </p>
          <div className="seal-links" style={{ flexDirection: 'column', alignItems: 'center' }}>
            <a className="seal-link wide" href={artist.behance} target="_blank" rel="noreferrer">
              Behance — the archive
            </a>
            <a className="seal-link wide" href={artist.linkedin} target="_blank" rel="noreferrer">
              LinkedIn — the professional
            </a>
            <a className="seal-link wide" href={artist.fiverr} target="_blank" rel="noreferrer">
              Fiverr — commission her
            </a>
            <a className="seal-link wide" href={`mailto:${artist.email}`}>
              Email — send a letter
            </a>
            <a className="seal-link wide" href={artist.cv} download>
              CV — download for review
            </a>
          </div>
        </InkFade>
      </div>
    </Page>
  )
})

export const BackCoverPage = forwardRef(function BackCoverPage(_, ref) {
  return (
    <div className="page cover" ref={ref} data-density="hard">
      <div className="cover-inner">
        <div className="cover-ornament">❦</div>
        <p className="cover-sub">finis</p>
        <p className="cover-eyebrow" style={{ marginTop: 18 }}>
          {artist.name} · {new Date().getFullYear()}
        </p>
        <p className="back-credit">
          Bound &amp; built by{' '}
          <a href={maker.site} target="_blank" rel="noreferrer">{maker.name}</a> · MMXXVI
        </p>
      </div>
    </div>
  )
})

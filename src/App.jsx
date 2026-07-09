import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { chapters, artist, maker, WORKS_PER_PAGE, interleafQuotes } from './data/content.js'
import {
  CoverPage,
  TitlePage,
  ContentsPage,
  InterleafPage,
  PrefacePage,
  ReaderPage,
  AboutPage,
  PersonalityPage,
  SkillsPage,
  ServicesPage,
  ToolsPage,
  ProcessPage,
  ChapterIntroPage,
  WorksPage,
  ContactPage,
  CommissionPage,
  BackCoverPage
} from './components/Pages.jsx'

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export default function App() {
  const bookRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(null)

  /* Build the ordered page plan once. Index 0 is the cover.
     With showCover, spreads are [1,2], [3,4], ... — so every
     section must begin at an ODD index to open on a fresh spread.
     Decorative interleaf pages pad wherever a section would not. */
  const plan = useMemo(() => {
    const pages = []
    const toc = []
    let quoteIdx = 0

    const freshSpread = () => {
      if (pages.length % 2 === 0) {
        pages.push({
          kind: 'interleaf',
          quote: interleafQuotes[quoteIdx++ % interleafQuotes.length],
          folio: pages.length
        })
      }
    }

    pages.push({ kind: 'cover' }) // 0
    pages.push({ kind: 'title', folio: 1 }) // 1
    pages.push({ kind: 'contents', folio: 2 }) // 2

    const marks = {}
    const section = (name, kinds, tocLabel) => {
      freshSpread()
      marks[name] = pages.length
      if (tocLabel)
        toc.push({
          id: name,
          label: tocLabel,
          pageIndex: pages.length,
          folio: pages.length,
          isPart: true
        })
      kinds.forEach((kind) => pages.push({ kind, folio: pages.length }))
    }

    section('preface', ['preface', 'reader'], 'Preface · My story')
    section('about', ['about', 'personality'], 'About the artist')
    section('skills', ['skills', 'services'], 'Skills & commissions')
    section('tools', ['tools', 'process'], 'Tools & method')

    freshSpread()
    marks.works = pages.length
    chapters.forEach((ch) => {
      freshSpread()
      toc.push({
        id: ch.id,
        label: `Chapter ${ch.numeral} · ${ch.title}`,
        pageIndex: pages.length,
        folio: pages.length
      })
      pages.push({ kind: 'chapter-intro', chapter: ch, folio: pages.length })
      chunk(ch.works, WORKS_PER_PAGE).forEach((group) => {
        pages.push({ kind: 'works', works: group, folio: pages.length })
      })
    })

    section('contact', ['contact', 'commission'], 'A letter to the artist')

    /* Back cover must sit alone on an odd index */
    if (pages.length % 2 === 0) {
      pages.push({
        kind: 'interleaf',
        quote: interleafQuotes[quoteIdx++ % interleafQuotes.length],
        folio: pages.length
      })
    }
    pages.push({ kind: 'back' })

    const bookmarks = [
      { label: 'Home', target: 0 },
      { label: 'My story', target: marks.preface },
      { label: 'About', target: marks.about },
      { label: 'Skills', target: marks.skills },
      { label: 'Tools', target: marks.tools },
      { label: 'Works', target: marks.works },
      { label: 'Contact', target: marks.contact }
    ]

    return { pages, toc, bookmarks }
  }, [])

  const flipTo = useCallback((index) => {
    const api = bookRef.current?.pageFlip?.()
    if (api) api.flip(index)
  }, [])

  const flipNext = useCallback(() => bookRef.current?.pageFlip?.()?.flipNext(), [])
  const flipPrev = useCallback(() => bookRef.current?.pageFlip?.()?.flipPrev(), [])

  /* Keyboard page turning */
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox) {
        if (e.key === 'Escape') setLightbox(null)
        return
      }
      if (e.key === 'ArrowRight') flipNext()
      if (e.key === 'ArrowLeft') flipPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flipNext, flipPrev, lightbox])

  /* A page counts as "active" (start its ink) once the reader reaches
     its spread — with two-page spreads the right page is current+1. */
  const isActive = (i) => current >= i - 1

  const lastIndex = plan.pages.length - 1

  const activeBookmark = plan.bookmarks.reduce(
    (acc, b, idx) => (current >= b.target ? idx : acc),
    0
  )

  return (
    <div className="app">
      <p className="desk-title">✦ &nbsp;The life &amp; works of {artist.name}&nbsp; ✦</p>

      <nav className="bookmarks" aria-label="Book sections">
        {plan.bookmarks.map((b, i) => (
          <button
            key={b.label}
            className={`ribbon ${i === activeBookmark ? 'active' : ''}`}
            onClick={() => flipTo(b.target)}
          >
            {b.label}
          </button>
        ))}
      </nav>

      <div className="book-wrap">
        <HTMLFlipBook
          ref={bookRef}
          width={500}
          height={680}
          size="stretch"
          minWidth={300}
          maxWidth={620}
          minHeight={480}
          maxHeight={840}
          showCover={true}
          maxShadowOpacity={0.45}
          drawShadow={true}
          flippingTime={900}
          useMouseEvents={true}
          mobileScrollSupport={true}
          onFlip={(e) => setCurrent(e.data)}
          className="flip-book"
        >
          {plan.pages.map((p, i) => {
            switch (p.kind) {
              case 'cover':
                return <CoverPage key="cover" onOpen={() => flipTo(1)} />
              case 'title':
                return <TitlePage key="title" active={isActive(i)} />
              case 'contents':
                return <ContentsPage key="contents" entries={plan.toc} onGo={flipTo} />
              case 'interleaf':
                return <InterleafPage key={`leaf-${i}`} quote={p.quote} number={p.folio} />
              case 'preface':
                return <PrefacePage key="preface" active={isActive(i)} number={p.folio} />
              case 'reader':
                return <ReaderPage key="reader" active={isActive(i)} number={p.folio} />
              case 'about':
                return <AboutPage key="about" active={isActive(i)} number={p.folio} />
              case 'personality':
                return (
                  <PersonalityPage key="personality" active={isActive(i)} number={p.folio} />
                )
              case 'skills':
                return <SkillsPage key="skills" active={isActive(i)} number={p.folio} />
              case 'services':
                return <ServicesPage key="services" active={isActive(i)} number={p.folio} />
              case 'tools':
                return <ToolsPage key="tools" active={isActive(i)} number={p.folio} />
              case 'process':
                return <ProcessPage key="process" active={isActive(i)} number={p.folio} />
              case 'chapter-intro':
                return (
                  <ChapterIntroPage
                    key={`intro-${p.chapter.id}`}
                    chapter={p.chapter}
                    active={isActive(i)}
                    number={p.folio}
                  />
                )
              case 'works':
                return (
                  <WorksPage
                    key={`works-${i}`}
                    works={p.works}
                    number={p.folio}
                    onView={setLightbox}
                  />
                )
              case 'contact':
                return <ContactPage key="contact" active={isActive(i)} number={p.folio} />
              case 'commission':
                return (
                  <CommissionPage key="commission" active={isActive(i)} number={p.folio} />
                )
              case 'back':
              default:
                return <BackCoverPage key="back" />
            }
          })}
        </HTMLFlipBook>
      </div>

      <div className="book-nav">
        <button className="nav-btn" onClick={flipPrev} disabled={current === 0}>
          ← Previous
        </button>
        <button className="nav-btn" onClick={() => flipTo(2)}>
          Contents
        </button>
        <button className="nav-btn" onClick={flipNext} disabled={current >= lastIndex}>
          Turn the page →
        </button>
      </div>

      <p className="desk-hint">
        Use the ribbons to jump between sections, drag a corner, or use your keyboard.
      </p>

      <footer className="desk-footer">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <span className="footer-brand">✦ {artist.name} ✦</span>
            <p className="footer-tag">
              Graphic designer &amp; illustrator crafting visual stories.
            </p>
          </div>
          <div className="footer-col">
            <p className="footer-head">Explore</p>
            {plan.bookmarks
              .filter((b) => ['My story', 'Works', 'Contact'].includes(b.label))
              .map((b) => (
                <button key={b.label} className="footer-go" onClick={() => flipTo(b.target)}>
                  {b.label}
                </button>
              ))}
          </div>
          <div className="footer-col">
            <p className="footer-head">Connect</p>
            <a href={artist.behance} target="_blank" rel="noreferrer">Behance</a>
            <a href={artist.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a href={artist.fiverr} target="_blank" rel="noreferrer">Fiverr</a>
            <a href={`mailto:${artist.email}`}>Email</a>
            <a href={artist.cv} download>Download CV</a>
          </div>
        </div>
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} {artist.fullName} · {artist.location}</span>
          <span>
            Site by <a href={maker.site} target="_blank" rel="noreferrer">{maker.name}</a>
          </span>
        </div>
      </footer>

      {lightbox && (
        <figure
          className="lightbox"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-label={lightbox.title}
        >
          <img src={lightbox.image} alt={lightbox.title} />
          <figcaption className="lightbox-caption">
            <strong>{lightbox.title}</strong>
            <span>{lightbox.caption}</span>
            <em>tap anywhere to close</em>
          </figcaption>
        </figure>
      )}
    </div>
  )
}

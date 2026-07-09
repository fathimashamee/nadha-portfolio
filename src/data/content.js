// ============================================================
//  THE ONLY FILE YOU EDIT for her words & captions.
//  - Her images: drop ANY image into src/assets/works/<folder>/
//    (any filename) — chapters update automatically.
//  - Her portrait: save as public/portrait.jpg
//  - Her CV: save as public/cv.pdf  → download buttons appear
// ============================================================

import { worksFor } from './works.js'

export const artist = {
  name: 'Nadha Deen',
  fullName: 'Nijamudeen Nadha',
  title: 'graphic designer & illustrator',
  location: 'Sri Lanka',
  availability:
    'Available for freelance & full-time work — remote-friendly, taking commissions from anywhere in the world.',
  portrait: import.meta.env.BASE_URL + 'portrait.jpg',
  cv: import.meta.env.BASE_URL + 'cv.pdf',

  story: [
    "I have always been an art-loving soul. Long before I knew the words 'graphic design', I was the girl turning simple ideas into little visual stories — sketches in the margins of schoolbooks, colours chosen with far too much care.",
    'My path began in the bio science stream — studying the designs of life itself — before it took a turn I never planned: into information technology at the University of Colombo, and a Diploma in Graphic Design at HIBC Campus. Somewhere between science, code and canvas, I found my place: where clean layouts, meaningful colours and clear communication meet.',
    'Since 2025 I have worked as a freelance designer, shaping brands, posters, flyers, packaging, menus, social media and screens. Every project is a page in this book — and I am still writing.'
  ],

  reader: [
    'There is a second thread in my story: I am, above all, a reader. I have spent years getting lost in stories, exploring different worlds and meeting unforgettable characters — in English and in Tamil.',
    'That love taught me something no software ever could: what makes a person stop, stay, and turn the next page. Design, to me, is the same craft — every poster, feed and screen is a story competing for a reader. I simply learned the reader\u2019s side first.'
  ],

  about:
    'Passionate about creating clean, modern visuals that help brands communicate with clarity and personality. My work spans branding, print, social media creatives, and UI/UX, with a focus on fresh aesthetics and meaningful design choices.',

  personality: [
    'I think in three languages — English, Tamil and Sinhala — and design for audiences in all of them.',
    'Always exploring new ideas, tools and styles; every project I take on is a chance to learn something new.',
    'Open to collaborations and creative challenges — I love working with people who care about their story as much as I do.'
  ],

  /* What she can DO — written for recruiters & clients, not copied from a CV */
  capabilities: [
    {
      name: 'Brand identity design',
      note: 'logos, colour systems and typography that make a business instantly recognisable'
    },
    {
      name: 'Campaign & promotional design',
      note: 'posters and flyers engineered to turn attention into action'
    },
    {
      name: 'Social media content design',
      note: 'feed-ready posts and carousels with a consistent, scroll-stopping brand voice'
    },
    {
      name: 'Print & layout design',
      note: 'menus, brochures and collateral — polished and print-production ready'
    },
    {
      name: 'Packaging design',
      note: 'labels and boxes with real shelf presence'
    },
    {
      name: 'UI/UX design',
      note: 'clean, modern interfaces designed and prototyped in Figma'
    },
    {
      name: 'Illustration & visual storytelling',
      note: 'original artwork that gives a brand a voice of its own'
    }
  ],

  services: [
    'Social media posts & carousels that stop the scroll',
    'Bifold & trifold flyers — designed within 24 hours',
    'Logos & complete brand identities',
    'Food menus & packaging that sell before the first taste',
    'UI/UX design & prototyping in Figma',
    'Wattpad story reading & honest reviews — in English & Tamil'
  ],

  tools: [
    { name: 'Adobe Photoshop', note: 'photo work, social creatives, digital painting' },
    { name: 'Adobe Illustrator', note: 'logos, marks and everything vector' },
    { name: 'Adobe InDesign', note: 'layouts, menus and print' },
    { name: 'Figma', note: 'UI design & prototyping' },
    { name: 'Canva', note: 'quick-turn social content' }
  ],

  /* How she works — the process page recruiters love to see */
  process: [
    {
      step: 'Listen',
      note: 'Every project begins with the brief, the brand and the audience — understanding the story before designing it.'
    },
    {
      step: 'Concept',
      note: 'Moodboards, references and rough directions — agreeing on the destination before the journey.'
    },
    {
      step: 'Craft',
      note: 'Design, feedback and iteration — refined until it feels inevitable, never just finished.'
    },
    {
      step: 'Deliver',
      note: 'Final files in every format the work will live in — on time, ready to use.'
    }
  ],

  languages: ['English (fluent)', 'Tamil (fluent)', 'Sinhala'],

  email: 'nadhanijab021@gmail.com',
  phone: '0727909010',
  behance: 'https://www.behance.net/NADHADEEN',
  linkedin: 'https://www.linkedin.com/in/nadhann/',
  fiverr: 'https://www.fiverr.com/s/aklDrzQ'
}

export const maker = {
  name: 'Fathima Shameeha',
  site: 'https://fathimashamee.github.io/'
}

/* Chapters — works load automatically from src/assets/works/<id>/.
   Captions apply in filename order; extra images beyond the caption
   list get the chapter's default caption. */
export const chapters = [
  {
    id: 'logo',
    numeral: 'I',
    title: 'Logos & branding',
    intro: 'A brand begins with a mark — a name distilled into a single memorable form.',
    works: worksFor('logo', 'Mark', [
      'A mark built to be remembered — simple enough for a favicon, strong enough for a storefront.',
      'Identity with intent: every curve chosen to say something true about the brand behind it.',
      'A logo that works everywhere it lands — print, profile picture or product.',
      'Distinct at a glance, timeless on a second look — branding made to outlast trends.'
    ], 'Brand identity crafted to be remembered.')
  },
  {
    id: 'posters',
    numeral: 'II',
    title: 'Posters',
    intro: 'Single sheets that stop a passer-by — events, campaigns and ideas set loud on paper.',
    works: worksFor('posters', 'Poster', [
      'A headline that hits before the details do — built to be read across a room.',
      'Bold hierarchy and one clear message: the formula for a poster that gets acted on.',
      'Colour used as a hook — designed to pull the eye from three metres away.',
      'Event energy on a single sheet: date, place and mood in one glance.',
      'A campaign visual that carries the same punch printed or posted online.',
      'Typography doing the heavy lifting — proof that words, set well, are imagery.',
      'Designed for the street and the story alike — one artwork, every format.',
      'A promotional piece balancing information with atmosphere — inviting, never crowded.',
      'Contrast, rhythm and restraint — the quiet craft behind a loud poster.',
      'A poster made to be photographed and shared.'
    ], 'Designed to stop a passer-by mid-step.')
  },
  {
    id: 'flyers',
    numeral: 'III',
    title: 'Flyers',
    intro: 'Bifold, trifold and single sheets — a full pitch that fits in a hand, designed within a day.',
    works: worksFor('flyers', 'Flyer', [
      'A trifold that unfolds like a sales pitch — hook, detail, call to action.',
      'Designed for the handout moment: readable in the ten seconds it gets.',
      'A bifold with breathing room — information organised so nothing fights for attention.',
      'Print-ready within 24 hours, without the design ever looking rushed.',
      'Front face made to earn the flip — the inside made to earn the call.',
      'A layout that guides the reader panel by panel, like pages of a small book.',
      'Business details turned into visual order — services made scannable.',
      'A flyer that survives the noticeboard: distinct among a wall of paper.'
    ], 'A full pitch that fits in a hand.')
  },
  {
    id: 'social',
    numeral: 'IV',
    title: 'Social media posts',
    intro: 'Designed for the feed — visuals that earn their pause in an endless scroll.',
    works: worksFor('social', 'Post', [
      'Built for the two-second decision: stop or scroll. This one stops.',
      'Brand colours turned into a feed identity — recognisable before the name is read.',
      'A promotional post balancing offer and aesthetic — salesy without shouting.',
      'Content design that respects the platform: sized, cropped and composed for mobile.',
      'A visual voice consistent across the grid — every post a tile in a larger picture.',
      'Announcement made beautiful — dates and details woven into the design.',
      'Product-first composition with typography that seals the message.',
      'Designed to be shared, not just seen — the quiet metric of good social design.',
      'Engagement earned by craft, not luck.'
    ], 'Designed to earn its pause in the feed.')
  },
  {
    id: 'carousel',
    numeral: 'V',
    title: 'Carousels',
    intro: 'Stories told one swipe at a time — sequences engineered to hold the thumb.',
    works: worksFor('carousel', 'Carousel', [
      'A cover slide that earns the first swipe — the hardest slide of them all.',
      'Slide-to-slide flow designed like chapters: each panel promises the next.',
      'Educational content dressed for the feed — value that looks effortless.',
      'A product carousel pacing reveal and detail like a well-told story.',
      'Visual continuity across panels — one artwork split into a journey.',
      'Text kept lean per slide so the message lands at swipe speed.',
      'A branded sequence ending on a clear call to action — the swipe converted.',
      'Rhythm in colour and layout so ten slides feel like one design.',
      'Narrative design at feed scale.'
    ], 'A story told one swipe at a time.')
  },
  {
    id: 'foodmenu',
    numeral: 'VI',
    title: 'Food menus',
    intro: 'Menus that make a guest hungry before the kitchen does.',
    works: worksFor('foodmenu', 'Menu', [
      'Dishes organised the way guests actually order — starters to sweets, no hunting.',
      'Appetite-first art direction: colour and imagery chosen to make prices feel fair.',
      'A menu that matches the room — the design tastes like the restaurant feels.',
      'Legible by candlelight, beautiful by daylight — typography for real tables.',
      'The signature-dish spotlight: layout used to sell what the kitchen is proudest of.'
    ], 'Designed to make a guest hungry before the kitchen does.')
  },
  {
    id: 'packaging',
    numeral: 'VII',
    title: 'Packaging',
    intro: 'Boxes, labels and wraps — design you can hold in your hands.',
    works: worksFor('packaging', 'Packaging', [
      'Shelf presence by design — made to be picked up before it is read.',
      'A label that tells the product\u2019s story in the length of a glance.',
      'Structure and print working together — the unboxing designed as a moment.',
      'Brand identity wrapped around a physical thing — consistent from cap to base.',
      'Packaging that photographs well — because today the shelf is also the feed.'
    ], 'Design you can hold in your hands.')
  },
  {
    id: 'uiux',
    numeral: 'VIII',
    title: 'UI & UX',
    intro: 'Screens and flows — where the old craft of layout meets the new craft of interaction.',
    works: worksFor('uiux', 'Screen', [
      'An interface designed reader-first: hierarchy that tells the eye where to go.',
      'Prototyped in Figma from flow to pixel — designed to be built, not just admired.',
      'Clean, modern screens where every element earns its place.'
    ], 'Interfaces where every element earns its place.')
  }
]

export const WORKS_PER_PAGE = 2

export const interleafQuotes = [
  'Every brand is a story; every design, a page of it.',
  'Good design is invisible ink — felt before it is seen.',
  'The reader decides in a glance; the designer prepares for years.',
  'Colour speaks in every language at once.'
]

import { startTransition, useState } from 'react'
import './App.css'

type TrackId = 'budget' | 'committed' | 'competitive'
type LessonId = 'ready' | 'serve' | 'return' | 'partner'
type CourtViewId = 'serve-start' | 'return-start' | 'move-up'

type GearItem = {
  title: string
  range: string
  why: string
  note: string
  href: string
}

type TrackPlan = {
  label: string
  strap: string
  range: string
  promise: string
  realityCheck: string
  firstWeek: string[]
  buyOrder: string[]
  gear: GearItem[]
}

type LessonCard = {
  title: string
  kicker: string
  cue: string
  bullets: string[]
}

type PlayerMarker = {
  label: string
  x: number
  y: number
  tone: 'primary' | 'secondary' | 'ghost'
}

type CourtView = {
  title: string
  caption: string
  callout: string
  players: PlayerMarker[]
}

const RESEARCH_DATE = 'April 4, 2026'

const STARTER_TRACKS: Record<TrackId, TrackPlan> = {
  budget: {
    label: 'Budget start',
    strap: 'Enough to begin this week',
    range: '$120 to $190',
    promise:
      'You can show up to open play with safe shoes, a workable paddle set, real outdoor balls, and zero wasted spend.',
    realityCheck:
      'Do not buy an expensive paddle first. Court shoes help your feet, knees, and confidence more than a flashy paddle face does.',
    firstWeek: [
      'Day 1: learn the serve, the return, and the two-bounce habit.',
      'Day 2: play half-court dinks and practice moving to the kitchen line.',
      'Day 3: join open play and focus on keeping five balls in a row alive.',
    ],
    buyOrder: [
      'Court shoes first if you do not already own a real court shoe.',
      'A 2-paddle starter set is fine if you may bring a partner.',
      'Buy outdoor balls so your first games feel like normal park play.',
    ],
    gear: [
      {
        title: 'SLK Neo 2.0 starter set',
        range: 'Usually around $60 to $90',
        why: 'An easy on-ramp with two paddles, balls, and a bag so you can start immediately.',
        note: 'Great when you are still deciding how serious you want to get.',
        href: 'https://www.amazon.com/dp/B01F7VC6MQ',
      },
      {
        title: 'Franklin X-40 outdoor balls',
        range: 'Usually about $3 to $4 per ball',
        why: 'Still one of the safest default balls for beginners and rec play.',
        note: 'Buy from a brand storefront or a trusted listing when possible.',
        href: 'https://www.amazon.com/s?k=Franklin+X-40+outdoor+pickleball+balls',
      },
      {
        title: 'Court shoes, not running shoes',
        range: 'Usually $70 to $110',
        why: 'Lateral support matters more than speed if you are committing for health.',
        note: 'The ASICS Gel-Renma tends to run narrow. Wide feet often do better in wider court shoes.',
        href: 'https://www.amazon.com/s?k=ASICS+Gel-RENMA+pickleball+shoes',
      },
      {
        title: 'Protective eyewear',
        range: 'Usually $15 to $30',
        why: 'Cheap insurance for fast hands battles at the kitchen line.',
        note: 'Especially smart if you are new and still learning reaction time.',
        href: 'https://www.amazon.com/s?k=pickleball+protective+eyewear',
      },
    ],
  },
  committed: {
    label: 'Committed but smart',
    strap: 'Better feel, still sane money',
    range: '$220 to $360',
    promise:
      'This setup is for the player who knows they are coming back next week and wants gear that helps control, not ego.',
    realityCheck:
      'You still do not need lessons first. You need reps, one controlled paddle, one dependable ball, and the discipline to move with your partner.',
    firstWeek: [
      'Work on a deep return and walking up to the kitchen line under control.',
      'Play one game where your only goal is fewer pop-ups and fewer rushed swings.',
      'Finish each session with ten gentle dinks and ten third-shot drops in practice.',
    ],
    buyOrder: [
      'Upgrade to one controlled paddle you will actually grow into.',
      'Keep a 12-pack of outdoor balls so you always have enough for drilling.',
      'Add overgrips before you buy a second premium paddle.',
    ],
    gear: [
      {
        title: '16 mm control paddle',
        range: 'Usually $120 to $180',
        why: 'A softer, thicker control paddle helps a newer player keep the ball in play.',
        note: 'Look for a shape you can reset with, not a power paddle that encourages wild swings.',
        href: 'https://www.amazon.com/s?k=16mm+control+pickleball+paddle',
      },
      {
        title: 'Franklin X-40 12-pack',
        range: 'Usually $35 to $45',
        why: 'Enough balls to practice serves, returns, and dinks without chasing constantly.',
        note: 'If you play mostly indoors, many rec groups still use outdoor balls.',
        href: 'https://www.amazon.com/s?k=Franklin+X-40+12+pack',
      },
      {
        title: 'Comfort-first court shoe option',
        range: 'Usually $80 to $120',
        why: 'This is the stage where shoes protect the habit you are building.',
        note: 'If ASICS runs too narrow for you, search Skechers Viper Court or another wide court shoe.',
        href: 'https://www.amazon.com/s?k=Skechers+Viper+Court+pickleball+shoes',
      },
      {
        title: 'Overgrips and a sweat towel',
        range: 'Usually $15 to $25 total',
        why: 'A secure handle and dry hands make a bigger difference than beginners expect.',
        note: 'Keep two fresh grips in the bag at all times.',
        href: 'https://www.amazon.com/s?k=pickleball+overgrip',
      },
    ],
  },
  competitive: {
    label: 'Compete without going wild',
    strap: 'Ready to chase rec wins and league nights',
    range: '$360 to $550',
    promise:
      'You want gear that can carry you into ladders, leagues, and early tournament curiosity without buying every shiny thing.',
    realityCheck:
      'Competing starts with positioning, patience, and resets. Gear helps, but the real jump comes from getting to the kitchen together and making fewer panicked swings.',
    firstWeek: [
      'Track unforced errors, not just winners. That is where fast improvement lives.',
      'Practice serve plus one, return plus move, and kitchen hand battles.',
      'Play with people slightly better than you and copy their calm pace between shots.',
    ],
    buyOrder: [
      'One serious paddle, one serious pair of shoes, and a backup grip kit.',
      'Buy balls in bulk so you can drill more than you play.',
      'Skip gadgets unless they directly help recovery, comfort, or repetition.',
    ],
    gear: [
      {
        title: 'Step-up carbon control paddle',
        range: 'Usually $160 to $240',
        why: 'A better face and core can help with resets and roll shots once your basics are stable.',
        note: 'Search for a control-focused paddle before jumping to a high-power model.',
        href: 'https://www.amazon.com/s?k=carbon+fiber+control+pickleball+paddle+16mm',
      },
      {
        title: 'Primary plus backup overgrip kit',
        range: 'Usually $12 to $25',
        why: 'When you play more often, comfort and grip consistency matter every session.',
        note: 'Keep backups in your bag so your good paddle never feels slippery on match day.',
        href: 'https://www.amazon.com/s?k=pickleball+overgrip+pack',
      },
      {
        title: 'Court shoe upgrade',
        range: 'Usually $90 to $140',
        why: 'Competitive movement is mostly stop-start lateral work, so your shoe matters every rally.',
        note: 'Replace these before you replace a paddle if the outsole goes flat.',
        href: 'https://www.amazon.com/s?k=pickleball+court+shoes',
      },
      {
        title: 'Bulk outdoor balls for drilling',
        range: 'Usually $35 to $60',
        why: 'If you want to get good, repetition beats novelty.',
        note: 'This is the boring buy that serious players never regret.',
        href: 'https://www.amazon.com/s?k=Franklin+X-40+pickleball+balls+bulk',
      },
    ],
  },
}

const LESSONS: Record<LessonId, LessonCard> = {
  ready: {
    title: 'Ready position first',
    kicker: 'This replaces a lesson on day one.',
    cue: 'Paddle up, knees soft, chest facing the ball, tiny steps not lunges.',
    bullets: [
      'Stand wide enough to move, not so wide that you feel stuck.',
      'Keep the paddle in front of your chest so you can block fast balls.',
      'If you freeze, say this: split step, see ball, short feet.',
    ],
  },
  serve: {
    title: 'Serve simple and legal',
    kicker: 'You do not need a big weapon yet.',
    cue: 'Underhand, below the waist, crosscourt, and in.',
    bullets: [
      'Start from behind the baseline and send the ball deep, not fancy.',
      'A legal serve that lands in beats a risky ace attempt every time.',
      'After serving in doubles, stay back because the return still has to bounce.',
    ],
  },
  return: {
    title: 'Return deep, then move',
    kicker: 'This is how beginners steal time.',
    cue: 'Return deep and give yourself time to walk forward under control.',
    bullets: [
      'The serve must bounce and your return must bounce too, so use that time wisely.',
      'If you are the returner, your partner can already be near the kitchen.',
      'Your job after the return is not to rush. It is to arrive balanced.',
    ],
  },
  partner: {
    title: 'Move like a zipper',
    kicker: 'Most beginners lose shape before they lose points.',
    cue: 'Stay side by side with your partner and slide together.',
    bullets: [
      'When the ball goes left, both players shade left. When it goes right, both shade right.',
      'Avoid the giant middle gap by moving as a pair instead of as two solo players.',
      'Use simple calls: mine, yours, switch, bounce, out.',
    ],
  },
}

const COURT_VIEWS: Record<CourtViewId, CourtView> = {
  'serve-start': {
    title: 'Serving team starts deeper',
    caption:
      'In doubles, the serving side usually begins back because the return must bounce before you can attack.',
    callout: 'Serve in, expect the return, then work forward after the third shot.',
    players: [
      { label: 'You', x: 320, y: 352, tone: 'primary' },
      { label: 'Partner', x: 545, y: 338, tone: 'secondary' },
      { label: 'Receiver', x: 530, y: 88, tone: 'ghost' },
      { label: 'Receiver partner', x: 292, y: 154, tone: 'ghost' },
    ],
  },
  'return-start': {
    title: 'Returner back, partner up',
    caption:
      'The returner stays deeper to receive. The partner can already own the kitchen line.',
    callout: 'A deep return buys time so the returner can join the partner up front.',
    players: [
      { label: 'You', x: 540, y: 90, tone: 'primary' },
      { label: 'Partner', x: 300, y: 152, tone: 'secondary' },
      { label: 'Server', x: 312, y: 350, tone: 'ghost' },
      { label: 'Server partner', x: 550, y: 340, tone: 'ghost' },
    ],
  },
  'move-up': {
    title: 'Win by getting up together',
    caption:
      'Most beginner doubles gets easier when both partners arrive at the kitchen line in balance.',
    callout: 'Do not leave one player stranded at the baseline if the other has moved forward.',
    players: [
      { label: 'You', x: 330, y: 280, tone: 'primary' },
      { label: 'Partner', x: 530, y: 280, tone: 'secondary' },
      { label: 'Opponents', x: 330, y: 150, tone: 'ghost' },
      { label: 'Opponents', x: 530, y: 150, tone: 'ghost' },
    ],
  },
}

const STARTER_LADDER = [
  {
    level: 'Level 1',
    title: 'Get the ball in and keep it alive',
    copy: 'If you can serve in, return deep, and survive five shots, you are already playing real pickleball.',
  },
  {
    level: 'Level 2',
    title: 'Own the two-bounce rule',
    copy: 'Beginners rush. Strong beginners wait for the bounce, then move forward with purpose.',
  },
  {
    level: 'Level 3',
    title: 'Live at the kitchen line',
    copy: 'The best free lesson in pickleball is learning when to move up and how to stay there with your partner.',
  },
  {
    level: 'Level 4',
    title: 'Compete by making fewer mistakes',
    copy: 'You do not need highlights first. You need calm resets, smart feet, and a repeatable pre-serve routine.',
  },
]

const RULES = [
  'Serve underhand, below the waist, and crosscourt from behind the baseline.',
  'The serve and the return must both bounce before volleying begins.',
  'The kitchen is 7 feet from the net on each side. Do not volley there or fall in after a volley.',
  'In doubles, only the serving team scores. Most games go to 11 and you win by 2.',
]

const SOURCE_LINKS = [
  {
    label: 'USA Pickleball: How to Play Pickleball',
    href: 'https://usapickleball.org/blog/how-to-play-pickleball/',
  },
  {
    label: 'USA Pickleball: Official Rules',
    href: 'https://usapickleball.org/rules/',
  },
  {
    label: 'USA Pickleball: Doubles Strategy Tips',
    href: 'https://usapickleball.org/strategies/pickleball-doubles-strategy-tips/',
  },
  {
    label: 'Pickleheads: Best pickleball balls (updated Sep 24, 2025)',
    href: 'https://www.pickleheads.com/pickleball-gear/pickleball-balls',
  },
  {
    label: 'Pickleheads: Best pickleball sets',
    href: 'https://www.pickleheads.com/blog/pickleball-set',
  },
]

function App() {
  const [trackId, setTrackId] = useState<TrackId>('budget')
  const [lessonId, setLessonId] = useState<LessonId>('ready')
  const [courtViewId, setCourtViewId] = useState<CourtViewId>('serve-start')

  const track = STARTER_TRACKS[trackId]
  const lesson = LESSONS[lessonId]
  const courtView = COURT_VIEWS[courtViewId]

  const handlePrint = () => window.print()

  return (
    <div className="page-shell">
      <header className="topbar">
        <a className="brand" href="#top">
          Pickleball Start Here
        </a>
        <nav className="topnav" aria-label="Primary">
          <a href="#plan">Plan</a>
          <a href="#court">Court</a>
          <a href="#gear">Gear</a>
          <a href="#cheat-sheet">Cheat sheet</a>
        </nav>
        <button className="print-button" type="button" onClick={handlePrint}>
          Print one-page sheet
        </button>
      </header>

      <main id="top">
        <section className="hero-band">
          <div className="section-shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Phone-first beginner guide for real adults</p>
              <h1>
                Start pickleball without wasting money or booking lessons first.
              </h1>
              <p className="lead">
                This is built for someone who cares about health, wants to get good,
                uses an iPhone, and would rather learn fast than sift through forum
                noise. By the end, you will know what matters, what to buy, and what
                to print for court day.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#plan">
                  Show me the starter plan
                </a>
                <a className="button button-secondary" href="#cheat-sheet">
                  Jump to the cheat sheet
                </a>
              </div>

              <ul className="hero-metrics" aria-label="Quick facts">
                <li>
                  <strong>4</strong>
                  <span>rules that matter first</span>
                </li>
                <li>
                  <strong>{track.range}</strong>
                  <span>realistic starting spend</span>
                </li>
                <li>
                  <strong>1 page</strong>
                  <span>printable court-side summary</span>
                </li>
              </ul>
            </div>

            <aside className="hero-poster" aria-label="Today's plan">
              <p className="poster-kicker">Your current path</p>
              <h2>{track.label}</h2>
              <p className="poster-strap">{track.strap}</p>
              <p className="poster-copy">{track.promise}</p>
              <div className="poster-list">
                <span>What matters most</span>
                <ol>
                  <li>Real court shoes before a fancy paddle</li>
                  <li>Serve in, return deep, move with your partner</li>
                  <li>Print the sheet and stop overthinking</li>
                </ol>
              </div>
            </aside>
          </div>
        </section>

        <section className="band">
          <div className="section-shell reassurance">
            <div>
              <p className="eyebrow">What this site assumes</p>
              <h2>You do not need lessons before you start.</h2>
            </div>
            <p>
              You need four rules, safe movement, one simple doubles shape, and
              enough repetition to stop feeling stiff. Lessons can help later. They
              are not the barrier on day one.
            </p>
          </div>
        </section>

        <section className="band" id="plan">
          <div className="section-shell">
            <div className="section-heading">
              <p className="eyebrow">Step 1</p>
              <h2>Pick the version of “good” you want right now.</h2>
              <p>
                You can start cheap, start smart, or buy once for a more competitive
                path. Choose the lane that matches your actual behavior, not your
                best fantasy.
              </p>
            </div>

            <div className="track-switcher" role="tablist" aria-label="Starter paths">
              {(Object.keys(STARTER_TRACKS) as TrackId[]).map((id) => (
                <button
                  key={id}
                  className={id === trackId ? 'track-pill active' : 'track-pill'}
                  type="button"
                  aria-pressed={id === trackId}
                  onClick={() => {
                    startTransition(() => setTrackId(id))
                  }}
                >
                  <span>{STARTER_TRACKS[id].label}</span>
                  <small>{STARTER_TRACKS[id].range}</small>
                </button>
              ))}
            </div>

            <div className="plan-grid">
              <article className="plan-panel">
                <p className="panel-kicker">{track.strap}</p>
                <h3>{track.range}</h3>
                <p className="plan-copy">{track.promise}</p>
                <p className="reality-check">{track.realityCheck}</p>
              </article>

              <article className="list-panel">
                <h3>What to do this week</h3>
                <ol>
                  {track.firstWeek.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </article>

              <article className="list-panel">
                <h3>Buy in this order</h3>
                <ol>
                  {track.buyOrder.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </section>

        <section className="band tone-surface">
          <div className="section-shell">
            <div className="section-heading compact">
              <p className="eyebrow">Step 2</p>
              <h2>Learn it like levels, not lectures.</h2>
            </div>
            <div className="ladder-grid">
              {STARTER_LADDER.map((step) => (
                <article className="ladder-card" key={step.level}>
                  <p className="level-tag">{step.level}</p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band" id="court">
          <div className="section-shell court-layout">
            <div className="section-heading">
              <p className="eyebrow">Step 3</p>
              <h2>Stand in the right places and the game gets easier fast.</h2>
              <p>
                The biggest beginner mistake is not power. It is bad spacing. Tap a
                situation and use the map like a pocket lesson.
              </p>
            </div>

            <div className="court-controls" role="tablist" aria-label="Court situations">
              {(Object.keys(COURT_VIEWS) as CourtViewId[]).map((id) => (
                <button
                  key={id}
                  className={id === courtViewId ? 'situation-pill active' : 'situation-pill'}
                  type="button"
                  aria-pressed={id === courtViewId}
                  onClick={() => {
                    startTransition(() => setCourtViewId(id))
                  }}
                >
                  {COURT_VIEWS[id].title}
                </button>
              ))}
            </div>

            <div className="court-card">
              <div className="diagram-wrap">
                <svg
                  className="court-diagram"
                  viewBox="0 0 860 430"
                  role="img"
                  aria-label={courtView.title}
                >
                  <rect x="20" y="20" width="820" height="390" rx="28" className="court-fill" />
                  <rect x="20" y="20" width="820" height="390" rx="28" className="court-border" />
                  <line x1="20" y1="215" x2="840" y2="215" className="court-net" />
                  <line x1="20" y1="140" x2="840" y2="140" className="court-line" />
                  <line x1="20" y1="290" x2="840" y2="290" className="court-line" />
                  <line x1="430" y1="20" x2="430" y2="140" className="court-line" />
                  <line x1="430" y1="290" x2="430" y2="410" className="court-line" />
                  <text x="60" y="58" className="court-label">
                    Their side
                  </text>
                  <text x="60" y="395" className="court-label">
                    Your side
                  </text>

                  {courtView.players.map((player) => (
                    <g key={`${player.label}-${player.x}-${player.y}`}>
                      <circle
                        cx={player.x}
                        cy={player.y}
                        r="26"
                        className={`player-dot ${player.tone}`}
                      />
                      <text x={player.x} y={player.y + 6} textAnchor="middle" className="player-text">
                        {player.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <div className="court-copy">
                <p className="panel-kicker">Court cue</p>
                <h3>{courtView.title}</h3>
                <p>{courtView.caption}</p>
                <p className="callout">{courtView.callout}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="band tone-surface">
          <div className="section-shell">
            <div className="section-heading compact">
              <p className="eyebrow">Step 4</p>
              <h2>Use these four mini lessons instead of waiting for a coach.</h2>
            </div>

            <div className="lesson-grid">
              <div className="lesson-tabs" role="tablist" aria-label="Mini lessons">
                {(Object.keys(LESSONS) as LessonId[]).map((id) => (
                  <button
                    key={id}
                    className={id === lessonId ? 'lesson-pill active' : 'lesson-pill'}
                    type="button"
                    aria-pressed={id === lessonId}
                    onClick={() => {
                      startTransition(() => setLessonId(id))
                    }}
                  >
                    {LESSONS[id].title}
                  </button>
                ))}
              </div>

              <article className="lesson-card">
                <p className="panel-kicker">{lesson.kicker}</p>
                <h3>{lesson.title}</h3>
                <p className="cue-line">{lesson.cue}</p>
                <ul>
                  {lesson.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="band" id="gear">
          <div className="section-shell">
            <div className="section-heading">
              <p className="eyebrow">Step 5</p>
              <h2>Buy what gets you on court, not what flatters your feed.</h2>
              <p>
                Prices move, so treat these as smart lanes, not permanent truth.
                Shopping notes were researched on {RESEARCH_DATE}. Amazon links below
                are standard product or search links, not affiliate shortcuts.
              </p>
            </div>

            <div className="gear-grid">
              {track.gear.map((item) => (
                <article className="gear-card" key={item.title}>
                  <p className="gear-range">{item.range}</p>
                  <h3>{item.title}</h3>
                  <p>{item.why}</p>
                  <p className="gear-note">{item.note}</p>
                  <a className="button button-secondary" href={item.href} target="_blank" rel="noreferrer">
                    Open on Amazon
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="band tone-surface">
          <div className="section-shell rules-layout">
            <div className="section-heading compact">
              <p className="eyebrow">Step 6</p>
              <h2>The four rules that matter first.</h2>
            </div>
            <ol className="rules-list">
              {RULES.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="band" id="cheat-sheet">
          <div className="section-shell cheat-shell">
            <div className="section-heading compact">
              <p className="eyebrow">Final step</p>
              <h2>Print this one-page sheet and take it to the court.</h2>
              <p>
                Pick your gear lane first, then print. The paper version hides the
                fluff and keeps only the cues you need.
              </p>
            </div>

            <div className="cheat-actions">
              <button className="button button-primary" type="button" onClick={handlePrint}>
                Print cheat sheet
              </button>
              <a className="button button-secondary" href="#gear">
                Review the buy list again
              </a>
            </div>

            <article className="print-sheet" id="print-sheet">
              <header className="print-sheet-header">
                <div>
                  <p className="print-kicker">Court-side cheat sheet</p>
                  <h3>Pickleball Start Here</h3>
                </div>
                <p className="print-track">
                  {track.label} - {track.range}
                </p>
              </header>

              <div className="print-grid">
                <section>
                  <h4>Say this to yourself</h4>
                  <ul>
                    <li>Serve in.</li>
                    <li>Return deep.</li>
                    <li>Let the first two shots bounce.</li>
                    <li>Move up with my partner.</li>
                  </ul>
                </section>

                <section>
                  <h4>Four rules</h4>
                  <ul>
                    {RULES.map((rule) => (
                      <li key={rule}>{rule}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4>Where to stand</h4>
                  <ul>
                    <li>Serving team starts deeper.</li>
                    <li>Returner starts back, partner can already be near the kitchen.</li>
                    <li>After the return, move up together side by side.</li>
                    <li>Slide like a zipper. Do not abandon the middle.</li>
                  </ul>
                </section>

                <section>
                  <h4>Starter shopping list</h4>
                  <ul>
                    {track.gear.map((item) => (
                      <li key={item.title}>
                        {item.title} - {item.range}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <footer className="print-footer">
                Researched on {RESEARCH_DATE}. Rules summary based on USA Pickleball.
              </footer>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-shell footer-grid">
          <div>
            <h2>Useful sources</h2>
            <ul className="source-list">
              {SOURCE_LINKS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-note">
            <p>
              Pickleball is easy to learn and strategic enough to chase for years.
              Start with control, health, and repetition. The fancy gear can wait.
            </p>
          </div>
        </div>
      </footer>

      <div className="mobile-dock">
        <a href="#gear">Shop</a>
        <button type="button" onClick={handlePrint}>
          Print sheet
        </button>
      </div>
    </div>
  )
}

export default App

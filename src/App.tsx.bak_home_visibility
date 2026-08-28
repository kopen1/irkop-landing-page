


import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  ExternalLink,
  Layers3,
  Menu,
  Rocket,
  Sparkles,
  X,
} from 'lucide-react'
import { supabase } from './lib/supabase'
import { startTracking, track } from './lib/tracking'
import './style.css'

type AppItem = {
  id: string
  name: string
  package_name: string | null
  description: string | null
  is_active: boolean
}

type Release = {
  id: string
  app_id: string
  version: string
  version_code: number
  download_url: string | null
  changelog: string | null
  is_latest: boolean
}

type WebsiteConfig = {
  website_hero_title: string
  website_hero_description: string
  website_hero_button_text: string
  website_hero_button_url: string
  website_about_title: string
  website_about_description: string
  website_download_title: string
  website_download_description: string
  website_section_hero_enabled: string
  website_section_apps_enabled: string
  website_section_about_enabled: string
  website_section_download_enabled: string
}

type Stats = {
  total_visitors: number
  total_page_views: number
  total_downloads: number
  visitors_today: number
  page_views_today: number
  downloads_today: number
}

const DEFAULT_CONFIG: WebsiteConfig = {
  website_hero_title: 'IRKOP CENTRAL HUB',
  website_hero_description:
    'Satu pusat untuk aplikasi, tools, dan project digital IRKOP.',
  website_hero_button_text: 'Jelajahi Apps',
  website_hero_button_url: '#apps',
  website_about_title: 'Ekosistem digital IRKOP',
  website_about_description:
    'IRKOP Central Hub menghubungkan aplikasi, tools, project, dan layanan digital dalam satu tempat.',
  website_download_title: 'Download Aplikasi',
  website_download_description:
    'Dapatkan aplikasi IRKOP melalui link resmi dan gunakan versi terbaru.',
  website_section_hero_enabled: 'true',
  website_section_apps_enabled: 'true',
  website_section_about_enabled: 'true',
  website_section_download_enabled: 'true',
}

function IrIcon({ small = false }: { small?: boolean }) {
  return (
    <span className={`ir-logo ${small ? 'ir-logo-small' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 64 64" fill="none">
        <defs>
          <linearGradient id="irGradient" x1="7" y1="5" x2="57" y2="59">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        <rect x="3" y="3" width="58" height="58" rx="17" fill="url(#irGradient)" />
        <path
          d="M19 17v30M19 17h12c8 0 12 4 12 10s-4 10-12 10H19M31 37l12 10"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function AppIcon({ index }: { index: number }) {
  const letters = ['EF', 'TD', 'SI', 'IR']
  return (
    <div className={`app-icon app-icon-${index % 4}`}>
      <span>{letters[index % 4]}</span>
    </div>
  )
}

// ========== KOMPONEN FLOW VISUAL (Panel → Database → Apps) ==========
function FlowVisual({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? 'flow-visual-small' : ''}>
      <div className="irkop-flow" aria-label="Panel Database Apps">
        <div className="irkop-flow-pulse" />

        <div className="irkop-flow-node">
          <div className="irkop-flow-icon panel-icon">▣</div>
          <div className="irkop-flow-title">Panel</div>
          <div className="irkop-flow-subtitle">Kelola semua konten</div>
        </div>

        <div className="irkop-flow-link" />

        <div className="irkop-flow-node">
          <div className="irkop-flow-icon db-icon">⚡</div>
          <div className="irkop-flow-title">Database</div>
          <div className="irkop-flow-subtitle">Satu sumber data</div>
        </div>

        <div className="irkop-flow-link" />

        <div className="irkop-flow-node">
          <div className="irkop-flow-icon apps-icon">◈</div>
          <div className="irkop-flow-title">Apps</div>
          <div className="irkop-flow-subtitle">Data &amp; layanan terhubung</div>
        </div>
      </div>
    </div>
  )
}

function DeviceVisual() {
  return (
    <div className="device-stage" aria-hidden="true">
      <div className="orb orb-one" />
      <div className="orb orb-two" />

      <div className="device-back-card device-back-one">
        <div className="mini-window">
          <div className="mini-dots">
            <i /><i /><i />
          </div>
          <div className="mini-lines">
            <span /><span /><span />
          </div>
        </div>
      </div>

      <div className="device-back-card device-back-two">
        <div className="floating-symbol">✦</div>
      </div>

      <div className="phone">
        <div className="phone-top"><span /></div>
        <div className="phone-screen">
          <div className="screen-header">
            <IrIcon small />
            <span>IRKOP</span>
          </div>
          <div className="screen-title">Apps &amp;<br />Projects</div>
          <div className="screen-card">
            <AppIcon index={0} />
            <div><strong>EFB Switcher</strong><small>Latest version</small></div>
          </div>
          <div className="screen-card">
            <AppIcon index={1} />
            <div><strong>Tasbih Digital</strong><small>Ready to use</small></div>
          </div>
          <div className="screen-footer">
            <span>3 Apps</span>
            <span>12 Releases</span>
          </div>
        </div>
      </div>

      <div className="tablet">
        <div className="tablet-screen">
          <div className="tablet-header">
            <span>IRKOP CENTRAL HUB</span>
            <b>•••</b>
          </div>
          <div className="tablet-heading">Your digital<br />ecosystem.</div>
          <div className="tablet-grid">
            <div><AppIcon index={0} /><b>Apps</b></div>
            <div><AppIcon index={1} /><b>Tools</b></div>
            <div><AppIcon index={2} /><b>Projects</b></div>
            <div><AppIcon index={3} /><b>More</b></div>
          </div>
        </div>
      </div>

      <div className="floating-card floating-card-top">
        <Sparkles size={15} />
        <span>One Central Hub</span>
      </div>
      <div className="floating-card floating-card-bottom">
        <Check size={15} />
        <span>Connected</span>
      </div>
    </div>
  )
}

export default function App() {
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const [apps, setApps] = useState<AppItem[]>([])
  const [releases, setReleases] = useState<Release[]>([])
  const [stats, setStats] = useState<Stats>({
    total_visitors: 0,
    total_page_views: 0,
    total_downloads: 0,
    visitors_today: 0,
    page_views_today: 0,
    downloads_today: 0,
  })
  const [loading, setLoading] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [heroActive, setHeroActive] = useState(false)

  useEffect(() => {
    startTracking()
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible')
      }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [configResult, appsResult, releasesResult, statsResult] = await Promise.all([
        supabase.from('global_config').select('key, value'),
        supabase.from('apps').select('id, name, package_name, description, is_active').eq('is_active', true).order('name'),
        supabase.from('app_releases').select('id, app_id, version, version_code, download_url, changelog, is_latest').eq('is_latest', true).order('created_at', { ascending: false }),
        supabase.from('v_website_stats').select('total_visitors, total_page_views, total_downloads, visitors_today, page_views_today, downloads_today').maybeSingle(),
      ])

      if (!configResult.error) {
        const next = { ...DEFAULT_CONFIG }
        for (const row of configResult.data ?? []) {
          if (row.key in next) (next as Record<string, string>)[row.key] = row.value
        }
        setConfig(next)
      }
      if (!appsResult.error) setApps(appsResult.data ?? [])
      if (!releasesResult.error) setReleases(releasesResult.data ?? [])
      if (!statsResult.error && statsResult.data) setStats(statsResult.data)
      setLoading(false)
    }
    void load()
  }, [])

  useEffect(() => {
    const refreshReveal = () => {
      document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          el.classList.add('is-visible')
        }
      })
    }
    window.addEventListener('scroll', refreshReveal, { passive: true })
    refreshReveal()
    return () => window.removeEventListener('scroll', refreshReveal)
  }, [loading, apps.length])

  const releaseByApp = useMemo(() => {
    const map = new Map<string, Release>()
    releases.forEach(release => map.set(release.app_id, release))
    return map
  }, [releases])

  const statsItems = [
    { value: stats.total_downloads, label: 'Downloads' },
    { value: apps.length, label: 'Apps' },
    { value: releases.length, label: 'Releases' },
    { value: 100, label: 'Free', suffix: '%' },
  ]

  function handleHeroClick() {
    setHeroActive(false)
    requestAnimationFrame(() => {
      setHeroActive(true)
      window.setTimeout(() => setHeroActive(false), 700)
    })
  }

  function closeMobile() { setMobileMenu(false) }

  function download(app: AppItem, release: Release) {
    void track('download', app.id)
    if (release.download_url) window.open(release.download_url, '_blank', 'noopener,noreferrer')
  }

  const heroEnabled = config.website_section_hero_enabled !== 'false'
  const appsEnabled = config.website_section_apps_enabled !== 'false'
  const aboutEnabled = config.website_section_about_enabled !== 'false'
  const downloadEnabled = config.website_section_download_enabled !== 'false'

  return (
    <div className="site-shell">
      <header className="irkop-navbar">
        <div className="nav-inner">
          <a className="brand" href="#top" onClick={closeMobile}>
            <IrIcon small /><span>IRKOP</span>
          </a>
          <nav className={`desktop-nav ${mobileMenu ? 'mobile-open' : ''}`}>
            <a href="#top" onClick={closeMobile}>Home</a>
            <a href="#apps" onClick={closeMobile}>Apps</a>
            <a href="#about" onClick={closeMobile}>About</a>
            <a href="#download" onClick={closeMobile}>Download</a>
          </nav>
          <a className="nav-button" href="#apps" onClick={closeMobile}>
            Explore Apps <ArrowRight size={15} />
          </a>
          <button className="mobile-toggle" onClick={() => setMobileMenu(v => !v)} aria-label="Menu">
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        {heroEnabled && (
          <section id="top" className={`hero-section ${heroActive ? 'hero-active' : ''}`} onClick={handleHeroClick}>
            <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
            <div className="container hero-inner">
              <div className="hero-copy reveal is-visible">
                <div className="eyebrow"><span className="eyebrow-dot" />IRKOP CENTRAL HUB</div>
                <h1>{config.website_hero_title}</h1>
                <p>{config.website_hero_description}</p>
                <div className="hero-actions">
                  <a className="primary-button" href={config.website_hero_button_url || '#apps'} onClick={e => e.stopPropagation()}>
                    {config.website_hero_button_text} <ArrowRight size={17} />
                  </a>
                  <a className="secondary-button" href="#about" onClick={e => e.stopPropagation()}>Tentang IRKOP</a>
                </div>
                <div className="hero-trust">
                  <div className="trust-icons">
                    <span><Check size={12} /></span>
                    <span><Layers3 size={12} /></span>
                    <span><Rocket size={12} /></span>
                  </div>
                  <div><strong>Satu Panel • Satu Database</strong><small>Banyak manfaat untuk ekosistem IRKOP</small></div>
                </div>
              </div>
              <DeviceVisual />
            </div>
          </section>
        )}

        {appsEnabled && (
          <section id="apps" className="content-section apps-section">
            <div className="container">
              <div className="section-heading reveal">
                <div>
                  <span className="section-kicker">APPLICATIONS</span>
                  <h2>Featured Apps</h2>
                  <p>Aplikasi IRKOP yang tersedia untuk digunakan.</p>
                </div>
                <a className="text-link" href="#download">Lihat Download <ChevronRight size={16} /></a>
              </div>
              {loading ? (
                <div className="app-grid">
                  {[1,2,3].map(i => <div className="app-card skeleton-card" key={i} />)}
                </div>
              ) : apps.length === 0 ? (
                <div className="empty-card">Belum ada aplikasi aktif.</div>
              ) : (
                <div className="app-grid">
                  {apps.map((app, index) => {
                    const release = releaseByApp.get(app.id)
                    return (
                      <article className="app-card reveal" key={app.id}>
                        <div className="app-card-top">
                          <AppIcon index={index} />
                          {release && <span className="version-badge">v{release.version}</span>}
                        </div>
                        <h3>{app.name}</h3>
                        <p className="changelog">{release?.changelog || 'Aplikasi digital dari ekosistem IRKOP.'}</p>
                        <div className="app-card-footer">
                          <span>{app.package_name || 'IRKOP Application'}</span>
                          {release?.download_url ? (
                            <button className="small-download" onClick={() => download(app, release)}>
                              <Download size={14} /> Download
                            </button>
                          ) : (
                            <span className="details-label">Coming soon</span>
                          )}
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="stats-strip reveal">
          <div className="container stats-grid">
            {statsItems.map(item => (
              <div className="stat-item" key={item.label}>
                <strong>
                  {item.value.toLocaleString()}
                  {item.suffix || ''}
                  {item.label === 'Downloads' && item.value > 999 ? '+' : ''}
                </strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ======== ABOUT DENGAN FLOW VISUAL ======== */}
        {aboutEnabled && (
          <section id="about" className="about-section content-section">
            <div className="container about-grid">
              <div className="about-visual reveal">
                <div className="about-panel" style={{ overflow: 'visible', minHeight: '280px' }}>
                  <div className="about-panel-header">
                    <IrIcon small />
                    <div>
                      <strong>IRKOP CENTRAL HUB</strong>
                      <span>Connected ecosystem</span>
                    </div>
                  </div>

                  {/* ==== FLOW VISUAL (Panel → Database → Apps) ==== */}
                  <FlowVisual small />

                  <div className="about-checks">
                    <span><Check size={14} /> Satu sumber data</span>
                    <span><Check size={14} /> Real-time update</span>
                    <span><Check size={14} /> Aman &amp; terpusat</span>
                    <span><Check size={14} /> Mudah dikembangkan</span>
                  </div>
                </div>
              </div>

              <div className="about-copy reveal">
                <span className="section-kicker">ABOUT IRKOP</span>
                <h2>{config.website_about_title}</h2>
                <p>{config.website_about_description}</p>
                <div className="feature-list">
                  <div>
                    <span className="feature-number">01</span>
                    <div>
                      <strong>Centralized</strong>
                      <p>Semua aplikasi dan informasi berada dalam satu hub.</p>
                    </div>
                  </div>
                  <div>
                    <span className="feature-number">02</span>
                    <div>
                      <strong>Connected</strong>
                      <p>Panel, database, dan landing page terhubung.</p>
                    </div>
                  </div>
                  <div>
                    <span className="feature-number">03</span>
                    <div>
                      <strong>Continuously Updated</strong>
                      <p>Release terbaru dapat langsung ditampilkan.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {downloadEnabled && (
          <section id="download" className="download-section content-section">
            <div className="container">
              <div className="download-box reveal">
                <div className="download-glow" />
                <div className="download-copy">
                  <span className="section-kicker light">DOWNLOAD</span>
                  <h2>{config.website_download_title}</h2>
                  <p>{config.website_download_description}</p>
                </div>
                <div className="download-list">
                  {apps.length === 0 ? (
                    <div className="download-empty">Belum ada aplikasi yang tersedia.</div>
                  ) : (
                    apps.map((app, index) => {
                      const release = releaseByApp.get(app.id)
                      return (
                        <div className="download-row" key={app.id}>
                          <AppIcon index={index} />
                          <div className="download-row-info">
                            <strong>{app.name}</strong>
                            <span>{release ? `Latest v${release.version}` : 'Release belum tersedia'}</span>
                          </div>
                          {release?.download_url ? (
                            <button className="download-row-button" onClick={() => download(app, release)}>
                              Download <ExternalLink size={14} />
                            </button>
                          ) : (
                            <span className="not-ready">Unavailable</span>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <IrIcon small />
            <span>IRKOP CENTRAL HUB</span>
          </div>
          <span>Apps • Tools • Projects</span>
          <a href="#top">Back to top <ArrowRight size={14} /></a>
        </div>
      </footer>
    </div>
  )
}

import { supabase } from './supabase'

const VISITOR_KEY = 'irkop_visitor_id'
const SESSION_KEY = 'irkop_session_tracked'

function getVisitorId(): string {
  let id = localStorage.getItem(VISITOR_KEY)

  if (!id) {
    id =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`

    localStorage.setItem(VISITOR_KEY, id)
  }

  return id
}

export async function track(
  eventType: 'visit' | 'page_view' | 'download',
  appId?: string
) {
  try {
    const visitorId = getVisitorId()

    const { error } = await supabase
      .from('website_events')
      .insert({
        event_type: eventType,
        app_id: appId || null,
        path: window.location.pathname || '/',
        visitor_id: visitorId,
        user_agent: navigator.userAgent,
      })

    if (error) {
      console.warn('[tracking]', error.message)
    }
  } catch (error) {
    // Tracking tidak boleh mengganggu website.
    console.warn('[tracking]', error)
  }
}

export function startTracking() {
  /*
   * VISIT:
   * Hanya sekali dalam satu browser session.
   *
   * PAGE VIEW:
   * Dicatat setiap kali landing page dimuat.
   *
   * Karena landing page Irkop adalah single-page (/),
   * tidak ada route/page terpisah yang perlu dilacak.
   */
  if (!sessionStorage.getItem(SESSION_KEY)) {
    sessionStorage.setItem(SESSION_KEY, '1')
    void track('visit')
  }

  void track('page_view')
}

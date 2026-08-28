import { supabase } from './supabase'

const VISITOR_KEY = 'irkop_visitor_id'
const SESSION_KEY = 'irkop_session_tracked'

let memoryVisitorId: string | null = null

function getVisitorId(): string {
  if (memoryVisitorId) return memoryVisitorId

  try {
    const saved = localStorage.getItem(VISITOR_KEY)
    if (saved) {
      memoryVisitorId = saved
      return saved
    }
  } catch {}

  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`

  memoryVisitorId = id

  try {
    localStorage.setItem(VISITOR_KEY, id)
  } catch {}

  return id
}

export async function track(
  eventType: 'visit' | 'page_view' | 'download',
  appId?: string,
) {
  try {
    const { error } = await supabase.from('website_events').insert({
      event_type: eventType,
      app_id: appId || null,
      path: window.location.pathname || '/',
      visitor_id: getVisitorId(),
      user_agent: navigator.userAgent || null,
    })

    if (error) {
      console.warn('[IRKOP tracking]', error.message)
    }
  } catch (error) {
    console.warn('[IRKOP tracking]', error)
  }
}

export function startTracking() {
  let tracked = false

  try {
    tracked = sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {}

  if (!tracked) {
    try {
      sessionStorage.setItem(SESSION_KEY, '1')
    } catch {}

    void track('visit')
  }

  void track('page_view')
}

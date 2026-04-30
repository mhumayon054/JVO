const FALLBACK_URL = 'http://localhost:1337'

export const STRAPI_URL = (import.meta.env.VITE_STRAPI_URL || FALLBACK_URL).replace(/\/$/, '')

function qs(params = {}) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === '') continue
    search.append(key, String(value))
  }
  return search.toString()
}

async function strapiRequest(path, { method = 'GET', body, query, signal } = {}) {
  const url = `${STRAPI_URL}${path}${query ? `?${qs(query)}` : ''}`
  const init = {
    method,
    headers: { 'Content-Type': 'application/json' },
    signal,
  }
  if (body) init.body = JSON.stringify(body)

  const response = await fetch(url, init)
  let payload = null
  try {
    payload = await response.json()
  } catch {
    payload = null
  }
  if (!response.ok) {
    const message = payload?.error?.message || `Strapi request failed: ${response.status}`
    const error = new Error(message)
    error.status = response.status
    error.payload = payload
    throw error
  }
  return payload
}

export function getStrapiMediaUrl(media) {
  const url = media?.url || media?.formats?.large?.url || media?.formats?.medium?.url || media?.formats?.small?.url
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${STRAPI_URL}${url}`
}

const sharedReadQuery = {
  'pagination[pageSize]': 100,
}

export async function getInsights() {
  const res = await strapiRequest('/api/insight-articles', {
    query: {
      ...sharedReadQuery,
      'populate[image]': '*',
      sort: 'order:asc,publishedAtCustom:desc,publishedAt:desc',
    },
  })
  return res?.data || []
}

export async function getFeaturedInsights() {
  const res = await strapiRequest('/api/insight-articles', {
    query: {
      ...sharedReadQuery,
      'populate[image]': '*',
      'filters[featured][$eq]': true,
      sort: 'order:asc,publishedAtCustom:desc,publishedAt:desc',
    },
  })
  return res?.data || []
}

export async function subscribeNewsletter(email, sourcePage = 'insights') {
  return strapiRequest('/api/newsletter-subscribers', {
    method: 'POST',
    body: {
      data: {
        email,
        sourcePage,
        active: true,
        subscribedAt: new Date().toISOString(),
      },
    },
  })
}

export async function submitContact(payload) {
  const budgetMap = {
    '10k-25k': 'range_10k_25k',
    '25k-100k': 'range_25k_100k',
    '100k-500k': 'range_100k_500k',
    '500k+': 'range_500k_plus',
  }
  return strapiRequest('/api/contact-submissions', {
    method: 'POST',
    body: {
      data: {
        ...payload,
        budgetRange: budgetMap[payload.budgetRange] || payload.budgetRange,
      },
    },
  })
}

export async function getServices() {
  const res = await strapiRequest('/api/services', {
    query: {
      ...sharedReadQuery,
      'populate[icon]': '*',
      'populate[image]': '*',
      sort: 'order:asc',
      'filters[active][$eq]': true,
    },
  })
  return res?.data || []
}

export async function getCaseStudies() {
  const res = await strapiRequest('/api/case-studies', {
    query: {
      ...sharedReadQuery,
      'populate[image]': '*',
      sort: 'order:asc',
    },
  })
  return res?.data || []
}

export async function getTeamMembers() {
  const res = await strapiRequest('/api/team-members', {
    query: {
      ...sharedReadQuery,
      'populate[image]': '*',
      sort: 'order:asc',
      'filters[active][$eq]': true,
    },
  })
  return res?.data || []
}

export async function getSquadMembers() {
  const res = await strapiRequest('/api/squad-members', {
    query: {
      ...sharedReadQuery,
      'populate[image]': '*',
      sort: 'order:asc',
      'filters[active][$eq]': true,
    },
  })
  return res?.data || []
}

export async function submitSquadBrief(payload) {
  return strapiRequest('/api/squad-brief-submissions', {
    method: 'POST',
    body: { data: payload },
  })
}

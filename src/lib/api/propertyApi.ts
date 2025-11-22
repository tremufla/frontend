export type CreatePropertyPayload = {
  name: string
  city?: string
  state?: string
  latitude: number
  longitude: number
}

export async function createProperty(payload: CreatePropertyPayload) {
  const res = await fetch('/api/properties', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => null)
    throw new Error(errBody?.error || 'Failed to create property')
  }

  return res.json()
}

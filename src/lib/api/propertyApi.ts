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

export async function getProperty(id: string) {
  const res = await fetch(`/api/properties/${id}`)

  if (!res.ok) {
    const errBody = await res.json().catch(() => null)
    throw new Error(errBody?.error || 'Failed to fetch property')
  }

  return res.json()
}

export async function updateProperty(id: string, payload: Partial<CreatePropertyPayload>) {
  const res = await fetch(`/api/properties/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => null)
    throw new Error(errBody?.error || 'Failed to update property')
  }

  return res.json()
}

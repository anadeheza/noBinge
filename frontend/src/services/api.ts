const BASE_URL = "https://binge-awareness-backend.onrender.com";

const getToken = () => localStorage.getItem('token')

export const api = {
  post: async (path: string, body: unknown, auth = false) => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (auth) headers['Authorization'] = `Bearer ${getToken()}`

    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Error desconocido')
    return data
  },

  get: async (path: string) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Error desconocido')
    return data
  },
}
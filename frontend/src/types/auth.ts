export type User = {
  id: number
  email: string
  name: string
}

export type AuthResponse = {
  token: string
  user: User
}
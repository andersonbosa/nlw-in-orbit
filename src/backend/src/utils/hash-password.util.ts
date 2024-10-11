import { hash } from 'bcrypt'

export async function hashPassword(password: string) {
  return hash(password, 12)
}

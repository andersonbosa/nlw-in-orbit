import { hash } from 'bcrypt'
import { dbOrm } from '../db/client'
import { users } from '../db/schema'

interface SignUpRequest {
  email: string
  password: string
}

export async function signUpFunction({ email, password }: SignUpRequest) {
  const passwordHash = await hash(password, 32)

  // const insertResult = await dbOrm
  //   .insert(users)
  //   .values({ email, password: passwordHash })
  //   .returning()

  // const user = insertResult[0]

  return {
    // user
  }
}

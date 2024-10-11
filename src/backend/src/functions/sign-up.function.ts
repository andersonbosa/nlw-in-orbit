import { dbOrm } from '../db/client'
import { users } from '../db/schema'
import { hashPassword } from '../utils/hash-password.util'

export namespace SignUpRequest {
  export interface SignUpInput {
    username: string
    email: string
    password: string
  }

  export interface SignUpOutput {}

  export async function signUpFunction(
    input: SignUpInput
  ): Promise<SignUpOutput> {
    const usersAdded = await dbOrm
      .insert(users)
      .values({
        username: input.username,
        email: input.email,
        passwordHash: await hashPassword(input.password),
      })
      .returning()

    return {
      user: usersAdded[0],
    }
  }
}

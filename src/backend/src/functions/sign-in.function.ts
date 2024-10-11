import { eq } from 'drizzle-orm'

import { dbOrm } from '../db/client'
import { users } from '../db/schema'
import { compare } from 'bcrypt'
import { env } from '../env'
import jwt from 'jsonwebtoken'

export namespace SignInFunction {
  export interface SignInInput {
    email: string
    password: string
  }

  export interface SignInOutput {
    token: string
  }

  export class InvalidCredentialsError extends Error {
    constructor() {
      super('Invalid credentials')
      this.name = 'InvalidCredentialsError'
    }
  }

  export async function signInFunction({
    email,
    password,
  }: SignInInput): Promise<SignInOutput> {
    const queryResult = await dbOrm
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    const user = queryResult[0]
    if (!user || !(await compare(password, user.passwordHash))) {
      throw new InvalidCredentialsError()
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '24h',
    })

    return {
      token,
    }
  }
}

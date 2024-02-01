import LoginForm from '@/app/_components/forms/login'
import React, { Suspense } from 'react'

export default function SignIn() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  )
}

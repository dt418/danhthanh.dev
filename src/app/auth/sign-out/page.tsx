'use client'

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

function SignOutPage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <Button onClick={() => signOut({ callbackUrl: '/' })}>Log out</Button>
    </main>
  )
}

export default SignOutPage

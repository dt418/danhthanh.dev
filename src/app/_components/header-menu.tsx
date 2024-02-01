'use client'

import * as React from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function HeaderMenu() {
  return (
    <nav>
      <ul className="flex flex-row gap-4">
        <li>
          <Button asChild variant={'link'}>
            <Link href="/">Home</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant={'link'}>
            <Link href="/projects">Project</Link>
          </Button>
        </li>
        <li>
          <Button asChild variant={'link'}>
            <Link href="/contact">Contact</Link>
          </Button>
        </li>
      </ul>
    </nav>
  )
}

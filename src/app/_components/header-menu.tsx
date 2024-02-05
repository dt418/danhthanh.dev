'use client'

import * as React from 'react'
import Link from 'next/link'

export default function HeaderMenu() {
  return (
    <nav>
      <ul className="flex flex-col gap-4 md:flex-row">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/projects">Project</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  )
}

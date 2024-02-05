'use client'
import { cn } from '@/lib/utils'
import React, { type ComponentPropsWithoutRef } from 'react'

type HeaderWrapProps = ComponentPropsWithoutRef<'div'>

export default function HeaderWrap(props: HeaderWrapProps) {
  return (
    <div
      className={cn(
        'container flex-col items-center justify-between space-y-4 py-4 md:flex md:flex-row',
      )}
    >
      {props.children}
    </div>
  )
}

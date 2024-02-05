import React from 'react'
import HeaderInfo from '../header-info'
import HeaderMenu from '../header-menu'
import { MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import HeaderWrap from '../header-wrap'

const Header = async () => {
  return (
    <header>
      <HeaderWrap>
        <HeaderMenu />
        <HeaderInfo />
      </HeaderWrap>
      <div className="absolute right-8 top-4 md:hidden">
        <Button variant="ghost">
          <MenuIcon />
        </Button>
      </div>
    </header>
  )
}

export default Header

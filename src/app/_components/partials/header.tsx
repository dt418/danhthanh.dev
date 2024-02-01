import React from 'react'
import HeaderInfo from '../header-info'
import HeaderMenu from '../header-menu'

const Header = async () => {
  return (
    <header>
      <div className="container flex flex-row justify-between gap-2 py-4">
        <HeaderMenu />
        <HeaderInfo />
      </div>
    </header>
  )
}

export default Header

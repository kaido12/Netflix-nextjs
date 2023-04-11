import React, { FC } from 'react';

interface NavbarItemProps {
    label: string
}

const NavbarItem: FC<NavbarItemProps> = ({label}) => {
  return (
    <div className='text-white cursor-pointer transition hover:text-gray-300 '>
        {label}
    </div>
  )
}

export default NavbarItem;
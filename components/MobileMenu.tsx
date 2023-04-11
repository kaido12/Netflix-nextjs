import React, {FC} from 'react';

interface MobileMenuProps {
    visible?: boolean
}

const MobileMenu: FC<MobileMenuProps>  = ({ visible }) => {

    if (!visible) {
        return null
    }
  return (
    <>
        <div className="bg-black w-56 absolute top-8 left-0 flex flex-col border-2 border-gray-800 ">
            <div className="flex flex-col">
                <div className="px-3 text-center text-white hover:underline">
                    Home
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Popular
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Recently Added
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    TV Shows
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Movies
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Anime
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    My List
                </div>
                <div className="px-3 text-center text-white hover:underline">
                    Browse by language
                </div>
            </div>
        </div>
    </>
  )
}

export default MobileMenu
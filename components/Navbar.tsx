import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { FiChevronDown } from "react-icons/fi";
import { useState, useCallback, useEffect } from "react";
import {BiSearch, BiBell} from "react-icons/bi"
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current)
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true)
      } else {
        setShowBackground(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav className="w-full fixed z-20">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? 'bg-zinc-700/90' : ''}`}>
        <img src="./images/logo.png" className="h-4 lg:h-7" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Popular" />
          <NavbarItem label="Recently Added" />
          <NavbarItem label="TV Shows" />
          <NavbarItem label="Movies" />
          <NavbarItem label="Anime" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by language" />
        </div>
        {/* This will be shown at smaller screens */}
        <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-4 cursor-pointer relative">
          <p className="text-white text-sm">Browse</p>
          <FiChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180": "rotate-0"}`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BiSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BiBell />
          </div>

          <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="./images/default-slate.png" alt="logo" />
            </div>
            <FiChevronDown className={`text-white transition ${showAccountMenu ? "rotate-180": "rotate-0"}`} />
            <AccountMenu visible={showAccountMenu}/>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

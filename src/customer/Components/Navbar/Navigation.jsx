import {  useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/Auth/Action";
import AuthModal from "../Auth/AuthModal";

import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import UserMenu from "./UserMenu";
import CartButton from "./CartButton";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { auth, cart } = useSelector((store) => store);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());

  };

  return (
    <div>
      <MobileMenu open={open} setOpen={setOpen} auth={auth} onLogout={handleLogout} />
      <header className="relative bg-gray-900">
        <nav className="mx-auto border-b border-gray-700">
          <div className="flex h-16 items-center px-11">
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="rounded-md bg-gray-800 p-2 text-gray-400 md:hidden"
              onClick={() => setOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              ☰
            </button>

            {/* Logo */}
            <div className="ml-4 flex lg:ml-0">
              <Link to="/">
                <img
                  src="https://i.pinimg.com/originals/41/ef/66/41ef66029ffacf3c2edbfbea7c758b51.jpg"
                  alt="shopWithLenin"
                  className="h-8 w-8 mr-2"
                />
              </Link>
            </div>

            {/* Desktop Menu */}
            <DesktopMenu />

            <div className="ml-auto flex items-center space-x-4">
              <UserMenu auth={auth} onLogout={handleLogout} openAuthModal={() => setOpenAuthModal(true)} />
              <CartButton count={cart.cart?.totalItem ?? 0} />
            </div>
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      <AuthModal
        open={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        handleClose={() => setOpenAuthModal(false)}
      />
    </div>
  );
}

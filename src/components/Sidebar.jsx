import { Link } from "react-router-dom";
import {
  MdOutlineShoppingBag,
  MdOutlineFolder,
  MdOutlinePerson,
  MdOutlinePowerSettingsNew,
  MdOutlineSettings,
  MdOutlineLabel,
  MdOutlineReceipt,
  MdOutlineDashboard,
  MdOutlineShield,
} from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import {
  HomeIcon,
  CubeIcon,
  TagIcon,
  ReceiptRefundIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <aside className="bg-gradient-to-bl from-[#4F72DF] to-[#385ED1] w-[80px] md:w-[260px] h-screen fixed left-0 top-0 z-10">
      {/* Logo */}
      <div className="w-full flex items-center justify-center md:justify-start px-5">
        <Link
          to="/"
          className="text-white font-bold text-xl tracking-tight flex items-center gap-2 border-b border-white/20 w-full py-5"
        >
          <MdOutlineShield size={20} />
          <p className="hidden md:block tracking-tight">
            Admin
            <span className="text-[#F6C442]">Area</span>
          </p>
        </Link>
      </div>
      {/* Links */}
      <div className="w-full  h-[calc(100vh-64px)] p-5 flex flex-col justify-between">
        <div>
          <span className="text-xs text-white/50 mb-2 block uppercase tracking-wide">
            Menu
          </span>
          <ul>
            <li>
              <Link
                to="/"
                className="flex text-white/80 items-center gap-2 p-3 rounded-md hover:text-white hover:bg-white/10 transition-all hover:shadow-sm"
              >
                <MdOutlineDashboard size={20} />
                <span className="hidden md:block">Tableau de bord</span>
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="flex text-white/80 items-center gap-2 p-3 rounded-md hover:text-white hover:bg-white/10  transition-all hover:shadow-sm"
              >
                <MdOutlineShoppingBag size={20} />
                <span className="hidden md:block">Produits</span>
              </Link>
            </li>
            <li>
              <Link
                to="/brands"
                className="flex text-white/80 items-center gap-2 p-3 rounded-md hover:text-white hover:bg-white/10  transition-all hover:shadow-sm"
              >
                <MdOutlineLabel size={20} />
                <span className="hidden md:block">Marques</span>
              </Link>
            </li>

            <li>
              <Link
                to="/orders"
                className="flex text-white/80 items-center gap-2 p-3 rounded-md hover:text-white hover:bg-white/10  transition-all hover:shadow-sm"
              >
                <MdOutlineReceipt size={20} />
                <span className="hidden md:block">Commandes</span>
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="flex text-white/80 items-center gap-2 p-3 rounded-md hover:text-white hover:bg-white/10  transition-all hover:shadow-sm"
              >
                <MdOutlinePerson size={20} />
                <span className="hidden md:block">Utilisateurs</span>
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul>
            <li>
              <button
                onClick={logout}
                className="flex w-full text-white/80 items-center gap-2 p-3 rounded-md hover:text-white hover:bg-white/10  transition-all hover:shadow-sm"
              >
                <MdOutlinePowerSettingsNew size={20} />
                <span className="hidden md:block">Déconnexion</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

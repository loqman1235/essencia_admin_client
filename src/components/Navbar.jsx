import { Link } from "react-router-dom";
import {
  ChevronDownIcon,
  Bars3Icon,
  BellIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
const Navbar = () => {
  return (
    <div className="w-full h-16 bg-white px-5 flex items-center justify-between shadow-gray-100 shadow-xl mb-10">
      <button className="text-zinc-700">
        <Bars3Icon className="w-8 h-8" />
      </button>

      <div className="flex items-center gap-6">
        <button className="text-zinc-700">
          <EnvelopeIcon className="w-6 h-6" />
        </button>
        <button className="text-zinc-700">
          <BellIcon className="w-6 h-6" />
        </button>
        {/* Profile  */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <img
                src={JSON.parse(localStorage.getItem("user"))?.profilePicture}
                className="w-full h-full object-cover"
                alt="avatar"
              />
            </div>
            <div className="text-xs">
              <p className="text-gray-400">Welcome</p>
              <p className="text-sm font-semibold text-zinc-700">
                {JSON.parse(localStorage.getItem("user"))?.username}
              </p>
            </div>
          </div>
          <button>
            <ChevronDownIcon className="w-5 h-5 text-zinc-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

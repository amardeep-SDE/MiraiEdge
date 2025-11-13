import React, { useEffect, useRef, useState } from "react";

const ProfileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = {
    name: "Amardeep",
    email: "amardeep@example.com",
    avatarUrl: "https://avatar.iran.liara.run/public", 
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        aria-label="Open profile menu"
        className="relative flex items-center justify-center w-9 h-9 rounded-full overflow-hidden 
                   border-2 border-transparent hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </button>

      <div
        className={`absolute right-0 top-full mt-2 px-3 py-1 rounded-md text-xs bg-gray-800 text-white shadow-lg transition-opacity duration-150 pointer-events-none
                    ${hover ? "opacity-100" : "opacity-0"}`}
      >
        {user.name}
      </div>

      {open && (
        <div
          role="menu"
          aria-label="Profile options"
          className="absolute right-0 mt-3 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black/5 dark:ring-white/5 z-50"
        >
          <div className="py-2">
            <div className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email}
              </div>
            </div>
            <div className="border-t dark:border-gray-700 my-1" />
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                alert("Go to Profile");
                setOpen(false);
              }}
            >
              Profile
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => {
                alert("Open Settings");
                setOpen(false);
              }}
            >
              Settings
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
              onClick={() => {
                alert("Logged out");
                setOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;

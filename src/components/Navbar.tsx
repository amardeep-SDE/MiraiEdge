import React from "react";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 12 }}
      className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg 
                 shadow-sm flex items-center justify-between px-6 py-4 lg:px-8 
                 border-b border-gray-200 dark:border-gray-700 h-[68px]"
    >
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleSidebar}
          className="lg:hidden text-gray-700 dark:text-gray-300 focus:outline-none text-2xl hover:rotate-90 transition-transform"
          aria-label="Toggle sidebar"
        >
          ☰
        </motion.button>

        <motion.h2
          className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none"
          whileHover={{ scale: 1.05 }}
        >
          Admin Dashboard
        </motion.h2>
      </div>

      <motion.div
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 3 }}
          className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition"
          aria-label="Notifications"
        >
          <FaBell className="text-lg text-gray-800 dark:text-gray-200" />
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-1 -right-1 flex items-center justify-center 
                       w-4 h-4 text-[10px] font-bold text-white bg-red-500 rounded-full shadow"
          >
            3
          </motion.span>
        </motion.button>

        <motion.div whileTap={{ rotate: 90 }}>
          <ThemeToggle />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}>
          <ProfileMenu />
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default Navbar;

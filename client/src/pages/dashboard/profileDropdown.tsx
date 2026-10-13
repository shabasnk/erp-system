// // for changin profile dropdown from dashboard
// import { motion, AnimatePresence } from 'framer-motion';
// import { Button } from "@/components/ui/button";
// import { LogOut, User } from "lucide-react";
// import { useNavigate } from 'react-router-dom';

// interface ProfileDropdownProps {
//   user: {
//     name: string;
//     email: string;
//     avatar: string;
//   };
//   darkMode: boolean;
//   isMobile: boolean;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ProfileDropdown = ({ user, darkMode, isMobile, isOpen, onClose }: ProfileDropdownProps) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -10, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: -10, scale: 0.95 }}
//           transition={{ duration: 0.15, ease: "easeOut" }}
//           className={`fixed md:absolute right-2 md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
//             darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white border border-gray-100'
//           } ring-1 ring-black ring-opacity-5 z-[999]`}
//           role="menu"
//           aria-orientation="vertical"
//         >
//           <div className={`px-4 py-2 border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
//             <p className={`text-sm ${darkMode ? 'dark:text-white' : 'text-gray-900'}`}>{user.name}</p>
//             <p className={`text-xs ${darkMode ? 'dark:text-pink-300' : 'text-pink-600'}`}>{user.email}</p>
//           </div>
//           <motion.div 
//             whileHover={isMobile ? {} : { backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(252, 231, 243, 0.5)' }}
//           >
//             <Button
//               variant="ghost"
//               className={`w-full justify-start text-sm flex items-center gap-2 ${darkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-pink-50'}`}
//               onClick={() => {
//                 onClose();
//                 navigate('/dashboard/profile');
//               }}
//               role="menuitem"
//             >
//               <User size={16} />
//               Your Profile
//             </Button>
//           </motion.div>
//           <motion.div 
//             whileHover={isMobile ? {} : { backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(252, 231, 243, 0.5)' }}
//           >
//             <Button
//               variant="ghost"
//               className={`w-full justify-start text-sm flex items-center gap-2 ${darkMode ? 'dark:text-pink-400 dark:hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50'}`}
//               onClick={handleLogout}
//               role="menuitem"
//             >
//               <LogOut size={16} />
//               Sign out
//             </Button>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ProfileDropdown;













// Updated ProfileDropdown component with Report Management button
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { LogOut, User, Flag } from "lucide-react"; // Added Flag icon for reports
import { useNavigate } from 'react-router-dom';

interface ProfileDropdownProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  darkMode: boolean;
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDropdown = ({ user, darkMode, isMobile, isOpen, onClose }: ProfileDropdownProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`fixed md:absolute right-2 md:right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
            darkMode ? 'dark:bg-gray-800 dark:border-gray-700' : 'bg-white border border-gray-100'
          } ring-1 ring-black ring-opacity-5 z-[999]`}
          role="menu"
          aria-orientation="vertical"
        >
          <div className={`px-4 py-2 border-b ${darkMode ? 'dark:border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'dark:text-white' : 'text-gray-900'}`}>{user.name}</p>
            <p className={`text-xs ${darkMode ? 'dark:text-pink-300' : 'text-pink-600'}`}>{user.email}</p>
          </div>
          
          {/* Profile Button */}
          <motion.div 
            whileHover={isMobile ? {} : { backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(252, 231, 243, 0.5)' }}
          >
            <Button
              variant="ghost"
              className={`w-full justify-start text-sm flex items-center gap-2 ${darkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-pink-50'}`}
              onClick={() => {
                onClose();
                navigate('/dashboard/profile');
              }}
              role="menuitem"
            >
              <User size={16} />
              Your Profile
            </Button>
          </motion.div>
          
          {/* New Report Management Button */}
          <motion.div 
            whileHover={isMobile ? {} : { backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(252, 231, 243, 0.5)' }}
          >
            <Button
              variant="ghost"
              className={`w-full justify-start text-sm flex items-center gap-2 ${darkMode ? 'dark:hover:bg-gray-700' : 'hover:bg-pink-50'}`}
              onClick={() => {
                onClose();
                navigate('/dashboard/report'); // Adjust the route as needed
              }}
              role="menuitem"
            >
              <Flag size={16} />
              Report Management
            </Button>
          </motion.div>
          
          {/* Logout Button */}
          <motion.div 
            whileHover={isMobile ? {} : { backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(252, 231, 243, 0.5)' }}
          >
            <Button
              variant="ghost"
              className={`w-full justify-start text-sm flex items-center gap-2 ${darkMode ? 'dark:text-pink-400 dark:hover:bg-gray-700' : 'text-pink-600 hover:bg-pink-50'}`}
              onClick={handleLogout}
              role="menuitem"
            >
              <LogOut size={16} />
              Sign out
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropdown;
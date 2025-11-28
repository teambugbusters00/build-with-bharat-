import { useTheme } from "../contexts/ThemeContext";
import Navbar from "./Navbar";
const PageBackground = ({ children }) => {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-text text-center">

      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      {children}

    </div>
  );
};

export default PageBackground;

import { useTheme } from "../contexts/ThemeContext";
import Navbar from "./Navbar";
const PageBackground = ({ children }) => {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen relative overflow-hidden">

      <div
        className={`${darkMode ? "invert" : ""}
          absolute inset-0 z-0
          bg-[url('/bg/bg.avif')]
          bg-size-[520px]
          opacity-[0.45]
        `}
      />

      <div className="relative z-10">
        <>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        {children}
        </>
      </div>
    </div>
  );
};

export default PageBackground;

import { createContext } from "react";
import useLocalStorage from 'use-local-storage';

//Context
const ThemeContext = createContext();

//Provider
const ThemeProvider = ({ children }) => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme)
  };

  const data = { theme, handleTheme };
  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider };

export default ThemeContext;

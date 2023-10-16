import { createContext } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: Function;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: (val: string) => {},
});

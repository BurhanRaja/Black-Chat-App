import { createContext } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: Function;
};

type AlertContextType = {
  setAlertOpen: Function;
  setTitle: Function;
  setDescription: Function;
  setDuration: Function;
  setBackgroundColor: Function;
  setTitleTextColor: Function;
  setDescriptionTextColor: Function;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: (val: string) => {},
});

export const AlertContext = createContext<AlertContextType>({
  setAlertOpen: (val: boolean) => {},
  setTitle: (val: string) => {},
  setDescription: (val: string) => {},
  setDuration: (val: string) => {},
  setTitleTextColor: (val: string) => {},
  setDescriptionTextColor: (val: string) => {},
  setBackgroundColor: (val: string) => {},
});

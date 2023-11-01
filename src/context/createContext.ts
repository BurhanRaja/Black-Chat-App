import { createContext } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: Function;
};

type AlertContextType = {
  setAlertOpen: Function;
  setTitle: Function;
  setDescription: Function;
  setType: Function;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: (val: string) => {},
});

export const AlertContext = createContext<AlertContextType>({
  setAlertOpen: (val: boolean) => {},
  setTitle: (val: string) => {},
  setDescription: (val: string) => {},
  setType: (val: "error" | "success" | "info" | "notification") => {},
});

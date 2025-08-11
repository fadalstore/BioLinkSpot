import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "gradient";

type ThemeProviderContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("preferred-theme") as Theme;
    if (savedTheme && ["light", "dark", "gradient"].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove("light", "dark", "gradient");
    
    // Add current theme class
    root.classList.add(theme);
    
    // Set data attribute for CSS targeting
    document.body.setAttribute("data-theme", theme);
    
    // Store theme preference
    localStorage.setItem("preferred-theme", theme);
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

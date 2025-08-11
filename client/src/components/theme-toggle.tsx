import { Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2 bg-white dark:bg-slate-800 rounded-full p-1 shadow-lg border dark:border-slate-700">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("light")}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === "light" 
            ? "bg-slate-200 dark:bg-slate-600 scale-110" 
            : ""
        }`}
        data-testid="button-theme-light"
      >
        <Sun className="h-4 w-4 text-yellow-500" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("dark")}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === "dark" 
            ? "bg-slate-200 dark:bg-slate-600 scale-110" 
            : ""
        }`}
        data-testid="button-theme-dark"
      >
        <Moon className="h-4 w-4 text-blue-400" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme("gradient")}
        className={`p-2 rounded-full transition-all duration-300 ${
          theme === "gradient" 
            ? "bg-slate-200 dark:bg-slate-600 scale-110" 
            : ""
        }`}
        data-testid="button-theme-gradient"
      >
        <Palette className="h-4 w-4 text-purple-500" />
      </Button>
    </div>
  );
}

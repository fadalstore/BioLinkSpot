import { ArrowRight, Mail } from "lucide-react";
import type { SocialLink } from "@shared/schema";

interface SocialLinksProps {
  socialLinks: SocialLink[];
}

const platformConfig = {
  instagram: {
    name: "Instagram",
    gradient: "from-purple-500 via-pink-500 to-orange-400",
    icon: "fab fa-instagram",
    hoverColor: "pink",
  },
  twitter: {
    name: "X (Twitter)",
    gradient: "from-slate-900 to-slate-700",
    icon: "fab fa-x-twitter",
    hoverColor: "blue",
  },
  linkedin: {
    name: "LinkedIn",
    gradient: "from-blue-600 to-blue-800",
    icon: "fab fa-linkedin-in",
    hoverColor: "blue",
  },
  youtube: {
    name: "YouTube",
    gradient: "from-red-500 to-red-700",
    icon: "fab fa-youtube",
    hoverColor: "red",
  },
  github: {
    name: "GitHub",
    gradient: "from-slate-700 to-slate-900",
    icon: "fab fa-github",
    hoverColor: "slate",
  },
  website: {
    name: "Portfolio",
    gradient: "from-purple-500 to-purple-700",
    icon: "fas fa-globe",
    hoverColor: "purple",
  },
};

export function SocialLinks({ socialLinks }: SocialLinksProps) {
  const handleSocialClick = (url: string, platform: string) => {
    // Add click animation effect
    const target = document.querySelector(`[data-platform="${platform}"]`) as HTMLElement;
    if (target) {
      target.style.transform = 'scale(0.95)';
      setTimeout(() => {
        target.style.transform = '';
      }, 150);
    }
    
    // Open link
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getHoverClasses = (color: string) => {
    const colorMap = {
      pink: "hover:border-pink-200 dark:hover:border-pink-800 group-hover:text-pink-600 dark:group-hover:text-pink-400 group-hover:shadow-pink-500/25 group-hover:text-pink-500",
      blue: "hover:border-blue-200 dark:hover:border-blue-800 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:shadow-blue-500/25 group-hover:text-blue-500",
      red: "hover:border-red-200 dark:hover:border-red-800 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:shadow-red-500/25 group-hover:text-red-500",
      slate: "hover:border-slate-200 dark:hover:border-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-400 group-hover:shadow-slate-500/25 group-hover:text-slate-500",
      purple: "hover:border-purple-200 dark:hover:border-purple-800 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:shadow-purple-500/25 group-hover:text-purple-500",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white text-center mb-6">
        Connect With Me
      </h3>
      
      {socialLinks
        .filter(link => link.isActive === "true")
        .map((link) => {
          const config = platformConfig[link.platform as keyof typeof platformConfig];
          if (!config) return null;
          
          return (
            <button
              key={link.id}
              onClick={() => handleSocialClick(link.url, link.platform)}
              className={`social-link-card group block w-full transition-all duration-300 ${getHoverClasses(config.hoverColor)}`}
              data-platform={link.platform}
              data-testid={`button-social-${link.platform}`}
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-${config.hoverColor}-500/25 transition-shadow duration-300`}>
                    <i className={`${config.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-slate-800 dark:text-white transition-colors duration-300">
                      {config.name}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {link.handle}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </button>
          );
        })}

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 mt-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-lg">
            <Mail className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white">Stay Updated</h4>
            <p className="text-sm text-blue-100">Get my latest content & insights</p>
          </div>
          <button 
            className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-300"
            data-testid="button-newsletter-subscribe"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}

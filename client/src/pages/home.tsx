import { useQuery } from "@tanstack/react-query";
import { Share2, Copy, TrendingUp, Heart } from "lucide-react";
import { ProfileCard } from "@/components/profile-card";
import { SocialLinks } from "@/components/social-links";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { User, SocialLink } from "@shared/schema";

interface ProfileData {
  user: User;
  socialLinks: SocialLink[];
}

export default function Home() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery<ProfileData>({
    queryKey: ['/api/profile'],
  });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data?.user.displayName} - LinkHub`,
          text: `Check out ${data?.user.displayName}'s social links`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled or failed');
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Profile link has been copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleAnalytics = () => {
    toast({
      title: "Analytics",
      description: "Analytics feature coming soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 transition-all duration-700 flex items-center justify-center">
        <div className="animate-pulse text-slate-600 dark:text-slate-300">Loading...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 transition-all duration-700 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">Error loading profile</div>
          <div className="text-slate-500 text-sm">Please try again later</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900 transition-all duration-700"
      data-testid="page-home"
    >
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white" data-testid="text-app-title">
            LinkHub
          </h1>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 pb-8">
        <ProfileCard user={data.user} />
        <SocialLinks socialLinks={data.socialLinks} />

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4" data-testid="text-footer-credit">
            Created with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> using LinkHub
          </p>
          <div className="flex justify-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300"
              data-testid="button-share-profile"
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLink}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300"
              data-testid="button-copy-link"
            >
              <Copy className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAnalytics}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-300"
              data-testid="button-analytics"
            >
              <TrendingUp className="w-5 h-5" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
}

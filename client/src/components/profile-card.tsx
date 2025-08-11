import { CheckCircle } from "lucide-react";
import type { User } from "@shared/schema";

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="relative mb-8 animate-slide-in" data-testid="card-profile">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-3xl transform rotate-1 opacity-20"></div>
      
      <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-white dark:border-slate-700 backdrop-blur-lg">
        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img 
              src={user.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"} 
              alt={`${user.displayName} profile picture`}
              className="w-24 h-24 rounded-full object-cover shadow-xl ring-4 ring-white dark:ring-slate-700 animate-float"
              data-testid="img-profile-picture"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center">
              <CheckCircle className="text-white h-4 w-4" />
            </div>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="text-center">
          <h2 
            className="text-2xl font-bold text-slate-800 dark:text-white mb-2"
            data-testid="text-display-name"
          >
            {user.displayName}
          </h2>
          {user.title && (
            <p 
              className="text-slate-600 dark:text-slate-300 mb-1"
              data-testid="text-title"
            >
              {user.title}
            </p>
          )}
          {user.location && (
            <p 
              className="text-sm text-slate-500 dark:text-slate-400 mb-4"
              data-testid="text-location"
            >
              {user.location}
            </p>
          )}
          
          {/* Bio */}
          {user.bio && (
            <p 
              className="text-slate-600 dark:text-slate-300 leading-relaxed"
              data-testid="text-bio"
            >
              {user.bio}
            </p>
          )}
          
          {/* Stats */}
          <div className="flex justify-center mt-6 space-x-6">
            <div className="text-center" data-testid="stat-followers">
              <div className="text-xl font-bold text-slate-800 dark:text-white">
                {user.followers ? `${(user.followers / 1000).toFixed(1)}K` : '0'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Followers</div>
            </div>
            <div className="text-center" data-testid="stat-following">
              <div className="text-xl font-bold text-slate-800 dark:text-white">
                {user.following ? `${(user.following / 1000).toFixed(1)}K` : '0'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Following</div>
            </div>
            <div className="text-center" data-testid="stat-posts">
              <div className="text-xl font-bold text-slate-800 dark:text-white">
                {user.posts || '0'}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Posts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

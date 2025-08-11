import { useQuery } from "@tanstack/react-query";
import { BarChart3, TrendingUp, Eye, MousePointer, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Analytics } from "@shared/schema";

interface AnalyticsDashboardProps {
  userId: string;
}

export function AnalyticsDashboard({ userId }: AnalyticsDashboardProps) {
  const { data: analytics, isLoading } = useQuery<Analytics[]>({
    queryKey: ['/api/analytics', userId],
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse text-slate-600 dark:text-slate-300">
            Loading analytics...
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalViews = analytics?.filter(a => a.eventType === 'view').length || 0;
  const totalClicks = analytics?.filter(a => a.eventType === 'click').length || 0;
  const totalTips = analytics?.filter(a => a.eventType === 'tip').length || 0;

  const clickRate = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2" data-testid="text-analytics-title">
          Analytics Dashboard
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Track your profile performance and engagement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Profile Views
            </CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100" data-testid="stat-profile-views">
              {totalViews.toLocaleString()}
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
              Total profile views
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">
              Link Clicks
            </CardTitle>
            <MousePointer className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100" data-testid="stat-link-clicks">
              {totalClicks.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 dark:text-green-300 mt-1">
              Total link clicks
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-purple-800 dark:text-purple-200">
              Click Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100" data-testid="stat-click-rate">
              {clickRate}%
            </div>
            <p className="text-xs text-purple-600 dark:text-purple-300 mt-1">
              Engagement rate
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-200">
              Tips Received
            </CardTitle>
            <DollarSign className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100" data-testid="stat-tips-received">
              {totalTips}
            </div>
            <p className="text-xs text-orange-600 dark:text-orange-300 mt-1">
              Total tips received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>Recent Activity</span>
          </CardTitle>
          <CardDescription>
            Latest interactions with your profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analytics?.slice(-5).reverse().map((activity, index) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                data-testid={`activity-${index}`}
              >
                <div className="flex items-center space-x-3">
                  {activity.eventType === 'view' && <Eye className="w-4 h-4 text-blue-500" />}
                  {activity.eventType === 'click' && <MousePointer className="w-4 h-4 text-green-500" />}
                  {activity.eventType === 'tip' && <DollarSign className="w-4 h-4 text-orange-500" />}
                  
                  <div>
                    <p className="text-sm font-medium text-slate-800 dark:text-white">
                      {activity.eventType === 'view' && 'Profile viewed'}
                      {activity.eventType === 'click' && 'Link clicked'}
                      {activity.eventType === 'tip' && 'Tip received'}
                    </p>
                    {activity.linkId && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Link ID: {activity.linkId}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'Just now'}
                </div>
              </div>
            )) || (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No activity data available yet
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
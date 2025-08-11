import { useState } from "react";
import { Crown, Palette, BarChart3, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  popular?: boolean;
}

const plans: PremiumPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 4.99,
    interval: "month",
    features: [
      "Remove LinkHub branding",
      "Custom themes & colors",
      "Basic analytics",
      "Priority support"
    ]
  },
  {
    id: "pro",
    name: "Pro",
    price: 9.99,
    interval: "month",
    popular: true,
    features: [
      "Everything in Basic",
      "Advanced analytics",
      "Custom domains",
      "A/B testing",
      "Scheduled posts",
      "Email integration"
    ]
  },
  {
    id: "business",
    name: "Business",
    price: 19.99,
    interval: "month",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "API access",
      "White-label solution",
      "Custom integrations",
      "Dedicated support"
    ]
  }
];

export function PremiumFeatures() {
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = async (planId: string, price: number) => {
    setIsProcessing(planId);
    
    try {
      // Create subscription
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planId, price }),
      });

      if (!response.ok) {
        throw new Error("Failed to create subscription");
      }

      const { clientSecret } = await response.json();
      
      // For demo purposes, show success message
      toast({
        title: "Subscription Processing",
        description: `Your ${plans.find(p => p.id === planId)?.name} subscription is being set up!`,
      });
      
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Unable to process subscription. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <Crown className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2" data-testid="text-premium-title">
          Upgrade to Premium
        </h2>
        <p className="text-slate-600 dark:text-slate-300">
          Unlock powerful features to grow your audience and earn more
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative ${
              plan.popular 
                ? "border-purple-500 shadow-lg scale-105 bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20" 
                : "border-slate-200 dark:border-slate-700"
            } hover:shadow-xl transition-all duration-300`}
          >
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-slate-800 dark:text-white" data-testid={`text-plan-${plan.id}-title`}>
                {plan.name}
              </CardTitle>
              <div className="text-3xl font-bold text-slate-800 dark:text-white">
                ${plan.price}
                <span className="text-sm text-slate-500 dark:text-slate-400">/{plan.interval}</span>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => handleSubscribe(plan.id, plan.price)}
                disabled={isProcessing === plan.id}
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                    : "bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white"
                }`}
                data-testid={`button-subscribe-${plan.id}`}
              >
                {isProcessing === plan.id ? "Processing..." : `Subscribe to ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Benefits showcase */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <Card className="text-center p-6 border-blue-200 dark:border-blue-800">
          <BarChart3 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Advanced Analytics</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Track clicks, views, and engagement across all your links
          </p>
        </Card>

        <Card className="text-center p-6 border-purple-200 dark:border-purple-800">
          <Palette className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Custom Branding</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Personalize your page with custom colors, fonts, and domains
          </p>
        </Card>

        <Card className="text-center p-6 border-green-200 dark:border-green-800">
          <Zap className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-800 dark:text-white mb-2">Priority Support</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Get fast, dedicated support whenever you need help
          </p>
        </Card>
      </div>
    </div>
  );
}
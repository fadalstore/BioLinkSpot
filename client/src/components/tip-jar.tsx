import { useState } from "react";
import { DollarSign, Heart, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const tipAmounts = [5, 10, 25, 50, 100];

export function TipJar() {
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleTip = async (amount: number) => {
    setIsProcessing(true);
    
    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment");
      }

      const { clientSecret } = await response.json();
      
      // For demo purposes, show success message
      // In production, this would redirect to Stripe checkout
      toast({
        title: "Tip Processing",
        description: `$${amount} tip is being processed. Thank you for your support!`,
      });
      
      setSelectedAmount(null);
      setCustomAmount("");
      
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Unable to process tip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomTip = () => {
    const amount = parseFloat(customAmount);
    if (amount >= 1) {
      handleTip(amount);
    } else {
      toast({
        title: "Invalid Amount",
        description: "Minimum tip amount is $1",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
          <Coffee className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-green-800 dark:text-green-200" data-testid="text-tip-jar-title">
          Buy Me a Coffee
        </CardTitle>
        <CardDescription className="text-green-600 dark:text-green-300">
          Support my work and help me create more content
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick tip amounts */}
        <div className="grid grid-cols-3 gap-2">
          {tipAmounts.map((amount) => (
            <Button
              key={amount}
              variant={selectedAmount === amount ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedAmount(amount)}
              className="text-sm"
              data-testid={`button-tip-${amount}`}
            >
              ${amount}
            </Button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-green-700 dark:text-green-300">
            Custom Amount
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
              <Input
                type="number"
                placeholder="Enter amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="pl-10 border-green-300 focus:border-green-500"
                min="1"
                step="0.01"
                data-testid="input-custom-tip-amount"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-2">
          {selectedAmount && (
            <Button
              onClick={() => handleTip(selectedAmount)}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-send-tip"
            >
              {isProcessing ? "Processing..." : `Send $${selectedAmount} Tip`}
              <Heart className="ml-2 w-4 h-4" />
            </Button>
          )}
          
          {customAmount && parseFloat(customAmount) >= 1 && (
            <Button
              onClick={handleCustomTip}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              data-testid="button-send-custom-tip"
            >
              {isProcessing ? "Processing..." : `Send $${customAmount} Tip`}
              <Heart className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Recent supporters */}
        <div className="pt-4 border-t border-green-200 dark:border-green-800">
          <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-2">
            Recent Supporters
          </h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              Anonymous - $25
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Sarah M. - $10
            </Badge>
            <Badge variant="secondary" className="text-xs">
              John D. - $50
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
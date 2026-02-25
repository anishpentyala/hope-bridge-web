import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { base44 } from '@/api/client';

export default function StripePaymentForm() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Check for success in URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setPaymentSuccess(true);
      // Clean up URL
      window.history.replaceState({}, '', '/donate');
    }
  }, []);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) {
      setSelectedAmount(num);
      setCustomAmount(value);
    } else {
      setCustomAmount(value);
    }
  };

  const createPaymentIntent = async () => {
    // Check if running in iframe
    if (window.self !== window.top) {
      alert('Checkout is only available from the published app. Please open the app in a new tab.');
      return;
    }

    setIsCreatingIntent(true);
    try {
      const { data } = await base44.functions.invoke('createCheckout', {
        amount: selectedAmount
      });
      
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Unable to initialize payment. Please try again or contact us directly.');
    } finally {
      setIsCreatingIntent(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-slate-900 mb-3">
          Thank you for your donation!
        </h3>
        <p className="text-slate-600 mb-6">
          Your generous contribution of ${selectedAmount} will help us support Asian teens in our community.
        </p>
        <Button
          onClick={() => {
            setPaymentSuccess(false);
            setSelectedAmount(25);
          }}
          variant="outline"
        >
          Make Another Donation
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold text-black mb-4 block">
          Select Donation Amount
        </Label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-4">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => handleAmountSelect(amount)}
              className={`p-4 rounded-xl border-2 transition-all text-black ${
                 selectedAmount === amount && !customAmount
                   ? 'border-blue-600 bg-blue-50 text-blue-600'
                   : 'border-slate-200 hover:border-blue-300'
               }`}
            >
              <div className="font-bold">${amount}</div>
            </button>
          ))}
        </div>
        
        <div>
           <Label htmlFor="custom-amount" className="text-sm text-black mb-2 block">
             Or enter custom amount
           </Label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
            <Input
               id="custom-amount"
               type="number"
               min="1"
               placeholder="Enter amount"
               value={customAmount}
               onChange={(e) => handleCustomAmount(e.target.value)}
               className="pl-8 py-6 text-lg text-black"
             />
          </div>
        </div>
      </div>

      <Button
        onClick={createPaymentIntent}
        disabled={!selectedAmount || selectedAmount < 1 || isCreatingIntent}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg rounded-xl shadow-lg"
      >
        {isCreatingIntent ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            Continue to Payment
            <span className="ml-2 font-bold">${selectedAmount}</span>
          </>
        )}
      </Button>

      <p className="text-xs text-center text-slate-500">
        Secure payment powered by Stripe
      </p>
    </div>
  );
}

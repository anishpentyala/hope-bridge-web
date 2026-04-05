import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function StripePaymentForm() {
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [customAmountError, setCustomAmountError] = useState('');
  const [isCreatingIntent, setIsCreatingIntent] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const parseValidAmount = (value) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const parsedAmount = Number(value);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return null;
    }

    return Math.round(parsedAmount * 100) / 100;
  };

  // Check for success in URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isSuccess = urlParams.get('success') === 'true';
    const amountFromUrl =
      parseValidAmount(urlParams.get('amount')) ??
      parseValidAmount(urlParams.get('amt')) ??
      parseValidAmount(urlParams.get('donationAmount'));

    if (isSuccess) {
      setPaymentSuccess(true);
      if (amountFromUrl !== null) {
        setSelectedAmount(amountFromUrl);
      }
      // Clean up URL
      window.history.replaceState({}, '', '/donate');
    }
  }, []);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setCustomAmountError('');
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);

    if (value === '') {
      setCustomAmountError('');
      return;
    }

    const num = Number(value);

    if (!Number.isFinite(num) || num <= 0) {
      setCustomAmountError('Please enter an amount greater than $0.');
      return;
    }

    if (!Number.isInteger(num)) {
      setCustomAmountError('Please enter a whole dollar amount (no cents).');
      return;
    }

    setCustomAmountError('');
    setSelectedAmount(num);
  };

  const createPaymentIntent = async () => {
    setIsCreatingIntent(true);
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: selectedAmount }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Failed to create checkout');
      }

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
               step="1"
               inputMode="numeric"
               placeholder="Enter amount"
               value={customAmount}
               onChange={(e) => handleCustomAmount(e.target.value)}
               className="pl-8 py-6 text-lg text-black"
             />
          </div>
          {customAmountError && (
            <p className="mt-2 text-sm text-amber-700">{customAmountError}</p>
          )}
        </div>
      </div>

      <Button
        onClick={createPaymentIntent}
        disabled={!selectedAmount || selectedAmount < 1 || isCreatingIntent || !!customAmountError}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-lg rounded-xl shadow-lg"
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

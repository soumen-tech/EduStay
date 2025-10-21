import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, CreditCard, Smartphone, Building2, Wallet, Check, AlertCircle, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface BookingData {
  propertyId: number;
  propertyName: string;
  propertyImage: string;
  owner: string;
  rating: number;
  duration: string;
  monthlyPrice: number;
  securityDeposit: number;
}

// Mock Payment API Integration Points
const PAYMENT_CONFIG = {
  // Replace these with real gateway credentials before production
  PAYMENT_GATEWAY_PROVIDER: 'MOCK_GATEWAY',
  API_KEY: 'demo_api_key_replace_in_production',
  WEBHOOK_URL: '/api/payments/webhook'
};

const PaymentFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'pending' | 'confirmed' | 'cancelled'>('pending');
  const [paymentIntentId, setPaymentIntentId] = useState('');
  const [bookingReference, setBookingReference] = useState('');

  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [upiId, setUpiId] = useState('');

  // User data
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  // Booking data from navigation state
  const bookingData: BookingData | null = location.state?.bookingData || null;

  useEffect(() => {
    // Check if user is logged in
    const userSession = localStorage.getItem('userSession');
    const ownerSession = localStorage.getItem('ownerSession');
    
    if (userSession || ownerSession) {
      setIsLoggedIn(true);
      // Prefill user data from session
      try {
        const session = JSON.parse(userSession || ownerSession || '{}');
        setUserName(session.name || 'Aishik Pramanik');
        setUserEmail(session.email || 'demo@example.com');
        setUserPhone(session.phone || '+91 98765 43210');
      } catch (e) {
        console.error('Error parsing session:', e);
      }
    } else {
      setShowLoginPrompt(true);
    }

    // If no booking data, redirect back
    if (!bookingData) {
      toast.error("No booking data found");
      navigate(-1);
    }
  }, [bookingData, navigate]);

  // Mock Payment API Functions
  const initiatePayment = async () => {
    /**
     * Integration Point: Replace this with real payment gateway API call
     * Example: Stripe, Razorpay, PayPal, etc.
     * 
     * Real implementation should:
     * 1. Call server-side endpoint to create payment intent
     * 2. Receive payment intent ID and client secret
     * 3. Use gateway SDK to complete payment on client
     */
    
    return new Promise<{ paymentIntentId: string; status: string }>((resolve) => {
      setTimeout(() => {
        const mockIntentId = `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        resolve({
          paymentIntentId: mockIntentId,
          status: 'initiated'
        });
      }, 1000);
    });
  };

  const confirmPayment = async (intentId: string) => {
    /**
     * Integration Point: Complete payment confirmation
     * 
     * Real implementation:
     * 1. Call gateway API to confirm payment
     * 2. Handle 3D Secure / OTP verification if required
     * 3. Wait for payment confirmation
     * 4. Update booking status based on payment result
     */
    
    return new Promise<{ status: 'success' | 'failed'; bookingRef?: string }>((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        resolve({
          status: success ? 'success' : 'failed',
          bookingRef: success ? `BK${Date.now()}` : undefined
        });
      }, 2000);
    });
  };

  const handlePayment = async () => {
    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    // Validate payment method inputs
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCVV) {
        toast.error("Please fill in all card details");
        return;
      }
    } else if (paymentMethod === 'upi' && !upiId) {
      toast.error("Please enter UPI ID");
      return;
    }

    setProcessing(true);

    try {
      // Step 1: Initiate payment
      toast.info("Initiating payment...");
      const { paymentIntentId } = await initiatePayment();
      setPaymentIntentId(paymentIntentId);

      // Step 2: Confirm payment
      toast.info("Processing payment...");
      const result = await confirmPayment(paymentIntentId);

      if (result.status === 'success' && result.bookingRef) {
        setBookingStatus('confirmed');
        setBookingReference(result.bookingRef);
        
        toast.success(
          <div>
            <p className="font-semibold">Payment Successful!</p>
            <p className="text-sm">Booking Reference: {result.bookingRef}</p>
          </div>,
          { duration: 8000 }
        );

        // In production: trigger email confirmation via backend
        // await sendBookingConfirmation(result.bookingRef);
        
      } else {
        toast.error("Payment failed. Please try again.");
        setProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error("An error occurred during payment");
      setProcessing(false);
    }
  };

  if (!bookingData) {
    return null;
  }

  const totalAmount = bookingData.monthlyPrice + bookingData.securityDeposit;
  const taxes = Math.round(totalAmount * 0.18); // 18% GST demo
  const grandTotal = totalAmount + taxes;

  // Show login prompt dialog
  if (showLoginPrompt && !isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
              <DialogDescription>
                Please log in to your account to proceed with booking. This ensures your payment is secure and booking details are saved to your profile.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Link to="/student/login" className="flex-1">
                <Button className="w-full">Student Login</Button>
              </Link>
              <Link to="/student/signup" className="flex-1">
                <Button variant="outline" className="w-full">Register</Button>
              </Link>
            </div>
            <Button variant="ghost" onClick={() => navigate(-1)} className="mt-2">
              Go Back
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Show confirmation screen after successful payment
  if (bookingStatus === 'confirmed') {
    return (
      <div className="min-h-screen flex flex-col bg-secondary">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Your payment has been processed successfully
              </p>

              <div className="bg-secondary rounded-lg p-6 mb-6 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Booking Reference</p>
                    <p className="font-semibold">{bookingReference}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Property</p>
                    <p className="font-semibold">{bookingData.propertyName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{bookingData.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount Paid</p>
                    <p className="font-semibold">₹{grandTotal.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2 text-green-700 text-sm">
                  <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="font-semibold mb-1">Payment in Escrow</p>
                    <p>Your payment is securely held and will be released to the owner upon successful check-in. You'll receive a confirmation email shortly.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Link to="/student/dashboard" className="flex-1">
                  <Button className="w-full">View My Bookings</Button>
                </Link>
                <Link to="/" className="flex-1">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                ⚠️ Demo Content — Fictional booking for demonstration
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go back
        </Button>

        <div className="mb-4">
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            ⚠️ Demo Content — Fictional Payment Flow
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative h-32 rounded-lg overflow-hidden">
                  <img 
                    src={bookingData.propertyImage} 
                    alt={bookingData.propertyName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">{bookingData.propertyName}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>Owner: {bookingData.owner}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-sm font-medium">{bookingData.rating} ★</span>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{bookingData.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span>₹{bookingData.monthlyPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span>₹{bookingData.securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes & Fees (18%)</span>
                    <span>₹{taxes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total Amount</span>
                    <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-xs text-amber-800">
                    <strong>Cancellation Policy:</strong> Free cancellation up to 7 days before move-in. Partial refund (50%) for 3-7 days notice.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={userEmail} 
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      value={userPhone} 
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="h-5 w-5" />
                        <span>Credit / Debit Card</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Smartphone className="h-5 w-5" />
                        <span>UPI</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary">
                      <RadioGroupItem value="netbanking" id="netbanking" />
                      <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Building2 className="h-5 w-5" />
                        <span>Net Banking</span>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-secondary">
                      <RadioGroupItem value="wallet" id="wallet" />
                      <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                        <Wallet className="h-5 w-5" />
                        <span>Digital Wallet</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv"
                          type="password"
                          placeholder="123"
                          value={cardCVV}
                          onChange={(e) => setCardCVV(e.target.value)}
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* UPI Payment Form */}
                {paymentMethod === 'upi' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input 
                        id="upiId"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Other payment methods info */}
                {(paymentMethod === 'netbanking' || paymentMethod === 'wallet') && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground">
                      You will be redirected to complete the payment on the next step.
                    </p>
                  </div>
                )}

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2 text-green-700 text-sm">
                    <Shield className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Secure Escrow Payment</p>
                      <p>Your payment will be held securely and released to the owner only after successful check-in. Full refund if booking is cancelled by owner.</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Checkbox 
                    id="terms" 
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm cursor-pointer">
                    I accept the{" "}
                    <Link to="/terms" className="text-primary underline">
                      terms and conditions
                    </Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-primary underline">
                      privacy policy
                    </Link>
                  </Label>
                </div>

                <Button 
                  onClick={handlePayment} 
                  disabled={!acceptedTerms || processing}
                  className="w-full h-12 text-lg"
                  size="lg"
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹${grandTotal.toLocaleString()} (Demo)`
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Demo Mode: No real payment will be processed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentFlow;


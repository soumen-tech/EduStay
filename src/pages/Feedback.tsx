import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Feedback = () => {
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !comment || rating === 0) {
      toast.error("Please fill in all required fields and provide a rating");
      return;
    }

    // Demo: Store feedback locally
    const feedback = {
      name,
      email,
      rating,
      comment,
      timestamp: new Date().toISOString()
    };
    
    console.log("Demo Feedback Submitted:", feedback);
    toast.success("Thank you for your feedback! (Demo mode - data not stored)");
    
    // Reset form
    setName("");
    setEmail("");
    setRating(0);
    setComment("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-secondary">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <div className="max-w-2xl mx-auto">
            <div className="bg-background rounded-lg shadow-lg p-8">
              <h1 className="text-4xl font-bold mb-4">Platform Feedback</h1>
              <p className="text-muted-foreground mb-8">
                We value your feedback! Help us improve EduStay by sharing your experience with our platform.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Provide your email if you'd like us to follow up
                  </p>
                </div>

                <div>
                  <Label className="mb-3 block">Rating *</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      You rated: {rating} star{rating !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="category">Feedback Category</Label>
                  <RadioGroup defaultValue="usability" className="mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usability" id="usability" />
                      <Label htmlFor="usability" className="font-normal cursor-pointer">
                        Usability
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="trust" id="trust" />
                      <Label htmlFor="trust" className="font-normal cursor-pointer">
                        Trust & Safety
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="safety" id="safety" />
                      <Label htmlFor="safety" className="font-normal cursor-pointer">
                        Safety Features
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="payments" id="payments" />
                      <Label htmlFor="payments" className="font-normal cursor-pointer">
                        Payments
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other" className="font-normal cursor-pointer">
                        Other
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="comment">Your Feedback *</Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience, suggestions, or concerns..."
                    rows={6}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Maximum 1000 characters
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> In the production version, only verified students and property 
                    owners can submit feedback. This ensures authentic and trustworthy reviews.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Feedback
                </Button>
              </form>
            </div>

            {/* Benefits Section */}
            <div className="mt-8 bg-background rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Why Your Feedback Matters</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Helps us improve the platform for all students and property owners</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Identifies safety features and trust mechanisms that need enhancement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Shapes the future development of EduStay based on real user needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Your input directly influences how we prioritize new features</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Feedback;
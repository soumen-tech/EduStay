import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I verify my student account?",
      answer: "To verify your student account: (1) Sign up with your email, (2) Upload your Aadhaar card (front & back), (3) Upload your college ID, (4) Verify your college email if required. Verification typically takes 24-48 hours. You'll receive a notification once approved."
    },
    {
      question: "How do I list my PG/Mess/Hostel?",
      answer: "To list your property: (1) Sign up as an owner/landlord, (2) Click 'List Property', (3) Complete the guided wizard with property details, photos, and amenities, (4) Upload verification documents (Aadhaar & property proof), (5) Submit for admin review. Once verified, your listing goes live within 48-72 hours."
    },
    {
      question: "What is EduStay Verified?",
      answer: "EduStay Verified is our trust badge given to users and properties that have completed identity verification. For students, this means Aadhaar and college ID verification. For owners, this includes Aadhaar, property ownership proof, and document validation. Verified listings and users have a green checkmark badge."
    },
    {
      question: "How does booking & payment work?",
      answer: "Booking process: (1) Search and filter properties, (2) View details and contact owner, (3) Visit property if desired, (4) Make a booking request through the platform, (5) Payment is held in escrow, (6) Move in and confirm, (7) Payment is released to owner. This ensures both parties are protected."
    },
    {
      question: "What if I face an emergency?",
      answer: "For emergencies, call our 24/7 helpline at 1800-XXX-XXXX. For urgent issues like safety concerns, disputes, or accommodation problems, our team is always available. You can also use the SOS button in the app or contact local authorities (Police: 100, Women's Helpline: 1091)."
    },
    {
      question: "How can landlords cancel a booking?",
      answer: "Landlords can cancel bookings under specific conditions: (1) Within 24 hours of booking with full refund, (2) Due to property damage or violations by tenant, (3) With admin review for other reasons. Frequent cancellations may result in listing suspension. Cancellation must be done through the platform with proper reason."
    },
    {
      question: "How are refunds handled?",
      answer: "Refund policy: (1) Full refund if cancelled within 24 hours of booking, (2) Partial refund (50%) if cancelled 7+ days before move-in, (3) No refund if cancelled within 7 days of move-in, (4) Full refund if owner cancels or property is misrepresented. Refunds are processed within 5-7 business days to original payment method."
    },
    {
      question: "How do I contact support?",
      answer: "You can reach our support team via: (1) Phone: +91 98765 43210 (Mon-Sat, 9 AM - 6 PM), (2) Email: support@edustay.com (response within 24 hours), (3) In-app support chat, (4) Emergency helpline: 1800-XXX-XXXX (24/7). For faster response, include your booking ID or property details."
    }
  ];

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduStay</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <svg className="h-4 w-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Go back to Previous Page
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-sm text-muted-foreground mb-8">Demo Content — Fictional</p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-background rounded-lg border px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 p-6 bg-primary/10 rounded-lg border border-primary/20">
          <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-4">
            Can't find the answer you're looking for? Contact our support team.
          </p>
          <Link to="/support">
            <Button>Contact Support</Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default FAQ;

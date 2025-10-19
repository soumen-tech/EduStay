import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ShieldCheck, FileText, HelpCircle, Phone } from "lucide-react";

const StudentSupport = () => {
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

        <h1 className="text-3xl font-bold mb-4">Student Support</h1>
        <p className="text-sm text-muted-foreground mb-8">Demo Content — Fictional</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <ShieldCheck className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Account Verification Help</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Need help verifying your student account? We guide you through Aadhaar card upload, college ID verification, and email confirmation.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Upload clear Aadhaar photos (front & back)</li>
                <li>• Provide valid college ID</li>
                <li>• Verification takes 24-48 hours</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Booking Assistance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Having trouble booking accommodation? We help with search filters, property details, owner communication, and booking confirmations.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Use filters to find perfect match</li>
                <li>• Contact verified owners directly</li>
                <li>• Secure payment through platform</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <HelpCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Safety Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your safety is our priority. Learn about verified listings, secure payments, emergency contacts, and what to do if issues arise.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Only book verified properties</li>
                <li>• Meet owners in safe locations</li>
                <li>• Report suspicious activity immediately</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Phone className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Emergency Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                24/7 emergency helpline for urgent issues related to safety, disputes, or critical accommodation problems.
              </p>
              <div className="mt-4 p-4 bg-destructive/10 rounded-lg">
                <p className="font-semibold text-destructive">Emergency Helpline</p>
                <p className="text-2xl font-bold text-destructive">1800-XXX-XXXX</p>
                <p className="text-xs text-muted-foreground mt-2">Available 24/7</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentSupport;

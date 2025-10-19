import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, FileCheck, TrendingUp, MessageSquare } from "lucide-react";

const OwnerSupport = () => {
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

        <h1 className="text-3xl font-bold mb-4">Owner/Landlord Support</h1>
        <p className="text-sm text-muted-foreground mb-8">Demo Content — Fictional</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Home className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Listing Your Property</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Learn how to create compelling property listings that attract students. We guide you through photos, descriptions, pricing, and amenities.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Upload 4+ high-quality photos</li>
                <li>• Set competitive pricing</li>
                <li>• Highlight key amenities</li>
                <li>• Verification takes 48-72 hours</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileCheck className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Verification Process</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get your property and identity verified quickly. Upload Aadhaar, property documents, and ownership proof for trusted badge.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Aadhaar card (front & back)</li>
                <li>• Property ownership proof</li>
                <li>• Recent utility bill</li>
                <li>• Get "Verified" badge</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Maximize Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Tips to increase visibility and bookings: respond quickly to inquiries, maintain high ratings, keep listing updated, offer competitive rates.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Respond within 2 hours</li>
                <li>• Update availability regularly</li>
                <li>• Maintain property well</li>
                <li>• Gather positive reviews</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Managing Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Best practices for tenant communication, handling disputes, rent collection, and maintaining good relationships with students.
              </p>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Clear house rules from start</li>
                <li>• Regular property maintenance</li>
                <li>• Fair and timely communication</li>
                <li>• Handle issues professionally</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OwnerSupport;

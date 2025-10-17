import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
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

          {/* Demo Badge */}
          <div className="mb-6">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              ⚠️ Demo Privacy Policy - Replace Before Production
            </Badge>
          </div>

          <div className="bg-background rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            
            <p className="text-muted-foreground mb-6">
              <strong>Last Updated:</strong> January 2025
            </p>

            <p className="mb-8 text-muted-foreground">
              This is a demo privacy policy for EduStay. This document should be replaced with a legally 
              compliant privacy policy before production deployment.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Personal identification information (Name, email address, phone number)</li>
                  <li>Student verification documents (College ID, admission letters)</li>
                  <li>Property owner verification documents (Ownership proof, identity documents)</li>
                  <li>Payment information (processed securely through third-party payment processors)</li>
                  <li>Communication data (messages between students and property owners)</li>
                  <li>Usage data (how you interact with our platform)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the collected information for the following purposes:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>To provide and maintain our service</li>
                  <li>To verify the identity of students and property owners</li>
                  <li>To process bookings and payments</li>
                  <li>To communicate with you about your account or transactions</li>
                  <li>To send you updates, security alerts, and support messages</li>
                  <li>To improve our platform and develop new features</li>
                  <li>To detect and prevent fraud or abuse</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell your personal information. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>With property owners when you make a booking inquiry</li>
                  <li>With students when they inquire about your listed property (for owners)</li>
                  <li>With service providers who assist in operating our platform (payment processors, hosting services)</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>In connection with a merger, sale, or acquisition of all or part of our business</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your personal information from unauthorized 
                  access, alteration, disclosure, or destruction. However, no method of transmission over the Internet 
                  or electronic storage is 100% secure. While we strive to protect your information, we cannot 
                  guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Verification Documents</h2>
                <p className="text-muted-foreground">
                  Verification documents (Aadhaar cards, college IDs, property ownership documents) are stored 
                  securely and encrypted. These documents are used solely for verification purposes and are not 
                  shared with third parties except as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Right to access your personal data</li>
                  <li>Right to rectify inaccurate data</li>
                  <li>Right to request deletion of your data</li>
                  <li>Right to restrict or object to data processing</li>
                  <li>Right to data portability</li>
                  <li>Right to withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar tracking technologies to track activity on our platform and store 
                  certain information. You can instruct your browser to refuse all cookies or to indicate when 
                  a cookie is being sent. However, if you do not accept cookies, you may not be able to use some 
                  portions of our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
                <p className="text-muted-foreground">
                  Our service is intended for users who are 18 years of age or older. We do not knowingly collect 
                  personal information from individuals under 18. If we become aware that we have collected personal 
                  information from someone under 18, we will take steps to delete such information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Changes to This Privacy Policy</h2>
                <p className="text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
                  the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review 
                  this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-secondary p-4 rounded-lg">
                  <p className="font-semibold">EduStay Support</p>
                  <p className="text-muted-foreground">Email: privacy@edustay.com</p>
                  <p className="text-muted-foreground">Phone: +91 98765 43210</p>
                  <p className="text-muted-foreground">Address: Adi Saptagram, Hooghly, West Bengal</p>
                </div>
              </section>

              <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 font-semibold mb-2">⚠️ Important Notice</p>
                <p className="text-yellow-700">
                  This is a demo privacy policy template. Before deploying to production, this document must be 
                  reviewed and approved by legal counsel to ensure compliance with applicable laws including GDPR, 
                  CCPA, and Indian data protection regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
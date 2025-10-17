import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Users, Heart, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="py-16 gradient-hero text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About EduStay</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
              Your trusted platform for safe, verified, and affordable student accommodation near Academy of Technology
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                EduStay was founded with a simple yet powerful mission: to connect students with safe, 
                verified, and affordable accommodation near their educational institutions. We understand 
                the challenges students face when looking for a place to stay, and we're here to make 
                that process easier, safer, and more transparent.
              </p>
              <p className="text-lg text-muted-foreground">
                Our platform bridges the gap between students and property owners, ensuring both parties 
                can connect with confidence and trust. Every listing on EduStay undergoes a rigorous 
                verification process to guarantee authenticity and safety.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Safety First</h3>
                <p className="text-muted-foreground">
                  Every property is verified through our EduStay Verification process. We conduct 
                  thorough background checks on property owners and validate all listings.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Student Support</h3>
                <p className="text-muted-foreground">
                  We provide 24/7 support to students, including emergency helplines, dispute resolution, 
                  and assistance with booking and payment processes.
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in complete transparency. All pricing, policies, and property details 
                  are clearly displayed. Reviews are from verified students only.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Process */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Verification Process</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Property Verification</h3>
                    <p className="text-muted-foreground">
                      All properties undergo physical inspection. We verify ownership documents, safety 
                      measures, and ensure photos match actual conditions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Owner Background Checks</h3>
                    <p className="text-muted-foreground">
                      Property owners must verify their identity through government-issued documents. 
                      We maintain a database of verified, trustworthy landlords.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Student Verification</h3>
                    <p className="text-muted-foreground">
                      Students verify their identity through college email, student ID, or admission 
                      documents. This ensures genuine students access the platform.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Continuous Monitoring</h3>
                    <p className="text-muted-foreground">
                      We continuously monitor reviews, feedback, and reports to maintain quality standards 
                      and remove non-compliant listings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Goals */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Student Safety Goals</h2>
              <div className="bg-background rounded-lg p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Provide emergency helplines accessible 24/7 from within the app</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Ensure all listed properties meet basic safety standards (fire safety, secure locks, proper lighting)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Facilitate direct communication between students and property owners with privacy protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Maintain an active grievance redressal system for quick resolution of disputes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Partner with local authorities and college administrations for enhanced security</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join the EduStay Community</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're a student looking for accommodation or a property owner wanting to list your space, 
              EduStay is here to help you connect safely and easily.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/student/signup">
                <Button size="lg">Join as Student</Button>
              </Link>
              <Link to="/owner/signup">
                <Button size="lg" variant="outline">Join as Owner</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
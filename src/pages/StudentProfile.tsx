import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Upload, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const StudentProfile = () => {
  const [name] = useState("Aishik Pramanik");
  const [email] = useState("aishik.pramanik@example.com");
  const [phone, setPhone] = useState("");
  const [college] = useState("Academy of Technology");
  const [aadhaarFront, setAadhaarFront] = useState<File | null>(null);
  const [aadhaarBack, setAadhaarBack] = useState<File | null>(null);
  const [collegeId, setCollegeId] = useState<File | null>(null);
  const [verified, setVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("pending");

  const handleAadhaarFrontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAadhaarFront(e.target.files[0]);
      toast.success("Aadhaar front uploaded");
    }
  };

  const handleAadhaarBackUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAadhaarBack(e.target.files[0]);
      toast.success("Aadhaar back uploaded");
    }
  };

  const handleCollegeIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCollegeId(e.target.files[0]);
      toast.success("College ID uploaded");
    }
  };

  const handleSubmitVerification = () => {
    if (!aadhaarFront || !aadhaarBack || !collegeId) {
      toast.error("Please upload all required documents");
      return;
    }
    
    // Demo auto-approval
    setTimeout(() => {
      setVerified(true);
      setVerificationStatus("approved");
      toast.success("Verification approved! (Demo mode)");
      console.log("STEP 5 COMPLETE: Student signup example name changed and profile page with Aadhaar verification added");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <svg className="h-4 w-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <Badge variant="outline">Demo Content — Fictional</Badge>
          </div>

          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{name}</h2>
                  <p className="text-muted-foreground">{college}</p>
                  <div className="mt-2">
                    {verified ? (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        Verification Under Review
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={name} disabled />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={verified ? email : "***@***.com"} disabled />
                {!verified && <p className="text-xs text-muted-foreground">Email will be visible after verification</p>}
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  placeholder="+91 XXXXX-XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>College</Label>
                <Input value={college} disabled />
              </div>
            </CardContent>
          </Card>

          {/* Aadhaar Verification */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Document Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Step 1: Aadhaar Card Upload</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Aadhaar Front</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAadhaarFrontUpload}
                        className="hidden"
                        id="aadhaar-front"
                      />
                      <label htmlFor="aadhaar-front" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        {aadhaarFront ? (
                          <p className="text-sm text-green-600">{aadhaarFront.name}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Click to upload</p>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Aadhaar Back</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAadhaarBackUpload}
                        className="hidden"
                        id="aadhaar-back"
                      />
                      <label htmlFor="aadhaar-back" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        {aadhaarBack ? (
                          <p className="text-sm text-green-600">{aadhaarBack.name}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground">Click to upload</p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Step 2: College ID Upload</h3>
                <div className="space-y-2">
                  <Label>College ID Card</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCollegeIdUpload}
                      className="hidden"
                      id="college-id"
                    />
                    <label htmlFor="college-id" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      {collegeId ? (
                        <p className="text-sm text-green-600">{collegeId.name}</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">Click to upload</p>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {!verified && (
                <Button 
                  onClick={handleSubmitVerification} 
                  className="w-full"
                  disabled={!aadhaarFront || !aadhaarBack || !collegeId}
                >
                  Submit for Verification
                </Button>
              )}

              {verified && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-semibold text-green-800">Account Verified!</p>
                  <p className="text-sm text-green-700">You can now access all features</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Listings */}
          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">0 Saved Listings</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

// User profile stored in Firestore
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  userType: "student" | "owner" | "admin";
  propertyName?: string;
  phone?: string;
  photoURL?: string;
  createdAt: unknown;
  updatedAt: unknown;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    displayName: string,
    userType: "student" | "owner",
    extras?: { propertyName?: string }
  ) => Promise<void>;
  loginWithGoogle: (userType: "student" | "owner") => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const googleProvider = new GoogleAuthProvider();

// Helper: sync profile to localStorage
const syncToLocalStorage = (
  displayName: string,
  userType: string
) => {
  localStorage.setItem("userName", displayName);
  localStorage.setItem("userType", userType);
  if (userType === "student") {
    localStorage.setItem("isStudentLoggedIn", "true");
    localStorage.removeItem("isOwnerLoggedIn");
  } else if (userType === "owner") {
    localStorage.setItem("isOwnerLoggedIn", "true");
    localStorage.removeItem("isStudentLoggedIn");
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Firestore (non-throwing)
  const fetchUserProfile = async (user: User): Promise<UserProfile | null> => {
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const profile = docSnap.data() as UserProfile;
        setUserProfile(profile);
        syncToLocalStorage(profile.displayName, profile.userType);
        return profile;
      }
    } catch (error) {
      console.warn("Could not fetch Firestore profile (may not be set up yet):", error);
    }
    return null;
  };

  // Try to save user profile to Firestore (non-throwing)
  const saveUserProfileToFirestore = async (
    profile: UserProfile
  ): Promise<boolean> => {
    try {
      const userRef = doc(db, "users", profile.uid);
      await setDoc(userRef, {
        ...profile,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
      return true;
    } catch (error) {
      console.warn(
        "Could not save profile to Firestore. The user account was created in Firebase Auth, " +
        "but Firestore write failed. Make sure Firestore is enabled and rules allow writes.",
        error
      );
      return false;
    }
  };

  // Create user profile — always sets local state, tries Firestore as best-effort
  const createUserProfile = async (
    user: User,
    displayName: string,
    userType: "student" | "owner",
    extras?: { propertyName?: string }
  ) => {
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email || "",
      displayName,
      userType,
      propertyName: extras?.propertyName || "",
      phone: "",
      photoURL: user.photoURL || "",
      createdAt: null,
      updatedAt: null,
    };

    // Always set local state immediately so the app works
    setUserProfile(profile);
    syncToLocalStorage(displayName, userType);

    // Try to persist to Firestore (best-effort)
    await saveUserProfileToFirestore(profile);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const profile = await fetchUserProfile(user);
        // If no Firestore profile but user exists, create a fallback local profile
        if (!profile) {
          const fallback: UserProfile = {
            uid: user.uid,
            email: user.email || "",
            displayName: user.displayName || user.email?.split("@")[0] || "User",
            userType: (localStorage.getItem("userType") as "student" | "owner") || "student",
            phone: "",
            photoURL: user.photoURL || "",
            createdAt: null,
            updatedAt: null,
          };
          setUserProfile(fallback);
          syncToLocalStorage(fallback.displayName, fallback.userType);
          // Try to save to Firestore in the background
          saveUserProfileToFirestore(fallback);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Login with email & password
  const login = async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserProfile(result.user);
  };

  // Signup with email & password
  const signup = async (
    email: string,
    password: string,
    displayName: string,
    userType: "student" | "owner",
    extras?: { propertyName?: string }
  ) => {
    // Step 1: Create the Firebase Auth account (this is the critical step)
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Step 2: Update the Auth profile display name
    try {
      await updateProfile(result.user, { displayName });
    } catch {
      // Non-critical, continue
    }

    // Step 3: Create profile (local state + best-effort Firestore write)
    await createUserProfile(result.user, displayName, userType, extras);
  };

  // Login with Google
  const loginWithGoogle = async (userType: "student" | "owner") => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user profile already exists in Firestore
    const existingProfile = await fetchUserProfile(user);

    if (!existingProfile) {
      // First time Google sign-in — create profile
      await createUserProfile(
        user,
        user.displayName || "User",
        userType
      );
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("isOwnerLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
  };

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

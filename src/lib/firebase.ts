rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Users Collection
    // Allow users to read their own profile.
    // Allow any authenticated user to create their own user document upon sign-up.
    // Allow users to update their own profile (for onboarding, etc.).
    match /users/{userId} {
      allow read, update: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null;
    }
    
    // Default-deny all other collections for now
    // We will add rules for lessonPlans, tests, etc., in later milestones.
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
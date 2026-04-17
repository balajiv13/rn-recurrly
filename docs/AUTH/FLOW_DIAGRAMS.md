# Authentication Flow Diagrams

These visual diagrams show the complete authentication flow in the Recurly app.

## 1. Overall App Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      App Starts                             │
│              (app/_layout.tsx)                              │
│          ClerkProvider + Font Loading                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                    Fonts Loaded?
                         │
        ┌────────────────┴────────────────┐
        │                                  │
       YES                                NO
        │                                  │
   Auth Check                          Loading
        │                               Spinner
        │                                  │
   ┌────┴────┐                        (waits)
   │          │
 Signed    Not
  In?      Signed
   │          │
  YES        NO
   │          │
   ▼          ▼
(tabs)      (auth)
  ✓         ✓
```

## 2. Sign-Up Flow

```
┌──────────────────┐
│  Sign-Up Screen  │
│   (form step)    │
└────────┬─────────┘
         │
    Enter Data:
    - Email
    - Password
    - Confirm Password
         │
         ▼
    ┌─────────┐
    │Validate │
    │  Form   │
    └────┬────┘
         │
    ┌────┴────┐
    │          │
  Valid    Invalid
    │          │
   YES        NO
    │          │────────┐
    │                   │
    ▼              Show Errors
Create Account      (per field)
 (Clerk API)        │
    │               │
    ├───────────────┘
    │
    ▼
Email Request
Sent ✓
    │
    ▼
┌──────────────────┐
│ Verification     │
│ Screen (code)    │
└────────┬─────────┘
         │
   Enter 6-digit
     Code
         │
         ▼
    Verify Code
    (Clerk API)
         │
    ┌─────┴─────┐
    │           │
  Valid    Invalid
    │           │
   YES         NO
    │      Show Error
    │      + Resend
    │      Button
    │           │
    │      (retry)
    │    ┌──────┘
    ▼    │
  Account ├─┐
 Complete ├─┤ (loop)
    │    ├─┘
    │    └──────┐
    ▼           │
 Sign In     Resend
 Session     Code
   ✓          │
    │         ▼
    │      Email Sent
    │         ✓
    │         │ (back to code input)
    │         │
    └─────────┘
         │
         ▼
 (tabs) - Home Screen
    ✓
```

## 3. Sign-In Flow

```
┌──────────────────┐
│  Sign-In Screen  │
└────────┬─────────┘
         │
    Enter:
    - Email
    - Password
         │
         ▼
    ┌─────────┐
    │ Validate│
    │ Fields  │
    └────┬────┘
         │
    ┌────┴────┐
    │          │
  Valid    Invalid
    │          │
   YES        NO
    │          │
    ▼      Show Errors
Sign In    │
(Clerk)    │
    │      └──────┐
    │             │
    ├─────────────┘
    │
    ▼
Check Status:
    - Complete?
    - Need 2FA?
    - Need Verification?
         │
         ▼
   ┌─────┴─────┬──────────┐
   │           │          │
Complete    2FA      Verification
   │           │          │
   ▼           ▼          ▼
 Done      Send MFA   Send Email
   │       Code        Code
   │           │          │
   │           ▼          ▼
   │       Verify     Verify
   │       MFA Code    Email
   │           │          │
   │           └────┬─────┘
   │                │ (both flow to)
   │                │
   └────────────────┘
          │
          ▼
  Set Active Session
   (setActive)
          │
          ▼
  (tabs) - Home Screen
     ✓
```

## 4. Route Protection Flow

```
App Starts
    │
    ▼
ClerkProvider Checks Auth State
    │
    ├─ isLoaded? = false
    │     └─► Show Loading Spinner
    │         (while checking)
    │
    ├─ isLoaded? = true
    │     │
    │     ├─ Route = /(auth)/*
    │     │     │
    │     │     ├─ isSignedIn? = true
    │     │     │     └─► Redirect to /(tabs)
    │     │     │         (skip auth screens)
    │     │     │
    │     │     └─ isSignedIn? = false
    │     │         └─► Show Auth Screen ✓
    │     │
    │     └─ Route = /(tabs)/*
    │         │
    │         ├─ isSignedIn? = true
    │         │     └─► Show Tab Screen ✓
    │         │
    │         └─ isSignedIn? = false
    │             └─► Redirect to /(auth)/sign-in
    │                 (protect route)
```

## 5. Validation Flow

```
User Types in Field
    │
    ▼
┌──────────────────┐
│ Real-Time Check  │
│ (while typing)   │
└────────┬─────────┘
         │
    Clear any
   previous error
    for this field
         │
         ▼
User Stops Typing (On-Blur)
    │
    ▼
┌──────────────────┐
│ On-Blur Check    │
│ (email format)   │
└────────┬─────────┘
         │
    ┌────┴────┐
    │          │
  Valid    Invalid
    │          │
   OK      Show Error
    │    (below field)
    │          │
User Presses Submit Button
    │
    ▼
┌──────────────────┐
│ Complete Form    │
│ Validation       │
└────────┬─────────┘
         │
  Check all fields:
  - Email: format + required
  - Password: strength + required
  - Confirm: match + required
         │
    ┌────┴────┐
    │          │
  All OK   Some Error
    │          │
   YES        NO
    │          │
    │      Show Error(s)
    │    (per field or
    │     general banner)
    │          │
    │          └───┐
    ▼              │
API Call          User Edits
(Send to          │
Clerk)            └──────┐
                         │
                    (loops to
                    Real-Time
                    Check)
```

## 6. Error Handling Flow

```
User Action (sign-in/up)
    │
    ▼
Client Validation Failed?
    │                       │ No → Continue
    ├─ All fields filled?   │
    ├─ Email format OK?  ───┤
    ├─ Password strong?  ───┤
    └─ Confirm match?    ───┤
         │Yes               │
         ▼                  │
    Show Error(s)           │
    (field-specific)        │
         │                  │
         └──────────┐       │
                    │       │
                    ▼       │
              Send API Call │
              to Clerk      │
                    │◄──────┘
                    │
                    ▼
            ┌─────────────────┐
            │ Clerk Response  │
            └────────┬────────┘
                     │
            ┌────────┴────────┐
            │                 │
         Success           Error
            │                 │
           YES                │
            │                 ▼
            │           Parse Error
            │                 │
            │          ┌──────┴──────┐
            │          │             │
            │      User Input    System
            │      Problem       Error
            │          │             │
            │          ▼             ▼
            │      Show            Show
            │      Field Error    General
            │      + Guidance     Error
            │          │          Banner
            │          │             │
            ▼          ▼             ▼
        Complete  User Retries   Retry /
        Auth      (loops back)   Support
         ✓                       Link
```

## 7. Session State Lifecycle

```
App Launch
    │
    ▼
No Session (Fresh Start)
    │
    ▼
User Navigates to Sign-Up/Sign-In
    │
    ├─► Fills Form
    │
    └─► Submits
         │
         ▼
    Creating Session (API call)
         │
         ▼
    Session Created (Clerk returns token)
         │
         ▼
    Token Stored (expo-secure-store)
         │
         ▼
    ┌────────────┐
    │   Active   │
    │  Session ✓ │
    └────┬───────┘
         │
         ▼
    User navigates between screens
    (token automatically sent with requests)
         │
         ▼
    User taps Sign-Out
         │
         ▼
    Clear Session (remove token)
         │
         ▼
    ┌────────────┐
    │  No Session│
    │ (Logged Out)
    └────────────┘
         │
         ▼
    (Back to start)
```

## 8. Authentication State Timeline

```
Timeline: User's Session with App

T0 - App Starts
    ├─ isLoaded = false
    ├─ isSignedIn = false (checking)
    └─ Show: Loading spinner

T1 - Auth System Ready
    ├─ isLoaded = true
    ├─ isSignedIn = depends on cached token
    └─ Show: Appropriate screen

T2a - Signed-In User
    ├─ isSignedIn = true
    ├─ user object = populated
    ├─ Can access: /(tabs)/*
    └─ Cannot access: /(auth)/*

T2b - Unsigned User
    ├─ isSignedIn = false
    ├─ user object = null
    ├─ Can access: /(auth)/*
    └─ Cannot access: /(tabs)/*

T3 - User Signs-Up
    ├─ Submits email + password
    ├─ Gets verification code
    ├─ Enters code
    ├─ Clerk creates session
    ├─ Token stored locally
    └─ isSignedIn = true ✓

T4 - Active Session
    ├─ isSignedIn = true
    ├─ user data cached
    ├─ Token auto-refreshes
    ├─ All requests include token
    └─ Full app access ✓

T5 - User Signs-Out
    ├─ Clicks sign-out
    ├─ Session cleared
    ├─ Token removed
    ├─ isSignedIn = false
    └─ Redirect to /(auth)/sign-in

T6 - End Session
    ├─ Back to signed-out state
    └─ Await next sign-in/up
```

---

**Use these diagrams to:**

- Understand the authentication architecture
- Explain flows to team members
- Debug authentication issues
- Plan new features

**Last Updated:** April 17, 2026

# Architecture Decisions & Design System

This document explains the key architectural decisions made during Clerk authentication implementation.

## 1. Custom Routes Over Prebuilt Components

**Decision:** Build custom authentication screens instead of using Clerk's prebuilt UI.

**Rationale:**

- ✓ Works in Expo Go (no dev build required)
- ✓ Full design control
- ✓ Matches Recurly brand perfectly
- ✓ Better mobile UX
- ✓ Easy to customize

**Trade-off:** More code (~1,000 lines) vs faster setup

---

## 2. Email + Password as Primary Auth

**Decision:** Main auth method is email/password with email verification.

**Rationale:**

- ✓ Familiar pattern to users
- ✓ Works without OAuth setup
- ✓ Email verification prevents account takeover
- ✓ Can add Google/Apple Sign-In later

**Future Phases:** OAuth (Google/Apple), Password reset, 2FA

---

## 3. Two-Step Sign-Up (Form → Verification)

**Decision:** Separate registration and verification into distinct screens.

**Rationale:**

- ✓ Users complete at their own pace
- ✓ Clear UX separation of concerns
- ✓ Better error handling per step
- ✓ Matches modern app patterns
- ✓ Reduces form complexity

**User Flow:**

1. Fill email, password, confirm
2. Submit → Email sent
3. Receive 6-digit code
4. Enter code → Account verified

---

## 4. Smart Validation Strategy

### Three-Level Validation

```
Real-Time (While Typing)
    ↓ Clear errors for field
    ↓ Show password strength

On-Blur (When field unfocused)
    ↓ Email format check
    ↓ Password requirements check

On-Submit (When user taps button)
    ↓ Complete form validation
    ↓ Send to Clerk if valid
    ↓ Show API errors if failed
```

### Field-Specific Errors vs. General Errors

| Error Type       | Display       | Action        |
| ---------------- | ------------- | ------------- |
| Field validation | Under field   | User corrects |
| Format error     | Under field   | User fixes    |
| API error        | Banner at top | User retries  |
| Network error    | Banner at top | Retry button  |

---

## 5. Route Protection Pattern

### App Structure

```
app/
├── (auth)/         ← Don't protect (visible to all)
│   ├── _layout.tsx     (redirects signed-in to /tabs)
│   ├── sign-in.tsx
│   └── sign-up.tsx
└── (tabs)/         ← Protected (redirects unsigned to /auth)
    ├── _layout.tsx     (redirects unsigned to /auth)
    ├── index.tsx
    ├── insights.tsx
    ├── subscriptions.tsx
    └── settings.tsx
```

### How It Works

**Signed-In User Path:**

1. App checks auth state
2. User is signed in ✓
3. Routes to `/(tabs)` ✓
4. All tabs accessible

**Unsigned User Path:**

1. App checks auth state
2. User not signed in ✓
3. Routes to `/(auth)` ✓
4. Can access sign-in/up
5. Cannot access `/(tabs)` → redirected to sign-in

### Why This Pattern?

✓ Simple and predictable  
✓ No redirect loops  
✓ Single source of truth per route group  
✓ Works perfectly with Expo Router  
✓ Easy to understand and maintain

---

## 6. Design System Integration

### Color Palette

```
Background      #fff9e3  (Warm cream - reduces eye strain)
Foreground      #081126  (Deep navy - high contrast)
Primary         #081126  (Same as foreground)
Accent          #ea7a53  (Warm coral - action-inviting)
Card            #fff8e7  (Lighter cream - subtle hierarchy)
Border          rgba(0,0,0,0.1)  (Subtle structure)
Success         #16a34a  (Standard green)
Destructive     #dc2626  (Standard red)
Muted           #f6eecf  (Tinted gray)
Muted Foreground rgba(0,0,0,0.6)  (Readable text)
```

### Typography

```
Font: Plus Jakarta Sans (modern, geometric)

Weights Used:
- Regular    → Body text, descriptions
- Medium     → Form labels
- SemiBold   → Buttons, field labels
- Bold       → Headers, titles
- Light      → Secondary text
```

### Spacing System

```
0  → 0px    (no space)
1  → 4px    (condensed)
2  → 8px    (compact)
3  → 12px   (default)
4  → 16px   (standard)
5  → 20px   (large)
and so on...
```

**Principle:** Everything is divisible by 4px

---

## 7. Component Architecture

### FormInput Component

**Purpose:** Reusable, validated input

**Features:**

- Label display
- Error message below
- Real-time error clearing
- Integrated styling
- Keyboard type support
- Accessibility ready

### AuthButton Component

**Purpose:** Consistent action buttons

**States:**

- Default (clickable)
- Loading (spinner inside)
- Disabled (grayed out)
- Variants: Primary (accent) / Secondary (outline)

### AuthHeader Component

**Purpose:** Consistent page headers

**Features:**

- Large title
- Optional subtitle
- Consistent spacing
- Brand voice

### Other Components

- **ErrorAlert** - Error banner at top
- **AuthLink** - Navigation between auth pages
- Each component is:
  - Self-contained
  - Reusable
  - Type-safe (TypeScript)
  - Accessible

---

## 8. Security Implementation

### Token Management Flow

```
User Sign-In
    ↓
Clerk validates credentials
    ↓
Session token returned
    ↓
Token stored in expo-secure-store (ENCRYPTED)
    ↓
ClerkProvider manages token lifecycle
    ↓
Token sent with authenticated API requests (auto)
    ↓
User Sign-Out
    ↓
Token removed from secure storage
```

### Platform-Specific Secure Storage

- **iOS** → Keychain (encrypted)
- **Android** → Keystore (encrypted)

### Password Security - Three Layers

**Layer 1: Client-Side (UX)**

- Password strength requirements shown in real-time
- Prevents weak passwords from submission
- User sees: "✓ 8+ characters, ✓ 1 Uppercase, ✓ 1 Lowercase, ✓ 1 Number"

**Layer 2: Server-Side (Actual Security)**

- Clerk validates again on backend
- Cannot bypass client validation
- Rate limiting prevents brute force
- Passwords hashed with bcrypt

**Layer 3: Transport Security**

- All Clerk API calls use HTTPS
- TLS encryption of data in transit

### Password Requirements

```
✓ Minimum 8 characters
✓ At least 1 UPPERCASE letter
✓ At least 1 lowercase letter
✓ At least 1 number
✗ Example bad: "password" (no upper, no number)
✓ Example good: "MyPass123"
```

---

## 9. Error Handling Strategy

### Error Categories & Handling

| Error Type      | Source  | Display | Action           |
| --------------- | ------- | ------- | ---------------- |
| Format          | Client  | Field   | Clear on re-type |
| Validation      | Server  | Field   | User adjusts     |
| Duplicate Email | Server  | Field   | Suggest sign-in  |
| Network         | Network | Banner  | Retry button     |
| Session         | Auth    | Banner  | Re-authenticate  |
| Unknown         | General | Banner  | Support link     |

### Error Message Philosophy

**✓ Good errors:**

- "Email already in use. Try signing in instead."
- "Password must contain at least one number."
- "We couldn't verify your email. Please try again."

**✗ Bad errors:**

- "Error 422"
- "Invalid request object"
- "Something went wrong"

---

## 10. Performance Optimizations

### Bundle Size Impact

```
Clerk SDK         ~100KB
Form components   ~20KB
Validation        ~5KB
Total overhead    ~125KB
```

### Render Optimization

- Separate form state → fewer re-renders
- Error clearing only updates affected field
- Loading state prevents accidental double-submission
- useAuth() and useUser() only re-render when changed

### Network Optimization

- Client validation before API calls reduces round-trips
- Automatic token refresh (transparent)
- No token parsing on client (Clerk handles)
- Efficient error parsing

---

## 11. Testing Approach

### Manual QA Checklist

**Sign-Up:**

- [ ] Valid data → Success
- [ ] Duplicate email → Error
- [ ] Weak password → Error
- [ ] Password mismatch → Error
- [ ] Email verification → Works
- [ ] Resend code → Works

**Sign-In:**

- [ ] Valid credentials → Success
- [ ] Wrong password → Error
- [ ] Unknown email → Error

**Route Protection:**

- [ ] Signed-in access /(tabs) → Works
- [ ] Unsigned access /(tabs) → Redirects to /(auth)
- [ ] Deep links respected

**Sign-Out:**

- [ ] Sign-out works
- [ ] Token cleared
- [ ] Can sign back in

### Unit Tests (Future)

```typescript
validateEmail("test@example.com") → true
validatePassword("Weak") → { isValid: false, errors: [...] }
validatePasswordConfirm("Pass", "Pass") → true
```

---

## 12. Future Enhancement Ideas

### Phase 2: OAuth

- [ ] Sign in with Google (native button)
- [ ] Sign in with Apple (native button)
- [ ] Customize OAuth UI flow

### Phase 3: Advanced Auth

- [ ] Password reset flow
- [ ] Multi-factor authentication (2FA)
- [ ] Session management (view active sessions)
- [ ] Account deletion

### Phase 4: Enterprise

- [ ] Biometric sign-in (fingerprint/face)
- [ ] Single sign-on (SSO)
- [ ] Organization/team support
- [ ] Role-based access control

---

## 13. Maintenance Guidelines

### When Updating Clerk SDK

1. Check Clerk changelog for breaking changes
2. Test authentication flow
3. Verify token handling
4. Check session persistence

### When Adding Features

1. Ensure auth state verified first
2. Add route protection if needed
3. Test with/without auth
4. Update this document

### Code Quality Standards

- **TypeScript:** All components typed, no `any` types
- **React Patterns:** Functional components, custom hooks
- **NativeWind:** Style via className, no inline styles
- **Validation:** Client & server-side checks

---

**Last Updated:** April 17, 2026  
**Status:** Production Ready  
**Next Review:** After OAuth implementation

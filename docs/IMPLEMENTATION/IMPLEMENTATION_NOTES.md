# Implementation Notes - Clerk Authentication

## Architecture Decisions

### 1. Custom Routes Over Prebuilt Components

**Decision:** Build custom authentication screens instead of using Clerk's prebuilt UI components.

**Rationale:**

- Zero-dependency design: Works in Expo Go without dev build required
- Maximum design flexibility: Full control over UI/UX
- Brand consistency: Matches Recurly's warm, professional aesthetic
- Developer control: Easy to customize error handling and flows
- Better mobile experience: Optimized for React Native

**Trade-off:** More code to maintain vs. faster setup with prebuilt

### 2. Email + Password Authentication

**Decision:** Primary auth method is email/password custom flow with email verification.

**Rationale:**

- Standard, familiar pattern for users
- Optional: Can add native Sign in with Google/Apple later
- Verification prevents account takeover
- Works without OAuth setup initially

**Next Steps:** Add OAuth (Google/Apple) once core flow is tested

### 3. Two-Step Sign-Up (Form → Verification)

**Decision:** Separate registration form and email verification into distinct UI steps.

**Rationale:**

- User can complete registration on their own pace
- Clear separation of concerns in UI
- Better error handling for each step
- Matches modern app patterns (Stripe, Stripe-like services)
- Reduces form complexity on sign-up screen

### 4. Validation Strategy

**Smart Validation:**

- **Real-time:** Password strength shown while typing
- **On-blur:** Email format validated when field loses focus
- **On-submit:** Complete form validation before API call
- **Field-specific errors:** Each field shows its own error
- **General errors:** API errors shown in banner

**Benefits:**

- Immediate feedback without frustration
- Professional UX
- Reduces server calls
- Clear guidance to users

### 5. Route Protection Pattern

**Implementation:**

```
app/
├── (auth)/ - **Don't protect**: visible to all
│  └── _layout redirects signed-in users to (tabs)
└── (tabs)/ - **Protected**: redirects unauthenticated users to (auth)
```

**Rationale:**

- Simple, clear pattern
- No infinite redirect loops
- Single source of truth per route group
- Works with Expo Router's layout system

## Design System Integration

### Color Palette Decisions

| Use Case     | Color         | Hex               | Rationale                            |
| ------------ | ------------- | ----------------- | ------------------------------------ |
| Primary Text | Navy          | `#081126`         | High contrast, professional          |
| Buttons      | Coral         | `#ea7a53`         | Warm, action-inviting, matches brand |
| Background   | Cream         | `#fff9e3`         | Warm, reduces eye strain             |
| Cards        | Lighter Cream | `#fff8e7`         | Subtle hierarchy                     |
| Borders      | Subtle Gray   | `rgba(0,0,0,0.1)` | Non-intrusive structure              |
| Errors       | Red           | `#dc2626`         | International standard for errors    |
| Success      | Green         | `#16a34a`         | Standard success indicator           |

### Typography Stack

- **Plus Jakarta Sans** - Modern, geometric font
- **Regular:** Body text, descriptions
- **Medium:** Form labels
- **SemiBold:** Buttons, field labels
- **Bold:** Headers, titles

### Spacing System

```
0  → 0px
1  → 4px    (condensed spacing)
2  → 8px    (padding in compact areas)
3  → 12px   (default padding)
4  → 16px   (standard margin)
5  → 20px   (large spacing)
```

## Component Architecture

### FormInput Component

**Purpose:** Reusable, validated input component

**Features:**

- Label display
- Error message below field
- Optional icon support
- Integrated styling
- Accessibility-ready

**Usage:**

```tsx
<FormInput
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  error={emailError}
  keyboardType="email-address"
/>
```

### AuthButton Component

**Purpose:** Consistent auth action button

**Features:**

- Primary & secondary variants
- Loading state with spinner
- Disabled state handling
- Full-width responsive
- Visual feedback on press

**Variants:**

- Primary (accent color) - main actions
- Secondary (outline) - alternative actions

### AuthHeader Component

**Purpose:** Consistent page headers

**Features:**

- Large title
- Optional subtitle
- Consistent spacing
- Brand voice: welcoming, clear

## Security Implementation

### Token Management

```
User Login
    ↓
Clerk API validates credentials
    ↓
Session token returned
    ↓
Token stored in expo-secure-store (encrypted)
    ↓
ClerkProvider manages token lifecycle
    ↓
Token sent with authenticated requests automatically
    ↓
Sign-out clears token storage
```

### Password Security

1. **Client-side validation** (UX improvement)
   - Strength requirements shown immediately
   - Prevents weak passwords from submission

2. **Server-side validation** (actual security)
   - Clerk validates again on server
   - Can't bypass client validation
   - Rate limiting prevents brute force

3. **Encryption in transit**
   - All Clerk API calls use HTTPS
   - Tokens encrypted with TLS

4. **Secure storage**
   - expo-secure-store encrypts on device
   - Platform-specific secure storage:
     - iOS: Keychain
     - Android: Keystore

## Error Handling Strategy

### Error Types & Responses

| Error Type      | Source    | Display     | Action           |
| --------------- | --------- | ----------- | ---------------- |
| Format          | Client    | Field error | Clear on re-type |
| Validation      | Server    | Field error | User adjusts     |
| Duplicate Email | Server    | Field error | Suggest sign-in  |
| Network         | Network   | Banner      | Retry button     |
| Session         | Auth      | Banner      | Re-authenticate  |
| Unknown         | Catch-all | Banner      | Support link     |

### Error Message Guidelines

✅ **Good:**

- "Email already in use. Try signing in instead."
- "Password must contain at least one number."
- "We couldn't verify your email. Please try again."

❌ **Bad:**

- "Error 422"
- "Invalid request object"
- "Something went wrong"

## Performance Optimizations

### Bundle Size

- Clerk SDK: ~100KB
- Form components: ~20KB
- Validation: ~5KB
- Total overhead: ~125KB

### Render Optimization

- Separate form state prevents unnecessary re-renders
- Error clearing only updates affected field
- Loading state prevents double-submission
- useAuth() and useUser() only re-render on change

### Network

- No unnecessary API calls
- Client validation before submission
- Automatic token refresh
- No token parsing on client

## Testing Approach

### Unit Tests (Future)

```typescript
// Validation functions
validateEmail("test@example.com") → true
validatePassword("Weak") → { isValid: false, errors: [...] }
validatePasswordConfirm("Pass", "Pass") → true
```

### Integration Tests (Future)

```
Sign-up flow end-to-end
Sign-in flow end-to-end
Route protection validation
Sign-out flow
Email verification
```

### Manual QA Checklist

- [ ] Sign-up with new email
- [ ] Sign-up with existing email (rejected)
- [ ] Weak password validation
- [ ] Password mismatch validation
- [ ] Email verification flow
- [ ] Sign-in success
- [ ] Sign-in with wrong password
- [ ] Route protection redirects
- [ ] Sign-out and re-authenticate
- [ ] Deep linking while unauthenticated
- [ ] Network failure handling

## Future Enhancements

### Phase 2: OAuth

- [ ] Sign in with Google (native)
- [ ] Sign in with Apple (native)
- [ ] Customize OAuth UI
- [ ] OAuth error handling

### Phase 3: Additional Features

- [ ] Password reset flow
- [ ] Multi-factor authentication
- [ ] Session management (view active sessions)
- [ ] Account deletion
- [ ] Profile editing

### Phase 4: Advanced

- [ ] Biometric sign-in (fingerprint/face)
- [ ] Single sign-on (SSO)
- [ ] Organization/team support
- [ ] Role-based access control

## Code Quality Standards

### TypeScript

- All components typed
- Props interfaces defined
- No `any` types unless necessary
- Error types properly handled

### React Patterns

- Hooks for state management
- Functional components (no class components)
- Custom hooks for reusable logic
- Proper cleanup in useEffect

### NativeWind/Tailwind

- Style through className
- Consistent spacing/colors
- No inline styles
- Utility-first approach

## Maintenance Notes

### When Updating Clerk SDK

1. Check breaking changes
2. Test authentication flow
3. Update token handling if needed
4. Verify session persistence

### When Modifying Auth Flow

1. Update both sign-in and sign-up if related
2. Test route protection
3. Verify error messages are clear
4. Test on iOS & Android

### When Adding New Features

1. Ensure auth state verified first
2. Add route protection if needed
3. Test with and without auth
4. Update this document

---

**Last Updated:** April 2026  
**Next Review:** After OAuth integration  
**Owner:** Development Team

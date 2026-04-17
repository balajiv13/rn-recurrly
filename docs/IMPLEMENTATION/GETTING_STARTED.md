# Getting Started - Setup Checklist

Complete this checklist to set up the Recurly app with authentication on your machine.

## Pre-Installation

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm 9+ installed (`npm --version`)
- [ ] Expo CLI globally installed (`npx expo --version`)
- [ ] Project cloned/open in your editor

## Step 1: Install Dependencies (5 minutes)

```bash
cd rn_recurrly
npm install
```

Verify:

- ✓ No "ERR!" messages
- ✓ No "peer dependency" errors

## Step 2: Setup Clerk Account (10 minutes)

1. Go to https://clerk.com/sign-up
2. Create account
3. Create new Application → Select "Expo"
4. Name: "Recurly"
5. Go to Dashboard → API Keys
6. Copy the **Publishable Key** (starts with `pk_test_`)

## Step 3: Setup Environment File (2 minutes)

```bash
# Copy template
cp .env.example .env

# Edit .env and add your key:
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
```

**Important:** Never commit `.env` - it contains sensitive keys!

## Step 4: Start Dev Server (3 minutes)

```bash
npm run start
```

You should see:

```
› Waiting on exp://YOUR_IP:8081
› Using Expo Go
› iOS: press 'i'
› Android: press 'a'
```

Keep this terminal open!

## Step 5: Run App

### iOS (Mac only)

- Press `i` in terminal
- Wait 30-60 seconds for simulator to open
- App should load

### Android

- Press `a` in terminal
- Wait for virtual device to launch
- App should load

### Web

- Press `w` in terminal
- Browser opens to localhost

## Step 6: Test Sign-Up Flow

1. ✓ App shows "Welcome back" screen
2. ✓ Tap "Don't have an account? Sign up"
3. ✓ Enter email, password, confirm password
4. ✓ See password strength feedback
5. ✓ Tap "Create account"
6. ✓ Check email for 6-digit code
7. ✓ Enter code in app
8. ✓ See home screen with your name

**Troubleshooting:**

- Email not received? Check spam folder
- Password failing? Must have: 8+ chars, uppercase, lowercase, number
- Example good password: `MyPass123` ✓

## Step 7: Test Sign-In/Sign-Out

1. ✓ Settings tab → Scroll down → Tap "Sign out"
2. ✓ Redirects to sign-in screen
3. ✓ Sign in with your email/password
4. ✓ Redirects to home screen

## Step 8: Verify Route Protection

1. ✓ Navigate between tabs (all should work)
2. ✓ Deep linking test (advanced):
   - Sign out
   - Try to access protected tab via deep link
   - Should redirect to sign-in ✓

## All Set! 🎉

Your authentication is working! Next:

1. Read the docs in `/docs/AUTH/`
2. Review `/docs/IMPLEMENTATION/ARCHITECTURE_DECISIONS.md`
3. Check `/docs/README.md` for full documentation index

## Key Files to Know

| Screen   | File                      |
| -------- | ------------------------- |
| Sign-In  | `app/(auth)/sign-in.tsx`  |
| Sign-Up  | `app/(auth)/sign-up.tsx`  |
| Home     | `app/(tabs)/index.tsx`    |
| Settings | `app/(tabs)/settings.tsx` |

## Common Commands

```bash
# Start dev server
npm run start

# Clear cache and restart
expo start --clear

# Run on iOS
npm run ios

# Run on Android
npm run android

# Format code
npm run format

# Lint check
npm run lint
```

## Troubleshooting

| Issue                 | Solution                                                           |
| --------------------- | ------------------------------------------------------------------ |
| "Clerk key not found" | Check `.env` file exists and has correct key                       |
| App stuck loading     | Run `expo start --clear` to clear cache                            |
| Email not received    | Check spam, wait 30s, try different email                          |
| Can't see form        | StyleSafeAreaView wrapping may not be applied - check auth screens |
| Infinite redirect     | Sign out fully, clear cache with `expo start --clear`              |

## Need Help?

1. Check docs in `/docs/` folder
2. See `/docs/AUTH/TROUBLESHOOTING.md` for common issues
3. Check project README.md
4. Contact: [team]

---

**Status:** ✅ Setup Complete  
**Next:** Review documentation in `/docs/`

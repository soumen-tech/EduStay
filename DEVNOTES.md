# EduStay Development Notes

## Overview
EduStay is a student accommodation platform built with React, TypeScript, Vite, and Tailwind CSS. This document provides technical implementation details for developers.

---

## Payment Integration

### Current Implementation: Mock Payment Gateway

The payment flow (`src/pages/PaymentFlow.tsx`) currently uses a mock payment system for demonstration purposes.

#### Mock Payment API Functions

1. **`initiatePayment()`** - Simulates payment intent creation
2. **`confirmPayment(intentId)`** - Simulates payment confirmation with 90% success rate
3. **Escrow Flow** - UI shows payment held in escrow until check-in

#### Integration Points for Real Gateway

**Configuration** (`PAYMENT_CONFIG` object):
```typescript
const PAYMENT_CONFIG = {
  PAYMENT_GATEWAY_PROVIDER: 'MOCK_GATEWAY', // Replace with 'RAZORPAY' | 'STRIPE' | 'PAYPAL'
  API_KEY: 'demo_api_key_replace_in_production', // Replace with real API key
  WEBHOOK_URL: '/api/payments/webhook' // Configure webhook endpoint
};
```

**Required Changes for Production:**

1. **Server-side Payment Intent Creation**
   - Create backend endpoint: `POST /api/payments/initiate`
   - Validate booking details and user authentication
   - Create payment intent via gateway SDK
   - Return `paymentIntentId` and `clientSecret`

2. **Client-side Confirmation**
   - Use gateway SDK (Razorpay, Stripe, etc.) to process payment
   - Handle 3D Secure / OTP verification flows
   - Wait for payment confirmation callback

3. **Webhook Handler**
   - Create endpoint: `POST /api/payments/webhook`
   - Verify webhook signature from gateway
   - Update booking status in database
   - Send confirmation emails
   - Release payment from escrow upon check-in

4. **Security Checklist**
   - Never store raw API keys in frontend code
   - Implement server-side validation for all payment requests
   - Verify webhook authenticity using signature validation
   - Implement idempotency for payment operations
   - Log all payment events for audit trail

**Migration Note:** Replace mock functions in `PaymentFlow.tsx` with actual gateway SDK calls. The UI and flow are already built and can remain unchanged.

---

## Saved Properties System

### Guest Mode (localStorage)
- **Storage Key:** `edustay_saved_properties`
- **Format:** JSON array of property IDs
- **Persistence:** Browser-specific, cleared on cache clear
- **Limitation:** Not synced across devices or sessions

### Logged-in Mode (Mock API)
- **Storage:** Currently uses `localStorage` with user prefix
- **Production:** Replace with server-side API calls
  - `GET /api/users/saved-properties` - Fetch saved items
  - `POST /api/users/saved-properties` - Add property
  - `DELETE /api/users/saved-properties/:id` - Remove property

**Code Location:** `src/components/PropertyCard.tsx`

---

## Back Button Navigation Logic

### "Go back to Home" (Direct from Landing)
Pages opened directly from home show "Go back to Home" and navigate explicitly to `/`:
- Property Details page
- Find Accommodation page
- About, Privacy, Feedback pages
- Map View page

**Implementation:**
```tsx
<Link to="/">
  <Button>Go back to Home</Button>
</Link>
```

### "Go back" (Nested Flows)
Pages in nested flows use `navigate(-1)` with fallback to home:
- Payment Flow page
- Modal dialogs
- Secondary flows

**Implementation:**
```tsx
onClick={() => {
  const hasHistory = window.history.length > 1;
  if (hasHistory) {
    navigate(-1);
  } else {
    navigate('/');
  }
}}
```

---

## Accessibility Features

### Reduced Motion Support
Users who prefer reduced motion (via OS settings) will experience:
- Instant transitions instead of animations
- No automatic carousel scrolling
- Disabled hover animations

**Implementation:** See `src/index.css` - `@media (prefers-reduced-motion: reduce)`

### ARIA Labels
All interactive elements include proper ARIA labels:
- Navigation menus: `aria-label`, `role="navigation"`
- Buttons: Descriptive labels with `aria-describedby` where needed
- Forms: Associated labels with inputs
- Dialogs: `role="dialog"`, `aria-modal="true"`

### Keyboard Navigation
- Tab order follows logical flow
- Focus indicators visible on all interactive elements
- Modal traps focus until closed
- Skip links for screen readers (future enhancement)

---

## Design System

### Color Tokens (index.css)
All colors use HSL format and CSS variables:
- `--primary`: Main brand color (blue)
- `--accent`: Accent color (orange)
- `--background`: Page background
- `--foreground`: Text color
- `--muted`: Subtle text/backgrounds

**Never use direct colors** (e.g., `text-white`, `bg-blue-500`) in components. Always use semantic tokens.

### Gradients and Shadows
```css
--gradient-hero: linear-gradient(135deg, hsl(210 100% 50%), hsl(195 100% 45%));
--shadow-card: 0 2px 8px -2px hsl(210 100% 50% / 0.1);
--shadow-hover: 0 8px 24px -4px hsl(210 100% 50% / 0.2);
```

### Animation Utilities
- `animate-fade-in` - Fade in with slight upward motion
- `animate-slide-in` - Slide in from left
- `hover-lift` - Lift on hover (cards)
- `shadow-hover` - Enhanced shadow on hover

---

## Demo Data & Content

All demo content is tagged with:
```tsx
<Badge>Demo Content — Fictional</Badge>
```

**Demo Property Data:** Located in `src/pages/FindAccommodation.tsx` - `allProperties` array

**Demo User Credentials:**
- Students: Any email + password (not validated in demo)
- Owners: Any email + password (not validated in demo)

**Production Readiness:**
- Remove or replace all demo badges
- Implement real authentication (Supabase Auth, Firebase, etc.)
- Connect to actual database for properties
- Replace localStorage with API calls

---

## Testing & Quality Assurance

### Automated Tests (Future)
- Unit tests for utilities and hooks
- Integration tests for payment flow
- E2E tests for critical user journeys
- Accessibility tests using axe

### Manual Testing Checklist
- [ ] Mobile responsiveness (320px - 1920px)
- [ ] Dark/light mode compatibility
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Payment flow (all methods)
- [ ] Save/unsave animation
- [ ] Back button behavior
- [ ] Login/logout flows

---

## Performance Optimizations

### Image Loading
- Hero images use shimmer placeholder (see `src/pages/Index.tsx`)
- Property images lazy-loaded via React
- Consider WebP format for production

### Code Splitting
- Route-based code splitting via React Router
- Lazy load heavy components (e.g., map libraries)

### Bundle Size
- Current dependencies are minimal
- Use tree-shaking for production builds
- Consider removing unused UI components

---

## Environment Variables

**Required for Production:**
```env
VITE_PAYMENT_GATEWAY_API_KEY=<your-key>
VITE_PAYMENT_GATEWAY_PROVIDER=razorpay
VITE_API_BASE_URL=https://api.edustay.com
VITE_GOOGLE_MAPS_API_KEY=<your-key>
```

**Current (Demo):**
No environment variables required. All config is hardcoded for demo.

---

## Future Enhancements

1. **Real-time Chat** - Student-owner messaging
2. **Advanced Filters** - More granular search options
3. **Reviews System** - Verified student reviews
4. **Geolocation** - Distance calculation from user location
5. **Push Notifications** - Booking confirmations, reminders
6. **Multi-language** - i18n implementation (Hindi, Bengali, etc.)
7. **Admin Dashboard** - Property approval, user management
8. **Analytics** - User behavior tracking, conversion metrics

---

## Support & Contact

For technical questions or issues:
- **Demo Site:** [Your demo URL]
- **Documentation:** This file
- **Team Contact:** [Your contact info]

---

**Last Updated:** January 2025

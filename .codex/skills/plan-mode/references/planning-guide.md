# Planning Guide for Plan Mode

## What Makes a Good Plan?

A good ExecPlan is:
- **Specific:** No vague statements like "implement the feature"
- **Verifiable:** Each milestone has clear success criteria
- **Complete:** All affected files and components identified
- **Detailed:** Enough detail to execute without further research
- **Structured:** Follows a logical progression of milestones

## Example: Good vs. Bad Milestones

### ❌ Bad Milestone

```markdown
### Milestone 1: Add authentication

**Goal:** Add auth to the app

**Implementation:**
- Add login
- Add logout

**Verification:**
- Test it works
```

**Problems:**
- Too vague - what kind of auth?
- No file paths specified
- No technical details
- Unclear success criteria

### ✅ Good Milestone

```markdown
### Milestone 1: Implement JWT Authentication Middleware

**Goal:** Create Express middleware to verify JWT tokens on protected routes

**Implementation:**
- Create `src/middleware/auth.js`
- Implement `verifyToken()` function using jsonwebtoken library
- Extract user ID from token payload
- Attach user object to `req.user`
- Handle token expiration and invalid tokens with 401 responses
- Follow existing error handling pattern in `src/middleware/errorHandler.js`

**Verification:**
- [ ] Middleware correctly validates valid JWT tokens
- [ ] Middleware rejects expired tokens with 401 status
- [ ] Middleware rejects malformed tokens with 401 status
- [ ] `req.user` contains correct user ID from token payload
- [ ] Unit tests pass: `npm test src/middleware/auth.test.js`

**Files Affected:**
- `src/middleware/auth.js` - New file, create middleware
- `src/routes/api.js` - Add middleware to protected routes
- `package.json` - Already has jsonwebtoken@9.0.0

**Estimated Effort:** 30 minutes

**Dependencies:** None - can be implemented first
```

**Why it's good:**
- Specific technical approach (JWT, Express middleware)
- Exact file paths
- Implementation details (function names, patterns to follow)
- Clear, testable success criteria
- Realistic time estimate

## Common Planning Patterns

### Pattern 1: Database Schema Changes

```markdown
### Milestone X: Add User Preferences Table

**Goal:** Create database table for storing user preferences

**Implementation:**
- Create migration file: `migrations/YYYY-MM-DD-add-user-preferences.js`
- Schema:
  - `id` (UUID, primary key)
  - `user_id` (UUID, foreign key to users table)
  - `theme` (VARCHAR(20), values: 'light', 'dark', 'auto')
  - `notifications_enabled` (BOOLEAN, default true)
  - `created_at` (TIMESTAMP)
  - `updated_at` (TIMESTAMP)
- Add indexes on `user_id` for query performance
- Follow existing migration pattern in `migrations/2024-01-15-add-sessions.js`

**Verification:**
- [ ] Run migration: `npm run migrate`
- [ ] Migration creates table with correct schema
- [ ] Can insert test record
- [ ] Foreign key constraint prevents orphaned records
- [ ] Can rollback migration successfully

**Files Affected:**
- `migrations/YYYY-MM-DD-add-user-preferences.js` - New migration file
- `src/models/UserPreferences.js` - New model (next milestone)

**Estimated Effort:** 20 minutes
```

### Pattern 2: API Endpoint Implementation

```markdown
### Milestone X: Create GET /api/users/:id Endpoint

**Goal:** Implement endpoint to fetch user details by ID

**Implementation:**
- Add route handler in `src/routes/users.js`
- Function: `async getUserById(req, res, next)`
- Validate UUID format for `:id` parameter
- Query database using `User.findById(id)`
- Return 404 if user not found
- Return 200 with user JSON (exclude password field)
- Use existing `asyncHandler` wrapper for error handling
- Follow RESTful conventions from `src/routes/posts.js`

**Verification:**
- [ ] GET /api/users/valid-uuid returns 200 with user data
- [ ] GET /api/users/invalid-uuid returns 400 with error
- [ ] GET /api/users/nonexistent-uuid returns 404
- [ ] Response excludes password field
- [ ] Integration test passes: `npm test src/routes/users.test.js`

**Files Affected:**
- `src/routes/users.js` - Add getUserById handler and route
- `src/routes/users.test.js` - Add integration tests

**Estimated Effort:** 25 minutes
```

### Pattern 3: Frontend Component Creation

```markdown
### Milestone X: Create UserProfileCard Component

**Goal:** Build reusable React component for displaying user profile information

**Implementation:**
- Create `src/components/UserProfileCard/UserProfileCard.tsx`
- Create `src/components/UserProfileCard/UserProfileCard.module.css`
- Create `src/components/UserProfileCard/index.ts` (barrel export)
- Props interface:
  - `user: { id: string, name: string, email: string, avatarUrl?: string }`
  - `onEdit?: () => void` (optional)
  - `className?: string` (for style overrides)
- Display user avatar (fallback to initials if no avatarUrl)
- Display name and email
- Conditionally render "Edit" button if onEdit provided
- Use existing design system components from `src/components/ui/`
- Follow component structure pattern from `src/components/PostCard/`

**Verification:**
- [ ] Component renders with all user data
- [ ] Avatar displays image when URL provided
- [ ] Avatar shows initials when no URL
- [ ] Edit button appears only when onEdit provided
- [ ] Edit button calls onEdit when clicked
- [ ] Component tests pass: `npm test UserProfileCard.test.tsx`
- [ ] Storybook story renders correctly: `npm run storybook`

**Files Affected:**
- `src/components/UserProfileCard/UserProfileCard.tsx` - New component
- `src/components/UserProfileCard/UserProfileCard.module.css` - New styles
- `src/components/UserProfileCard/UserProfileCard.test.tsx` - New tests
- `src/components/UserProfileCard/UserProfileCard.stories.tsx` - New story
- `src/components/UserProfileCard/index.ts` - New barrel export

**Estimated Effort:** 45 minutes
```

## Decision Log Examples

### Example 1: Technology Choice

```markdown
### Decision 1: Choose JWT vs. Session-based Authentication

**Context:** Need to implement user authentication for the API

**Options Considered:**
1. **JWT (JSON Web Tokens)**
   - ✅ Stateless, scales horizontally
   - ✅ Works well with mobile apps
   - ✅ No server-side session storage needed
   - ❌ Can't invalidate tokens before expiry
   - ❌ Larger payload size in headers

2. **Session-based (with Redis)**
   - ✅ Can invalidate sessions immediately
   - ✅ Smaller cookie size
   - ❌ Requires Redis infrastructure
   - ❌ Session storage overhead
   - ❌ Harder to scale across multiple servers

**Decision:** Use JWT with short expiration (15 min) and refresh tokens

**Rationale:**
- Project roadmap includes mobile app (Q2)
- Infrastructure team prefers stateless services
- Can implement token blacklist later if needed
- Refresh token pattern mitigates revocation issue
```

### Example 2: Architectural Approach

```markdown
### Decision 2: Refactor to Repository Pattern vs. Keep Active Record

**Context:** Data access code is mixed with business logic, making testing difficult

**Options Considered:**
1. **Introduce Repository Pattern**
   - ✅ Separates data access from business logic
   - ✅ Easier to mock in tests
   - ✅ More flexible for future data source changes
   - ❌ More boilerplate code
   - ❌ Requires refactoring existing code
   - ❌ Team less familiar with pattern

2. **Keep Current Active Record Pattern**
   - ✅ Team is familiar
   - ✅ Less code to write
   - ✅ No refactoring needed
   - ❌ Hard to test
   - ❌ Tight coupling to database

3. **Use Existing ORM Query Builder More**
   - ✅ Minimal changes
   - ✅ Some separation achieved
   - ❌ Still couples business logic to ORM
   - ❌ Doesn't fully solve testing issue

**Decision:** Introduce Repository Pattern incrementally

**Rationale:**
- Start with new features using repositories
- Refactor existing code as we touch it
- Create repository interfaces for key entities first (User, Post)
- Team will learn pattern through code reviews
- Long-term maintainability outweighs short-term effort
```

## Milestone Sequencing Tips

### Sequential vs. Parallel Milestones

**Sequential (must be in order):**
```markdown
- [ ] Milestone 1: Create database migration
- [ ] Milestone 2: Create model (depends on M1)
- [ ] Milestone 3: Create API endpoint (depends on M2)
- [ ] Milestone 4: Create frontend component (depends on M3)
```

**Parallel (can be done simultaneously):**
```markdown
- [ ] Milestone 1: Create database migration
- [ ] Milestone 2: Design UI component (independent)
- [ ] Milestone 3: Write API documentation (independent)
```

### Smart Milestone Sizing

**Too Large (> 1 hour):**
```markdown
❌ Milestone: Implement entire authentication system
```

**Too Small (< 10 minutes):**
```markdown
❌ Milestone: Import JWT library
```

**Just Right (15-45 minutes):**
```markdown
✅ Milestone: Create JWT authentication middleware
✅ Milestone: Implement login endpoint
✅ Milestone: Add token refresh endpoint
```

## Risk Assessment Examples

```markdown
## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Database migration breaks production | High | Low | Test migration on staging, create rollback script, backup production DB before deploy |
| JWT library has security vulnerability | High | Low | Pin specific version, monitor security advisories, use automated dependency scanning |
| New UI component doesn't match design system | Medium | Medium | Review Figma designs with designer before coding, use existing components where possible |
| API response time degrades with new feature | Medium | Medium | Add database indexes, implement caching, load test before deployment |
| Browser compatibility issues | Low | Medium | Test in Chrome, Firefox, Safari, use polyfills for newer JS features |
```

## Complete Example Plan

```markdown
---
plan_id: 2025-01-07-user-preferences
created: 2025-01-07T14:30:00Z
status: draft
model: gpt-5-codex
milestone_count: 5
---

# ExecPlan: User Theme Preferences

## Purpose

Allow users to customize their UI theme (light/dark/auto) and save their preference persistently. This addresses the #1 requested feature from user feedback.

## Context

**Current Architecture:**
- Express.js backend with PostgreSQL
- React frontend with CSS modules
- Existing auth system using JWT
- User model already exists in `src/models/User.js`

**Key Dependencies:**
- `pg` (PostgreSQL client) - already installed
- `node-postgres-migrate` for migrations - already installed
- React Context API for theme state - already in use

**Constraints:**
- Must work for both authenticated and unauthenticated users
- Unauthenticated users: theme stored in localStorage
- Authenticated users: synced to database
- Must respect system preference if user selects "auto"

## Approach

Implement theme system in three layers:
1. Database layer: Store preferences for authenticated users
2. API layer: CRUD endpoints for preferences
3. Frontend layer: Theme context, UI controls, persistence

Follow existing patterns for similar features (notification preferences implemented in PR #234).

**Why this approach:**
- Leverages existing auth system
- Gracefully handles both user types
- Respects system preferences
- Minimal new dependencies

## Milestones

### Milestone 1: Database Schema & Migration

**Goal:** Create user_preferences table in database

**Implementation:**
- Create migration file: `migrations/2025-01-07-add-user-preferences.js`
- Table schema:
  - `id` (UUID, primary key, generate with uuid_generate_v4())
  - `user_id` (UUID, foreign key to users.id, ON DELETE CASCADE)
  - `theme` (VARCHAR(20), CHECK constraint: 'light', 'dark', 'auto')
  - `created_at` (TIMESTAMP, default CURRENT_TIMESTAMP)
  - `updated_at` (TIMESTAMP, default CURRENT_TIMESTAMP)
- Add unique constraint on user_id (one preference per user)
- Add index on user_id for query performance
- Create update trigger for updated_at timestamp
- Follow migration pattern from `migrations/2024-11-15-add-sessions.js`

**Verification:**
- [ ] Run migration: `npm run migrate`
- [ ] Table created with correct columns and types
- [ ] Can insert test record: INSERT INTO user_preferences VALUES (...)
- [ ] Unique constraint prevents duplicate user_id
- [ ] Foreign key cascades on user deletion
- [ ] Rollback works: `npm run migrate:rollback`

**Files Affected:**
- `migrations/2025-01-07-add-user-preferences.js` - New migration

**Estimated Effort:** 20 minutes

**Dependencies:** None

---

### Milestone 2: Create UserPreferences Model

**Goal:** Create Sequelize model for user_preferences table

**Implementation:**
- Create `src/models/UserPreferences.js`
- Define model with fields matching database schema
- Add validation: theme must be one of ['light', 'dark', 'auto']
- Define association: `User.hasOne(UserPreferences)`
- Add instance methods:
  - `async updateTheme(theme)` - Update and save theme
- Add static methods:
  - `async findByUserId(userId)` - Find preferences for user
  - `async createDefault(userId)` - Create with theme='auto'
- Follow model pattern from `src/models/Session.js`

**Verification:**
- [ ] Can create new preference: `UserPreferences.create({...})`
- [ ] Can query by user_id: `UserPreferences.findByUserId(userId)`
- [ ] Validation rejects invalid theme values
- [ ] Association works: `user.getUserPreferences()`
- [ ] Unit tests pass: `npm test src/models/UserPreferences.test.js`

**Files Affected:**
- `src/models/UserPreferences.js` - New model file
- `src/models/User.js` - Add hasOne association
- `src/models/index.js` - Register new model

**Estimated Effort:** 25 minutes

**Dependencies:** Milestone 1 (needs database table)

---

### Milestone 3: Implement Preferences API Endpoints

**Goal:** Create REST endpoints for reading and updating preferences

**Implementation:**
- Create `src/routes/preferences.js`
- Implement endpoints:
  - `GET /api/preferences` - Get current user's preferences
    - Requires authentication middleware
    - Return 200 with preferences JSON
    - Create default preferences if none exist
  - `PUT /api/preferences` - Update preferences
    - Requires authentication middleware
    - Validate request body: `{ theme: 'light' | 'dark' | 'auto' }`
    - Update or create preferences
    - Return 200 with updated preferences
- Use existing `authMiddleware` from `src/middleware/auth.js`
- Use `asyncHandler` wrapper for error handling
- Follow REST conventions from `src/routes/users.js`
- Add route to Express app in `src/app.js`

**Verification:**
- [ ] GET /api/preferences returns 200 with preferences
- [ ] GET /api/preferences returns 401 if not authenticated
- [ ] GET /api/preferences creates default if none exist
- [ ] PUT /api/preferences updates theme successfully
- [ ] PUT /api/preferences validates theme value (rejects 'invalid')
- [ ] PUT /api/preferences returns 401 if not authenticated
- [ ] Integration tests pass: `npm test src/routes/preferences.test.js`

**Files Affected:**
- `src/routes/preferences.js` - New routes file
- `src/app.js` - Register /api/preferences routes

**Estimated Effort:** 35 minutes

**Dependencies:** Milestone 2 (needs model)

---

### Milestone 4: Create Theme Context & Provider

**Goal:** Implement React context for theme state management

**Implementation:**
- Create `src/contexts/ThemeContext.tsx`
- Create context with:
  - `theme: 'light' | 'dark' | 'auto'`
  - `effectiveTheme: 'light' | 'dark'` (resolves 'auto')
  - `setTheme: (theme) => void`
  - `isLoading: boolean`
- Create `ThemeProvider` component:
  - On mount, load theme from:
    1. If authenticated: fetch from API
    2. If not authenticated: read from localStorage
    3. Default to 'auto'
  - Listen for system theme changes using `matchMedia`
  - Calculate effective theme (resolve 'auto' to system preference)
  - Persist changes:
    - If authenticated: PUT to API
    - If not authenticated: save to localStorage
  - Apply theme by setting `data-theme` attribute on `<html>`
- Follow context pattern from `src/contexts/AuthContext.tsx`

**Verification:**
- [ ] Theme loads from API for authenticated users
- [ ] Theme loads from localStorage for guests
- [ ] 'auto' theme matches system preference
- [ ] System preference changes update theme in real-time
- [ ] setTheme persists to API/localStorage
- [ ] HTML attribute updates on theme change
- [ ] Component tests pass: `npm test ThemeContext.test.tsx`

**Files Affected:**
- `src/contexts/ThemeContext.tsx` - New context file
- `src/App.tsx` - Wrap with ThemeProvider

**Estimated Effort:** 40 minutes

**Dependencies:** Milestone 3 (needs API endpoints)

---

### Milestone 5: Create Theme Selector UI Component

**Goal:** Build UI control for users to select theme preference

**Implementation:**
- Create `src/components/ThemeSelector/ThemeSelector.tsx`
- Render segmented control with 3 options:
  - Light (sun icon)
  - Auto (circle-half icon)
  - Dark (moon icon)
- Use `useTheme()` hook from ThemeContext
- Highlight currently selected theme
- Call `setTheme()` on selection
- Add to user settings page: `src/pages/Settings.tsx`
- Use icons from existing icon library (react-icons)
- Follow component structure from `src/components/NotificationToggle/`
- Match design system styles from Figma

**Verification:**
- [ ] Component renders with correct initial selection
- [ ] Clicking option calls setTheme with correct value
- [ ] Visual feedback on selection (highlight)
- [ ] Icons display correctly
- [ ] Works on mobile (touch targets large enough)
- [ ] Accessible (keyboard navigation, aria labels)
- [ ] Component tests pass: `npm test ThemeSelector.test.tsx`
- [ ] Visual regression test passes: `npm run test:visual`

**Files Affected:**
- `src/components/ThemeSelector/ThemeSelector.tsx` - New component
- `src/components/ThemeSelector/ThemeSelector.module.css` - New styles
- `src/pages/Settings.tsx` - Add ThemeSelector component

**Estimated Effort:** 35 minutes

**Dependencies:** Milestone 4 (needs context)

## Progress

- [ ] Milestone 1: Database Schema & Migration
- [ ] Milestone 2: Create UserPreferences Model
- [ ] Milestone 3: Implement Preferences API Endpoints
- [ ] Milestone 4: Create Theme Context & Provider
- [ ] Milestone 5: Create Theme Selector UI Component

## Decision Log

### Decision 1: Store Preferences for Unauthenticated Users

**Context:** Should guests be able to change theme?

**Options Considered:**
1. **Only authenticated users** - Simplest implementation
2. **localStorage for guests** - Works but doesn't sync across devices
3. **Cookie for guests** - Can sync to backend later

**Decision:** Use localStorage for guests

**Rationale:**
- Better user experience (guests can customize)
- Simple to implement
- Can migrate guest preference to DB on signup
- Matches how we handle other guest preferences (language)

### Decision 2: Theme Values

**Context:** What theme options to support?

**Options Considered:**
1. **Only light/dark** - Simplest
2. **light/dark/auto** - Respects system
3. **Multiple color schemes** - Over-engineered

**Decision:** light/dark/auto

**Rationale:**
- 'auto' is increasingly expected UX
- Low implementation cost
- Future-proof (can add more themes later)

## Risks & Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| LocalStorage blocked (private browsing) | Medium | Low | Fall back to in-memory state, show notice |
| Theme flicker on page load | Low | Medium | Inline critical CSS in <head>, set initial theme from cookie |
| System theme detection unsupported | Low | Low | Gracefully fall back to light theme |
| API call fails for authenticated users | Medium | Low | Fall back to localStorage, retry on reconnect |

## Surprises & Discoveries

- Existing CSS already uses CSS variables for colors
- System theme listener works on matchMedia('(prefers-color-scheme: dark)')
- User table already has cascade delete configured
- Settings page already exists, just needs new component

## Next Steps

After approval:
1. Start with Milestone 1 (database migration)
2. Test each milestone before proceeding
3. Request design review after Milestone 5
4. Deploy to staging for QA testing
5. Monitor error rates after production deploy

## Estimated Total Effort

**Total:** ~2.5 hours
- Database (M1): 20 min
- Model (M2): 25 min
- API (M3): 35 min
- Context (M4): 40 min
- UI (M5): 35 min
- Buffer for testing/debugging: +30 min
```

## Tips for Writing Your Own Plans

1. **Be Specific:** Use exact file paths, function names, variable names
2. **Show Your Work:** Explain why you chose an approach
3. **Think Testing:** Include verification steps for every milestone
4. **Identify Dependencies:** Make sequencing clear
5. **Estimate Honestly:** Better to over-estimate
6. **Document Decisions:** Future you will thank you
7. **Note Surprises:** They inform future planning
8. **Check Completeness:** Did you forget error handling? Testing? Documentation?

## Common Mistakes to Avoid

❌ Vague implementation steps
❌ Missing file paths
❌ No verification criteria
❌ Skipping error handling
❌ Forgetting to update tests
❌ Not considering edge cases
❌ Unrealistic time estimates
❌ Missing dependencies between milestones

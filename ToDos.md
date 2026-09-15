# MERN Social Network - To-Do List

## Priority 1: Verify Core Functionality

- [x] Test user signup/login flow end-to-end
  - [x] Verify token storage and retrieval
  - [x] Test logout functionality
  - [x] Check session persistence
- [x] Test creating/viewing thoughts
  - [x] Verify thoughts display on Home page
  - [x] Test thought creation form
  - [x] Ensure reactions work correctly
- [x] Test following/unfollowing users
  - [x] Verify followers list updates
  - [x] Test unfollow functionality
- [ ] Test profile updates
  - [ ] Verify user can update their profile
  - [ ] Check profile data reflects changes

## Priority 2: Review API Layer

- [ ] Audit client/src/utils/API.js
  - [ ] Verify all endpoints are implemented
  - [ ] Check request/response handling
  - [ ] Add error handling for failed requests
- [ ] Test all server endpoints
  - [ ] User routes (GET, POST, PUT, DELETE)
  - [ ] Thought routes (GET, POST, PUT, DELETE)
  - [ ] Verify authentication middleware is working

## Priority 3: Search Functionality

- [ ] Implement user search
  - [ ] Add search input to navbar
  - [ ] Create search endpoint on server
  - [ ] Display search results
- [ ] Implement thought search
  - [ ] Add search filter for thoughts
  - [ ] Create search endpoint for thoughts
  - [ ] Display matching thoughts

## Priority 4: Styling Polish

- [ ] Review overall design consistency
- [ ] Improve responsive design for mobile
- [ ] Add loading states and spinners
- [ ] Enhance form styling and validation feedback
- [ ] Improve navigation/user flow
- [ ] Add hover effects and transitions
- [ ] Test accessibility (contrast, keyboard navigation)

# ToDos

A compact, prioritized list of suggested improvements for the project. Pick one to implement next.

## Top Suggestions

- **Auth redirect:** Redirect unauthenticated users away from the profile page to the login page so only logged-in users can access it. Edit: [client/src/pages/Profile.js](client/src/pages/Profile.js)
- **Delete thought:** Add a Delete button for each thought and call `DELETE /api/thoughts/:id`; refresh the list after success. Edit: [client/src/pages/Profile.js](client/src/pages/Profile.js), server routes
- **Move fetches to API util:** Move direct `fetch()` calls into [client/src/utils/API.js](client/src/utils/API.js) (createThought, getThoughts, deleteThought, updateThought) for reuse and testability. Edit: [client/src/utils/API.js](client/src/utils/API.js), [client/src/pages/Profile.js](client/src/pages/Profile.js)
- **Edit thought:** Allow inline editing of thoughts and call `PUT /api/thoughts/:id`; update UI optimistically. Edit: [client/src/pages/Profile.js](client/src/pages/Profile.js), server routes
- **Friendly timestamps:** Format `createdAt` using `Intl.DateTimeFormat` or `date-fns` for human-friendly dates. Edit: [client/src/pages/Profile.js](client/src/pages/Profile.js)

## Medium Priority

- **Loading & error states:** Add `isLoading` and `error` states; show skeletons or alerts while fetching. Edit: [client/src/pages/Profile.js](client/src/pages/Profile.js)
- **Optimistic create:** Add newly created thoughts to local state immediately and rollback on failure for snappier UX. Edit: [client/src/pages/Profile.js](client/src/pages/Profile.js)
- **Client validation & toasts:** Validate `thoughtText` length and show success/error toasts (e.g., `react-toastify`). Edit: [client/src/pages/Profile.js](client/src/pages/Profile.js)

## Lower Priority / Later

- **Profile details & avatar:** Surface more user details (bio, joined date) and enable avatar upload (store URL on the User model). Edit: [client/src/pages/Profile.js](client/src/pages/Profile.js), server models/routes
- **Reactions / likes:** Add reaction/like button using the `Reaction` model and show counts without full refresh. Edit: client & server
- **Real-time updates:** Integrate Socket.IO to broadcast new thoughts/reactions so other users see changes live. Edit: client & server
- **Tests:** Add React Testing Library tests for `Profile.js` covering render, fetch, create, and delete flows. Add: `client/src/pages/__tests__/Profile.test.js`

## Recommended next steps

1. Implement **Auth redirect** or **Delete thought** first (small, high impact).
2. Move shared fetch logic into `client/src/utils/API.js` to simplify future changes.
3. Add loading/error states and friendly timestamps for polish.

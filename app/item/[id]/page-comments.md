# Add Load More Comments Feature to Hacker News Client

## Current Behavior

- Post page fetches all comments immediately
- Each comment is fetched via individual API calls
- UI already displays comments and nested subcomments in a tree structure
- No pagination or lazy loading exists

## Required Changes

### 1. Comment Loading Logic

- **Initial load**: Fetch only the first 10 top-level comments
- **Load more**: Add "Load More Comments" button at bottom if more comments exist
- **Nested replies**: For each comment with replies, initially fetch only the first reply
- **Nested load more**: Add "Load More Replies" button for comments with additional replies
- **Deep nesting**: Support multiple levels of nesting with load-more functionality at each level

### 2. State Management Requirements

- Track which comments have been loaded
- Track which replies have been loaded for each comment level
- Handle loading states for each load-more button independently
- Maintain comment tree structure while supporting partial loading

### 3. UI Requirements

- "Load More Comments" button at the end of the comment list
- "Load More Replies" button for each comment thread with additional replies
- Show loading state on buttons when fetching
- Hide buttons when no more items to load
- Preserve existing comment/reply styling and layout

### 4. Technical Specifications

- Use existing Hacker News API structure
- Maintain current comment component hierarchy
- Add minimal new components/hooks as needed
- Ensure buttons are accessible (proper ARIA labels, keyboard navigation)
- Handle error states gracefully

## Files to Modify

Please analyze the codebase and identify:

- Comment-related components
- API calling logic for comments
- State management approach currently used
- Post page component

## Implementation Requirements

1. **Preserve existing functionality** - don't break current comment display
2. **Incremental enhancement** - add load-more without major refactoring
3. **Performance focused** - reduce initial API calls significantly
4. **User experience** - smooth loading without layout shifts
5. **Error handling** - graceful fallbacks if API calls fail

## Acceptance Criteria

- [ ] Initial page load fetches only 10 top-level comments
- [ ] "Load More Comments" button appears when more comments exist
- [ ] Clicking loads next batch of comments and updates button state
- [ ] Each comment with replies shows only first reply initially
- [ ] "Load More Replies" buttons work at all nesting levels
- [ ] Loading states prevent double-clicks and show progress
- [ ] No breaking changes to existing comment display
- [ ] Significant reduction in initial API calls

Please implement this feature by modifying the existing code structure rather than rewriting major components.

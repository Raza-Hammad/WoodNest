# WoodNest QA Scope

This PR is for comprehensive runtime QA of the existing WoodNest application.

No application behavior is intentionally changed.

Please test:

- Homepage
- Global navigation
- Products
- Search
- Category filtering
- Price filtering
- Material filtering
- Colour filtering
- Availability filtering
- Sorting
- Product details
- Product variants
- Wishlist
- Wishlist persistence
- Rooms
- Room hotspots
- Inquiry form
- Inquiry validation
- 3D viewer
- AR/fallback behavior where supported
- Responsive/mobile behavior
- Loading states
- Error states
- Empty states
- Important CTAs
- Accessibility-related interactions

Use only fake test data.

Do not send real communications.

For every failure provide:
- expected behavior
- actual behavior
- reproduction steps
- screenshot
- video where available
- suspected source code
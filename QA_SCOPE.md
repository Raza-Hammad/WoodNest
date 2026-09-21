# WoodNest — Comprehensive ItoQA Regression Scope

This document exists only to define the runtime QA scope for the dedicated ItoQA regression PR.

No application functionality is intentionally changed by this QA PR.

## Primary objective

Perform a broad runtime regression/smoke sweep of the existing WoodNest application.

Do not assume that the absence of a source-code finding means the user flow works. Validate the running application behavior.

## Application areas to test

### 1. Global application

* Application starts successfully.
* Homepage loads without blocking runtime errors.
* Header navigation works.
* Footer navigation works.
* Mobile navigation works.
* Page transitions do not prevent navigation.
* Responsive layout works at desktop and mobile widths.

### 2. Homepage

* Hero section renders.
* Hero calls-to-action work.
* Category navigation works.
* Bestseller/product links work.
* 3D spotlight section behaves correctly.
* Room showcase links work.
* Testimonials render.
* Final CTA works.
* Scrolling through the complete page does not produce obvious runtime errors.

### 3. Product catalogue

Navigate to `/products`.

Test:

* Catalogue loads.
* Products are displayed.
* Search works.
* Category filtering works.
* Price filtering works.
* Material filtering works.
* Colour filtering works.
* Availability filtering works.
* Sorting works for every available sort option.
* Multiple filters work together.
* Filter chips reflect active filters.
* Removing filters updates results.
* Empty-state behavior works when no results match.
* Product links open the correct product.

### 4. Product detail pages

For multiple representative products:

* Product page loads.
* Product image/gallery works.
* Product information displays correctly.
* Variant controls work where available.
* Price updates correctly when a variant changes.
* Wishlist control works.
* Inquiry action opens the inquiry interface.
* Navigation back to catalogue works.

### 5. Wishlist

Test:

* Add a product to wishlist.
* Wishlist count updates.
* Wishlist drawer/state updates.
* Product appears in wishlist.
* Remove product from wishlist.
* Count updates correctly.
* Add multiple products.
* Remove individual products.
* Refresh the browser.
* Verify persisted wishlist behavior.
* Verify clearing/removing wishlist state works where the UI exposes it.

### 6. 3D product viewer

For products with 3D models:

* Product loads.
* 3D viewer initializes.
* Loading state behaves correctly.
* Viewer can be interacted with where supported.
* Zoom/rotation controls work where available.
* Reset behavior works where available.
* Model failure fallback works if the environment allows the failure path to be tested.

For products without a model:

* Photo/gallery fallback is shown.

### 7. AR / QR behavior

Test the desktop-compatible behavior where possible.

* "View in your room" control is available where intended.
* Desktop fallback/QR behavior works where supported.
* Do not treat device-specific AR limitations as application defects unless the expected behavior is actually violated.

### 8. Room scenes

Navigate to `/rooms`.

Test:

* Room page loads.
* Scene renders.
* Hotspot markers appear in appropriate locations.
* Clicking hotspots opens the intended product.
* Navigating from the room to a product works.

### 9. Inquiry flow

Test the inquiry interface.

Valid scenario:

* Open inquiry form.
* Enter name.
* Enter phone.
* Optionally enter email.
* Enter message.
* Submit.
* Verify the appropriate success state is shown.

Validation scenarios:

* Missing name.
* Missing phone.
* Invalid or malformed email where client-side validation applies.
* Empty message behavior.
* Verify useful error state appears for rejected submissions.

API behavior:

* Verify successful submission receives the expected success response where the environment supports it.
* Verify invalid request data is rejected appropriately.

Do not claim that an email or CRM message was delivered because the current WoodNest implementation logs inquiry submissions rather than sending them externally.

### 10. WhatsApp

* WhatsApp contact control is visible where intended.
* Link/action opens the configured destination.

### 11. Accessibility and interaction quality

Where supported:

* Buttons are clickable.
* Links navigate correctly.
* Interactive controls are keyboard accessible.
* Form controls have meaningful labels.
* No obvious interaction is blocked by overlays or drawers.
* Reduced-motion behavior is respected where practical.

### 12. Responsive regression

Test representative pages at:

* Desktop viewport.
* Narrow/mobile viewport.

Prioritize:

* Header/navigation.
* Product catalogue.
* Filters.
* Product cards.
* Product detail.
* Wishlist.
* Inquiry interface.
* Room scenes.

## Reporting requirements

For every discovered problem, report:

1. Flow/feature.
2. Expected behavior.
3. Actual behavior.
4. Reproduction steps.
5. Severity.
6. Whether the issue is attributable to this QA PR or pre-existing.
7. Relevant source code.
8. Screenshot/evidence.
9. Video/evidence when available.

## Important classification

This PR intentionally contains no functional regression and no intentional application bug.

The goal is broad runtime regression testing of the existing WoodNest baseline.

Do not modify application code as part of this QA run.

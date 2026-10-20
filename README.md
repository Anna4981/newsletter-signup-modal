Newsletter Signup Modal

Veda Technology Internship – Web Development Track Task 20 · Level 1 · Day 20 of 45

A popup modal with an email signup form that appears after a short delay and can be dismissed. Built to practise modals, timers and basic form validation.

Features
Modal appears automatically after 5 seconds (setTimeout)
Email input with validation:
shows an error if the field is empty
shows an error if the format is invalid
shows a success message for a valid email
Three ways to dismiss: close (✕) button, click on the overlay, or press Esc
Does not reappear after being closed or after a successful signup (saved with localStorage)
Accessible: role="dialog", aria-modal, labelled title and description, focus moves into the modal and returns when it closes, Tab is trapped inside, errors announced with aria-live
Responsive layout and reduced-motion support
"Reset (for testing)" button on the page to bring the modal back
Tools Used
HTML5
CSS3
JavaScript (vanilla)
Project Structure
newsletter-signup-modal/
├── index.html
├── style.css
├── script.js
└── README.md
How to Run
Download or clone this repository.
Open index.html in any browser.
Wait 5 seconds for the modal to appear.

To test again after closing it, click Reset (for testing) on the page.

How It Works
Requirement	Approach
Appear after a delay	setTimeout(openModal, 5000)
Validate email format	Regex /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ after trim()
Dismiss the modal	Close button, overlay click (e.target === overlay), Esc key
Prevent reappearing	localStorage flag checked before the timer starts
Accessibility	ARIA dialog attributes, focus management and focus trap

You can change the delay by editing DELAY_MS at the top of script.js.

Interview Questions

How would you validate an email format? Trim the input, then test it against a regular expression such as name@domain.tld. A regex only checks the format, so real validation also needs a server-side check or a confirmation email.

How would you prevent a modal from repeatedly appearing? Save a flag in localStorage (permanent) or sessionStorage (current tab only) when the modal is closed, and check that flag before opening it.

What accessibility considerations apply to modals? Use role="dialog" and aria-modal="true", label the dialog, move focus into it when it opens and back to the previous element when it closes, trap Tab inside it, allow Esc to close it, and announce form errors to screen readers.

Author

Anna Makgabo Thantsha Web Development Intern, Veda Technology# newsletter-signup-modal

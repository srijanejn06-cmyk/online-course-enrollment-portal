# Online Course Enrollment Portal

## Experiment Title
Experiment 2: Develop a Website with Client-Side Form Validation

## Objective
Create a realistic online course enrollment portal that checks student and course details in the browser before displaying an enrollment confirmation.

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript

## Features Implemented
- LearnHub-branded enrollment page with responsive, mobile-friendly layout
- Personal information, course information, account/contact, and confirmation sections
- Course, education, and preferred learning time dropdowns
- Radio-button selection for online live classes or self-paced learning
- Inline validation errors, accessible labels, and clear valid/invalid styles
- Successful enrollment confirmation with student name, selected course, and learning mode
- Clear Form action that resets values, validation feedback, and confirmation
- No backend, database, external framework, or password storage

## Validation Rules
- Full name is required and accepts valid letter-based names, including common spaces, apostrophes, and hyphens.
- Email is required and must match a valid email format.
- Phone is required and must contain exactly 10 digits.
- Date of birth is required, must be valid, and cannot be in the future.
- Gender, course, learning mode, education, and preferred learning time must each have a selection.
- Password must be at least 8 characters and contain uppercase and lowercase letters and a number.
- Confirm password is required and must exactly match the password.
- Address is required and cannot consist only of whitespace.
- PIN code must contain exactly 6 digits.
- Terms and Conditions must be accepted.

## How to Run
Open `index.html` in a modern browser. Alternatively, run a simple local server from the project folder:

```text
python -m http.server 8000
```

Then open `http://localhost:8000`.

## How Client-Side Validation Works
The JavaScript attaches blur, input, change, and submit event listeners to the form. Each validator checks its field and displays feedback near that input. The submit handler calls `preventDefault()` so invalid data is never submitted; valid data is used only to display an in-page confirmation. No form data is transmitted or stored.

## Project Structure

```text
index.html
css/
  style.css
js/
  validation.js
README.md
```

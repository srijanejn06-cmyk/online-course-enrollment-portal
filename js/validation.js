document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('enrollmentForm');
  const successMessage = document.querySelector('#successMessage');
  const enrollmentSummary = document.getElementById('enrollmentSummary');
  const learningModeGroup = document.getElementById('learningModeGroup');
  const termsInput = document.getElementById('terms');

  const fields = {
    fullName: { input: document.getElementById('fullName'), error: document.getElementById('fullNameError') },
    email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
    phoneNumber: { input: document.getElementById('phoneNumber'), error: document.getElementById('phoneNumberError') },
    dob: { input: document.getElementById('dob'), error: document.getElementById('dobError') },
    gender: { input: document.getElementById('gender'), error: document.getElementById('genderError') },
    course: { input: document.getElementById('course'), error: document.getElementById('courseError') },
    education: { input: document.getElementById('education'), error: document.getElementById('educationError') },
    preferredTime: { input: document.getElementById('preferredTime'), error: document.getElementById('preferredTimeError') },
    password: { input: document.getElementById('password'), error: document.getElementById('passwordError') },
    confirmPassword: { input: document.getElementById('confirmPassword'), error: document.getElementById('confirmPasswordError') },
    address: { input: document.getElementById('address'), error: document.getElementById('addressError') },
    pinCode: { input: document.getElementById('pinCode'), error: document.getElementById('pinCodeError') },
    terms: { input: termsInput, error: document.getElementById('termsError'), checkbox: true },
  };

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const phonePattern = /^\d{10}$/;
  const pinPattern = /^\d{6}$/;
  let submitted = false;

  function setFieldState(name, valid, message = '') {
    if (name === 'learningMode') {
      document.getElementById('learningModeError').textContent = message;
      learningModeGroup.classList.toggle('is-invalid', !valid);
      learningModeGroup.setAttribute('aria-invalid', String(!valid));
      return;
    }

    const field = fields[name];
    field.error.textContent = message;
    field.input.classList.remove('is-invalid', 'is-valid');
    field.input.setAttribute('aria-invalid', String(!valid));

    if (field.checkbox) {
      const wrapper = field.input.closest('.checkbox-wrap');
      wrapper.classList.remove('invalid-box', 'valid-box');
      wrapper.classList.add(valid ? 'valid-box' : 'invalid-box');
      return;
    }

    field.input.classList.add(valid ? 'is-valid' : 'is-invalid');
  }

  function clearFieldState(name) {
    const field = fields[name];
    field.error.textContent = '';
    field.input.classList.remove('is-invalid', 'is-valid');
    field.input.setAttribute('aria-invalid', 'false');

    if (field.checkbox) {
      field.input.closest('.checkbox-wrap').classList.remove('invalid-box', 'valid-box');
    }
  }

  function required(name, message) {
    const value = fields[name].input.value.trim();
    if (!value) {
      setFieldState(name, false, message);
      return false;
    }
    return true;
  }

  function validateFullName() {
    const value = fields.fullName.input.value.trim();
    if (!value) {
      setFieldState('fullName', false, 'Full name is required.');
      return false;
    }
    if (value.length < 2 || !/^[\p{L}]+(?:[ .'-][\p{L}]+)*$/u.test(value)) {
      setFieldState('fullName', false, 'Enter a valid name using letters, spaces, apostrophes, or hyphens.');
      return false;
    }
    setFieldState('fullName', true);
    return true;
  }

  function validateEmail() {
    const value = fields.email.input.value.trim();
    if (!value) {
      setFieldState('email', false, 'Email address is required.');
      return false;
    }
    if (!emailPattern.test(value)) {
      setFieldState('email', false, 'Enter a valid email address, such as name@example.com.');
      return false;
    }
    setFieldState('email', true);
    return true;
  }

  function validatePhone() {
    const value = fields.phoneNumber.input.value.trim();
    if (!value) {
      setFieldState('phoneNumber', false, 'Phone number is required.');
      return false;
    }
    if (!phonePattern.test(value)) {
      setFieldState('phoneNumber', false, 'Enter exactly 10 digits without spaces or other characters.');
      return false;
    }
    setFieldState('phoneNumber', true);
    return true;
  }

  function validateDob() {
    const value = fields.dob.input.value;
    if (!value) {
      setFieldState('dob', false, 'Date of birth is required.');
      return false;
    }
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) {
      setFieldState('dob', false, 'Select a valid date of birth.');
      return false;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) {
      setFieldState('dob', false, 'Date of birth cannot be in the future.');
      return false;
    }
    setFieldState('dob', true);
    return true;
  }

  function validateSelection(name, message) {
    if (!fields[name].input.value) {
      setFieldState(name, false, message);
      return false;
    }
    setFieldState(name, true);
    return true;
  }

  function validateLearningMode() {
    const selected = document.querySelector('input[name="learningMode"]:checked');
    if (!selected) {
      setFieldState('learningMode', false, 'Select a learning mode.');
      return false;
    }
    setFieldState('learningMode', true);
    return true;
  }

  function validatePassword() {
    const value = fields.password.input.value;
    if (!value) {
      setFieldState('password', false, 'Password is required.');
      return false;
    }
    if (value.length < 8 || !/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
      setFieldState('password', false, 'Use at least 8 characters with an uppercase letter, a lowercase letter, and a number.');
      return false;
    }
    setFieldState('password', true);
    return true;
  }

  function validateConfirmPassword() {
    const value = fields.confirmPassword.input.value;
    if (!value) {
      setFieldState('confirmPassword', false, 'Please confirm your password.');
      return false;
    }
    if (value !== fields.password.input.value) {
      setFieldState('confirmPassword', false, 'Passwords do not match.');
      return false;
    }
    setFieldState('confirmPassword', true);
    return true;
  }

  function validateAddress() {
    if (!required('address', 'Address is required.')) {
      return false;
    }
    setFieldState('address', true);
    return true;
  }

  function validatePinCode() {
    const value = fields.pinCode.input.value.trim();
    if (!value) {
      setFieldState('pinCode', false, 'PIN code is required.');
      return false;
    }
    if (!pinPattern.test(value)) {
      setFieldState('pinCode', false, 'PIN code must contain exactly 6 digits.');
      return false;
    }
    setFieldState('pinCode', true);
    return true;
  }

  function validateTerms() {
    if (!termsInput.checked) {
      setFieldState('terms', false, 'Accept the Terms and Conditions to enroll.');
      return false;
    }
    setFieldState('terms', true);
    return true;
  }

  const validators = {
    fullName: validateFullName,
    email: validateEmail,
    phoneNumber: validatePhone,
    dob: validateDob,
    gender: () => validateSelection('gender', 'Please select your gender.'),
    course: () => validateSelection('course', 'Please select a course.'),
    learningMode: validateLearningMode,
    education: () => validateSelection('education', 'Please select your education or qualification.'),
    preferredTime: () => validateSelection('preferredTime', 'Please select your preferred learning time.'),
    password: validatePassword,
    confirmPassword: validateConfirmPassword,
    address: validateAddress,
    pinCode: validatePinCode,
    terms: validateTerms,
  };

  function validateAllFields() {
    // Run every validator so the student sees all corrections needed at once.
    return Object.values(validators).map((validate) => validate()).every(Boolean);
  }

  function addSummaryItem(label, value) {
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    enrollmentSummary.append(term, description);
  }

  function showSuccessMessage() {
    enrollmentSummary.replaceChildren();
    addSummaryItem('Student Name', fields.fullName.input.value.trim());
    addSummaryItem('Selected Course', fields.course.input.value);
    addSummaryItem('Learning Mode', document.querySelector('input[name="learningMode"]:checked').value);
    successMessage.hidden = false;
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideSuccessMessage() {
    successMessage.hidden = true;
    enrollmentSummary.replaceChildren();
  }

  function resetValidation() {
    Object.keys(fields).forEach(clearFieldState);
    learningModeGroup.classList.remove('is-invalid');
    learningModeGroup.removeAttribute('aria-invalid');
    submitted = false;
    hideSuccessMessage();
  }

  // Validate after a field is used, then update its feedback as the user corrects it.
  Object.entries(fields).forEach(([name, field]) => {
    const eventTarget = field.input;
    const validateOnEdit = () => {
      hideSuccessMessage();
      if (submitted || eventTarget.classList.contains('is-invalid') || eventTarget.classList.contains('is-valid')) {
        validators[name]();
        if (name === 'password' && fields.confirmPassword.input.value) {
          validateConfirmPassword();
        }
      }
    };
    eventTarget.addEventListener('blur', () => validators[name]());
    eventTarget.addEventListener('input', validateOnEdit);
    eventTarget.addEventListener('change', validateOnEdit);
  });

  document.querySelectorAll('input[name="learningMode"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      hideSuccessMessage();
      validateLearningMode();
    });
    radio.addEventListener('blur', () => {
      if (submitted) {
        validateLearningMode();
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitted = true;
    hideSuccessMessage();
    if (!validateAllFields()) {
      const firstInvalid = form.querySelector('.is-invalid, .choice-group[aria-invalid="true"]');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    showSuccessMessage();
  });

  form.addEventListener('reset', () => {
    window.setTimeout(resetValidation, 0);
  });
});

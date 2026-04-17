/**
 * Email validation regex - RFC 5322 simplified for practical use
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates email format
 */
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

/**
 * Validates password strength
 * Requirements:
 * - At least 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Must be at least 8 characters');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Must contain an uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Must contain a lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Must contain a number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates password confirmation
 */
export const validatePasswordConfirm = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

/**
 * Get friendly error message from Clerk error
 */
export const getClerkErrorMessage = (error: any): string => {
  if (!error) return 'An unexpected error occurred';

  // Handle Clerk specific errors
  if (error.errors && error.errors.length > 0) {
    const firstError = error.errors[0];
    if (firstError.message) {
      return firstError.message;
    }
  }

  // Handle standard error messages
  if (error.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
};

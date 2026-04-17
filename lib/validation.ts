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
type ClerkLikeError = {
  errors?: Array<{ message?: string }>;
  message?: string;
};

export const getClerkErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred';

  // Handle Clerk specific errors
  if (typeof error === 'string') {
    return error;
  }

  // Handle standard error messages
  const maybeError = error as ClerkLikeError;
  if (Array.isArray(maybeError.errors) && maybeError.errors.length > 0) {
    const firstError = maybeError.errors[0];
    if (firstError?.message) return firstError.message;
  }

  if (typeof maybeError.message === 'string' && maybeError.message.length > 0) {
    return maybeError.message;
  }

  return 'An unexpected error occurred';
};

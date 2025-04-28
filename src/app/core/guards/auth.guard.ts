import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Placeholder for authentication logic
  const isAuthenticated = true; // Replace with actual auth check (e.g., token validation)
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    // You can inject Router and redirect here if needed
    return false;
  }
  return true;
};
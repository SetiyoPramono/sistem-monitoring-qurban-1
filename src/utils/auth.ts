
// Check if the user is authenticated
export const isAuthenticated = (): boolean => {
  try {
    const sessionData = localStorage.getItem("adminSession");
    if (!sessionData) return false;
    
    const session = JSON.parse(sessionData);
    const currentTime = new Date().getTime();
    
    // Check if session is still valid
    if (session.isAuthenticated && session.expiresAt > currentTime) {
      return true;
    }
    
    // If session expired, clear it
    localStorage.removeItem("adminSession");
    return false;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem("adminSession");
};

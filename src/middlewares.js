import { authError, logout } from "./actions";

export function authMiddleware(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Gérer les erreurs 401 (non autorisé)
      if (action.type !== "CORE_AUTH_ERR" && action.payload?.name === "ApiError" && action.payload.status === 401) {
        return store.dispatch(authError(action.payload));
      }
      
      // Gérer les erreurs CSRF (token manquant ou incorrect)
      if (action.type !== "CORE_AUTH_ERR" && 
          action.payload?.name === "ApiError" && 
          (action.payload.status === 403 || 
           action.payload.message?.includes("CSRF token missing or incorrect") ||
           action.payload.message?.includes("CSRF token") ||
           action.payload.detail?.includes("CSRF token"))) {
        
        // Nettoyer les tokens et rediriger vers login
        localStorage.removeItem('csrfToken');
        store.dispatch(logout());
        
        // Rediriger vers la page de login
        const basename = process.env.PUBLIC_URL || '/front';
        window.location.href = `${basename}/login`;
        
        return store.dispatch(authError({ 
          message: "Session expirée. Veuillez vous reconnecter.",
          status: 403 
        }));
      }
      
      return next(action);
    };
  };
}

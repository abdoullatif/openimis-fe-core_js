import { authError, logout } from "./actions";

export function authMiddleware(store) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Gérer les erreurs 401 (non autorisé)
      if (action.type !== "CORE_AUTH_ERR" && action.payload?.name === "ApiError" && action.payload.status === 401) {
        return store.dispatch(authError(action.payload));
      }
      
      // Gérer les erreurs 403 (forbidden) 
      if (action.type !== "CORE_AUTH_ERR" && action.payload?.name === "ApiError" && action.payload.status === 403) {
        return store.dispatch(authError(action.payload));
      }
      
      return next(action);
    };
  };
}

export const TOKEN_TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
  SESSION_MANAGEMENT: "session_management",
} as const;

export const AUTH_STRATEGY_NAMES = {
  JWT_ACCESS: "jwt-access",
  JWT_REFRESH: "jwt-refresh",
  JWT_SESSION_MANAGEMENT: "jwt-session-management",
};

export const PASSWORD_MIN_LENGTH = 6;

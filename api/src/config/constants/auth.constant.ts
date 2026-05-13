export const AUTH_COOKIE_NAMES = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
} as const;

export const TOKEN_TYPES = {
  ACCESS: "access",
  REFRESH: "refresh",
} as const;

export const AUTH_STRATEGY_NAMES = {
  JWT_ACCESS: "jwt-access",
  JWT_REFRESH: "jwt-refresh",
};

export const PASSWORD_MIN_LENGTH = 6;

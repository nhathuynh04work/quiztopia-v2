export function buildAuthHeader(token: string) {
  return { Authorization: `Bearer ${token}` };
}

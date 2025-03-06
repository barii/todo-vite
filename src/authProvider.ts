const key = "authentication";

export function getAuthState(): boolean {
  const val = localStorage.getItem(key);
  return !!val;
}

export function getAuthToken(): string | null {
   return localStorage.getItem(key);
}

export function persistAuthState(token: string) {
  return localStorage.setItem(key, token);
}

export function unpersistAuthState() {
  return localStorage.removeItem(key);
}

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

const getApiBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_BASE_URL;
  if (!envUrl) return "http://127.0.0.1:8010";
  // Remove trailing slash if present
  return envUrl.replace(/\/$/, "");
};

const API_BASE_URL = getApiBaseUrl();

export async function apiRequest(
  path: string,
  options: RequestInit = {}
) {
  const token = getAccessToken();
  
  // Ensure path starts with a slash
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  
  const response = await fetch(`${API_BASE_URL}${formattedPath}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "API request failed");
  }
  return data;
}

export async function apiFormRequest(
  path: string,
  formData: FormData,
  options: RequestInit = {}
) {
  const token = getAccessToken();
  const formattedPath = path.startsWith("/") ? path : `/${path}`;
  
  const response = await fetch(`${API_BASE_URL}${formattedPath}`, {
    ...options,
    method: options.method || "POST",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
    body: formData,
  });
  
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "API request failed");
  }
  return data;
}

// utils/getImageUrl.ts
export const getImageUrl = (path?: string | null): string => {
  if (!path) return "/placeholder.svg";

  // If it's already an absolute URL, return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const cleanApiUrl = apiUrl.replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${cleanApiUrl}${cleanPath}`;
};

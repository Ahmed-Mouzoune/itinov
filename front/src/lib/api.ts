import { cookies } from "next/headers";

export const configCookie = {
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
};

export function getStrapiUrl(path = '') {
    return `${process.env.STRAPI_APP_URL || 'http://localhost:1337'}${path}`
}

export function getAuthToken() {
  const authToken = cookies().get("jwt")?.value;
  return authToken;
}
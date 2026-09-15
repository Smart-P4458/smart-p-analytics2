import type { HandlerEvent } from "@netlify/functions";

import { supabase } from "./_supabase";

const ADMIN_EMAIL = "sanismartp1@gmail.com";

export type AdminAuthResult =
  | {
      authorized: true;
      user: {
        id: string;
        email: string;
      };
    }
  | {
      authorized: false;
      statusCode: 401 | 403;
      message: string;
    };

export async function requireAdmin(
  event: HandlerEvent
): Promise<AdminAuthResult> {
  const authorizationHeader =
    event.headers.authorization ??
    event.headers.Authorization;

  if (!authorizationHeader) {
    return {
      authorized: false,
      statusCode: 401,
      message: "Authentication required.",
    };
  }

  const match =
    authorizationHeader.match(/^Bearer\s+(.+)$/i);

  if (!match) {
    return {
      authorized: false,
      statusCode: 401,
      message: "Invalid authorization header.",
    };
  }

  const accessToken = match[1];

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(accessToken);

  if (error || !user) {
    return {
      authorized: false,
      statusCode: 401,
      message: "Invalid or expired authentication token.",
    };
  }

  const email = user.email?.trim().toLowerCase();

  if (email !== ADMIN_EMAIL) {
    return {
      authorized: false,
      statusCode: 403,
      message: "You are not authorized to access the admin dashboard.",
    };
  }

  return {
    authorized: true,
    user: {
      id: user.id,
      email: email,
    },
  };
}

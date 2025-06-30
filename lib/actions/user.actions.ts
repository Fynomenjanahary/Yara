"use server";

import { cookies, headers } from "next/headers";
import { db } from "../db";
import { Parsestringify } from "../utils";

type createAccountType = {
  email: string;
  password: string;
};

const getUserByEmail = async (email: string) => {
  const res = await db.query("SELECT * from accounts WHERE email = $1", [
    email,
  ]);

  if (res.rowCount && res.rowCount > 0) return res.rows[0];
  else return null;
};

export const createAccount = async ({ email, password }: createAccountType) => {
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    const userId = await db.query("SELECT register_user($1, $2) as id", [
      email,
      password,
    ]);

    return { success: true, value: Parsestringify(userId.rows[0].id) };
  } else {
    return {
      success: false,
      field: "email",
      message: "Adresse e-mail déjà existant.",
    };
  }
};

export const login = async ({ email, password }: createAccountType) => {
  const hdrs = await headers();
  const userAgent = hdrs.get("user-agent") ?? "unknown";
  const xff = hdrs.get("x-forwarded-for");

  const ip = xff
    ? xff.split(",")[0]
    : (hdrs.get("remote-address") ?? "unknown");

  const res = await db.query("SELECT login($1, $2, $3, $4) as token", [
    email,
    password,
    ip,
    userAgent,
  ]);
  const token = res.rows[0].token;

  if (token) {
    const cookie = await cookies();

    cookie.set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return token;
  }

  return null;
};

export async function logout() {
  const cookieStore = await cookies();
  // Properly expire the 'token' cookie
  cookieStore.set("token", "", {
    maxAge: 0,
    path: "/",
  });
}


export const verifyCode = async (id: string, code: string) => {
  const res = await db.query("SELECT verify_codee($1, $2)", [id, code]);

  const isValid = res.rows[0].verify_codee as boolean;

  return isValid;
};

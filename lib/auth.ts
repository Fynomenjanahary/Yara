// utils/auth.ts
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserRoleFromToken(
  token: string,
): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    const roles = payload.roles as string[] | undefined;

    if (roles && roles.length > 0) {
      return roles[0];
    }

    return null;
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error);
    return null;
  }
}

import { db } from "@/lib/db";

export async function POST({
  params,
}: {
  params: { id: string; code: string };
}) {
  const { id, code } = params;

  const res = await db.query("SELECT  verify_code($1, $2);", [id, code]);
  const verified = res.rows[0] as boolean;

  if (verified) {
    const token = await db.query("SELECT login($1, $2);", [id])
    
  }
}

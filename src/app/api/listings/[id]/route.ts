import { eq } from "drizzle-orm";
import { db } from "@/db";
import { listing } from "@/db/schemas";

// Načti jeden inzerát podle ID
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = db
    .select()
    .from(listing)
    .where(eq(listing.id, Number(id)))
    .get();

  if (!item) {
    return Response.json({ error: "Inzerát nenalezen" }, { status: 404 });
  }

  return Response.json(item);
}

// Změn stav inzerátu podle ID
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  const updated = db
    .update(listing)
    .set({ status: body.status })
    .where(eq(listing.id, Number(id)))
    .returning()
    .get();

  return Response.json(updated);
}

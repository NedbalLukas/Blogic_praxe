import { eq } from "drizzle-orm";
import { db } from "@/db";
import { listing } from "@/db/schemas";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const item = db
    .select()
    .from(listing)
    .where(eq(listing.id, Number(id)))
    .get();

  if (!item) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(item);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const updated = db
    .update(listing)
    .set({ status: body.status })
    .where(eq(listing.id, Number(id)))
    .returning()
    .get();

  return Response.json(updated);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  db.delete(listing)
    .where(eq(listing.id, Number(id)))
    .run();
  return Response.json({ success: true });
}

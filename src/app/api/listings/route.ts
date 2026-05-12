import type { InferInsertModel } from "drizzle-orm";
import { db } from "@/db";
import { listing } from "@/db/schemas";

type NewListing = InferInsertModel<typeof listing>;

// Načti všechny inzeráty
export async function GET() {
  const listings = db.select().from(listing).all();
  return Response.json(listings);
}

// Vytvoř nový inzerát
export async function POST(request: Request) {
  const body: NewListing = await request.json();

  const newListing = db
    .insert(listing)
    .values({
      title: body.title,
      description: body.description,
      price: body.isFree ? null : body.price,
      isFree: body.isFree,
      category: body.category,
      status: "available",
      contact: body.contact,
    })
    .returning()
    .get();

  return Response.json(newListing);
}

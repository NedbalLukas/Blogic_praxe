import type { InferInsertModel } from "drizzle-orm";
import { db } from "@/db";
import { listing } from "@/db/schemas";

type NewListing = InferInsertModel<typeof listing>;

export async function GET() {
  try {
    const listings = db.select().from(listing).all();
    return Response.json(listings);
  } catch (error) {
    console.error("GET error:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: NewListing = await request.json();
    console.log("body:", body);

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

    console.log("newListing:", newListing);
    return Response.json(newListing);
  } catch (error) {
    console.error("POST error:", String(error));
    return Response.json({ error: String(error) }, { status: 500 });
  }
}

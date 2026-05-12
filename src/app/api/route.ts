import { inArray } from "drizzle-orm";
import { db } from "@/db";
import { systemSetting } from "@/db/schemas";

export interface SystemSettingsResponse {
  isMaintenance: boolean;
}

// Načti systémová nastavení z databáze
export function GET() {
  const settings = db
    .select({ name: systemSetting.name, value: systemSetting.value })
    .from(systemSetting)
    .where(inArray(systemSetting.name, ["isMaintenance"]))
    .all();

  // Převeď pole na objekt a vrať odpověď
  const values = Object.fromEntries(settings.map((s) => [s.name, s.value]));

  return Response.json({
    isMaintenance: values.isMaintenance === "true",
  } as SystemSettingsResponse);
}

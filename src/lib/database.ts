import { neon } from "@neondatabase/serverless";
import { Property } from "./types";

export const sql = neon(`${process.env.DATABASE_URL}`);

export const getPropertiesByUserId = async (userId: string) => {
  const properties =
    await sql`SELECT * FROM mortgage.properties WHERE user_id = ${userId}`;

  return properties as Property[];
};

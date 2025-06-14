"use server";
import { sql } from "../database";
import { Property } from "../types";

const table = `mortgage.properties`;

export const findPropertyById = async (id: string) => {
  const result = await sql.query(
    "SELECT * FROM mortgage.properties WHERE id = $1",
    [id]
  );
  return result[0] as Property;
};

export const findPropertiesByUserId = async (userId: string) => {
  const result = await sql`SELECT * FROM ${table} WHERE user_id={userId}`;
  return result as Property[];
};

export const updateProperty = async (
  id: string,
  updates: Partial<Property>
) => {
  const entries = Object.entries(updates);

  if (entries.length === 0) return;

  const setFragments = entries.map(
    ([key, value]) => sql`${sql.unsafe(key)} = ${value}`
  );

  const setClause = setFragments.reduce((acc, fragment, i) => {
    return i === 0 ? fragment : sql`${acc}, ${fragment}`;
  });

  await sql`
    UPDATE mortgage.properties
    SET ${setClause}
    WHERE id = ${id}
  `;
};

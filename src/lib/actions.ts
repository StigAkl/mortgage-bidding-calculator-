"use server";
import { auth } from "@clerk/nextjs/server";
import { sql, getPropertiesByUserId } from "./database";
import {
  PropertyForm,
  Scenario,
  ScenarioForm,
  UpdateScenarioDto,
} from "./types";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";

export const loadPropertiesByUserId = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const data = await getPropertiesByUserId(userId);
  return data;
};

export const createProperty = async (property: PropertyForm) => {
  const { userId } = await auth();
  if (!userId) return;

  const id = uuidv4();

  try {
    await sql`
    INSERT INTO mortgage.properties (
      id,
      user_id,
      name,
      asking_price,
      shared_debt,
      purchase_costs,
      monthly_shared_costs
    )
    VALUES (
      ${id},
      ${userId},
      ${property.name},
      ${property.asking_price},
      ${property.shared_debt},
      ${property.purchase_costs},
      ${property.monthly_shared_costs}
    )
  `;

    return {
      success: true,
      id: id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error creating property",
    };
  }
};

export const createScenarioAction = async (data: ScenarioForm) => {
  const id = uuidv4();
  const scenario: Scenario = {
    id: id,
    has_co_borrower: data.has_co_borrower,
    interest_rate: data.interest_rate,
    loan_period_years: data.loan_period_years,
    name: data.name,
    offer_price: data.offer_price,
    own_capital: data.own_capital,
    primary_net_income: data.primary_net_income,
    property_id: data.property_id,
    co_borrower_net_income: data.co_borrower_net_income,
    renovation: data.renovation,
    expected_return_rate: data.expected_return_rate,
    show_price_estimation: data.show_price_estimation,
  };

  try {
    await sql`
        insert into mortgage.scenarios (
          id, property_id, name, offer_price, own_capital, interest_rate, loan_period_years,
          has_co_borrower, primary_net_income, co_borrower_net_income, renovation, expected_return_rate,
          show_price_estimation
        )
        VALUES
        (
          ${id},
          ${scenario.property_id},
          ${scenario.name},
          ${scenario.offer_price},
          ${scenario.own_capital},
          ${scenario.interest_rate},
          ${scenario.loan_period_years},
          ${scenario.has_co_borrower},
          ${scenario.primary_net_income},
          ${scenario.co_borrower_net_income},
          ${scenario.renovation},
          ${scenario.expected_return_rate},
          ${scenario.show_price_estimation}
        )
      `;

    return {
      success: true,
      id: id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error creating scenario",
    };
  }
};

export async function updateScenario(id: string, data: UpdateScenarioDto) {
  try {
    const result = await sql`
    UPDATE mortgage.scenarios
    SET
     offer_price = ${data.offer_price},
      own_capital = ${data.own_capital},
    loan_period_years = ${data.loan_period_years},
    has_co_borrower = ${data.has_co_borrower},
    primary_net_income = ${data.primary_net_income},
    co_borrower_net_income = ${data.co_borrower_net_income},
    show_price_estimation = ${data.show_price_estimation},
    interest_rate = ${data.interest_rate}
    WHERE
    id=${id}
    `;
    return { success: true, scenario: result[0] };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update scenario",
    };
  }
}

export const deleteScenario = async (id: string) => {
  await sql`DELETE FROM mortgage.scenarios WHERE id=${id}`;
  return {
    success: true,
  };
};

export type Property = {
  id: string;
  name: string;
  asking_price: number;
  shared_debt: number;
  purchase_costs: number;
  monthly_shared_costs: number;
};

export type PropertyForm = Omit<Property, "id">;

export type Scenario = {
  id: string;
  property_id: string;
  name: string;
  offer_price: number;
  own_capital: number;
  interest_rate: number;
  loan_period_years: number;
  has_co_borrower: boolean;
  primary_net_income: number;
  renovation: number;
  co_borrower_net_income: number;
};

export type ScenarioForm = Omit<Scenario, "id">;

export type UpdateScenarioDto = Partial<Omit<Scenario, "property_id" | "id">>;

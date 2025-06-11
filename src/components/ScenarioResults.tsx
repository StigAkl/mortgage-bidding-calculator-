import { Property, Scenario } from "@/lib/types";
import { calculateMonthlyPayment, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface ScenarioResultsProps {
  scenario: Scenario;
  property: Property;
}

const ScenarioResults = ({ scenario, property }: ScenarioResultsProps) => {

  const calculatedResults = () => {

    const totalPrice = scenario.offer_price + property.purchase_costs + property.shared_debt + scenario.renovation;
    const loanSum = totalPrice - scenario.own_capital;
    const monthlyLoanPayment = calculateMonthlyPayment(loanSum, scenario.interest_rate, scenario.loan_period_years);
    const totalMonthlyPayment = monthlyLoanPayment + property.monthly_shared_costs;

    let primaryBorrower = totalMonthlyPayment;
    let coBorrower = 0;

    if (scenario.has_co_borrower && scenario.primary_net_income + scenario.co_borrower_net_income > 0) {
      const totalSalary = scenario.primary_net_income + scenario.co_borrower_net_income;
      primaryBorrower = totalMonthlyPayment * (scenario.primary_net_income / totalSalary)
      coBorrower = totalMonthlyPayment * (scenario.co_borrower_net_income / totalSalary);
    }

    return {
      totalPrice,
      loanSum,
      monthlyLoanPayment,
      totalMonthlyPayment,
      primaryBorrower,
      coBorrower
    }
  }

  const results = calculatedResults();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resultater</CardTitle>
        <CardDescription>Månedlige kostnader</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Results - Always Visible */}
        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="font-medium text-blue-900">Månedlig kostnad:</span>
            <span className="font-bold text-lg text-blue-900">{formatCurrency(results.totalMonthlyPayment)}</span>
          </div>
          <div className="flex justify-between text-sm mt-4">
            <span className="text-muted-foreground">Lånekostnad:</span>
            <span>{formatCurrency(results.monthlyLoanPayment)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fellesutgifter:</span>
            <span>{formatCurrency(property.monthly_shared_costs)}</span>
          </div>
        </div>

        <Separator />

        {/* Detailed Results - Collapsible */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Totalpris:</span>
            <span>{formatCurrency(results.totalPrice)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Lånebehov:</span>
            <span>{formatCurrency(results.loanSum)}</span>
          </div>
        </div>

        {scenario.has_co_borrower && (
          <>
            <Separator className="my-2" />
            <div className="space-y-2">
              <div className="text-xs font-medium mb-2">Fordeling:</div>
              <div className="flex justify-between text-xs">
                <span>Hovedlåntaker:</span>
                <span className="font-medium">{formatCurrency(results.primaryBorrower)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Medlåntaker:</span>
                <span className="font-medium">{formatCurrency(results.coBorrower)}</span>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ScenarioResults;
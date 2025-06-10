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

    const totalPrice = scenario.offer_price + property.purchase_costs + property.shared_debt;
    const loanSum = totalPrice - scenario.own_capital;

    const monthlyLoanPayment = calculateMonthlyPayment(loanSum, scenario.interest_rate, scenario.loan_period_years);

    console.log(monthlyLoanPayment);
    const totalMonthlyPayment = monthlyLoanPayment + property.monthly_shared_costs;

    return {
      totalPrice,
      loanSum,
      monthlyLoanPayment,
      totalMonthlyPayment
    }
  }

  const results = calculatedResults();

  return (
    <Card>
      <CardHeader className="pb-3">
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
          <div className="flex justify-between text-sm">
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
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="text-sm py-2 hover:no-underline">Vis detaljer</AccordionTrigger>
            <AccordionContent>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default ScenarioResults;
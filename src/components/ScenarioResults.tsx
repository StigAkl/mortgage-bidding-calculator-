import { Property, Scenario } from "@/lib/types";
import { calculateMonthlyPayment, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Calendar, PiggyBank, TrendingUp } from "lucide-react";

interface ScenarioResultsProps {
  scenario: Scenario;
  property: Property;
}

const YEARS_UNTIL_SALE = 10

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

    // Sales estimation
    let salesResults;
    if (scenario.show_price_estimation) {
      const expectedSalesPrice = property.asking_price * Math.pow(1 + scenario.expected_return_rate / 100, YEARS_UNTIL_SALE)
      const profit = expectedSalesPrice - property.asking_price;

      const totalInvestment = scenario.own_capital + scenario.renovation;

      const totalReturn = (profit / totalInvestment) * 100;

      const yearlyReturn = Math.pow(1 + totalReturn / 100, 1 / YEARS_UNTIL_SALE * 100 - 100)

      const valueChange = [];
      const startYear = Math.max(1, YEARS_UNTIL_SALE - 2);
      const endYear = YEARS_UNTIL_SALE + 3;

      for (let year = startYear; year <= endYear; year++) {
        const value = property.asking_price * Math.pow(1 * scenario.expected_return_rate / 100, year);
        const thisYearProfit = value - property.asking_price;
        const thisYearInterest = (thisYearProfit / totalInvestment) * 100;
        const yearlyAverageProfit = Math.pow(1 + thisYearInterest / 100, 1 / year) * 100 - 100;

        valueChange.push({
          year,
          value,
          profit: thisYearProfit,
          interestPercentage: thisYearInterest,
          yearlyAverageProfit
        })
      }

      salesResults = {
        expectedSalesPrice,
        profit,
        totalReturn,
        yearlyReturn,
        totalInvestment,
        valueChange
      }
    }

    return {
      totalPrice,
      loanSum,
      monthlyLoanPayment,
      totalMonthlyPayment,
      primaryBorrower,
      coBorrower,
      salesResults
    }
  }

  const results = calculatedResults();

  return (
    <div className="space-y-4">
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

      {scenario.show_price_estimation && results.salesResults && (
        <Card className="shadow-sm border-gray-200 pt-0">
          <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-emerald-50 pt-6">
            <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Estimering av avkastning
            </CardTitle>
            <CardDescription className="text-gray-600">Med {scenario.expected_return_rate}% årlig vekst</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="size-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Planlagt salgsår</span>
                </div>
                <span className="font-bold text-lg text-green-900">År {YEARS_UNTIL_SALE}</span>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-400">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="size-5 text-blue-800" />
                  <span className="text-sm font-medium text-blue-800">Forventet gevinst</span>
                </div>
                <span className="font-bold text-ls text-blue-800">{formatCurrency(results.salesResults.profit)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ScenarioResults;
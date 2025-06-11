import { Scenario, UpdateScenarioDto } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrashIcon, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Label } from "./ui/label";
import FormattedInput from "./FormattedInput";
import { updateScenario } from "@/lib/actions";
import { Switch } from "./ui/switch";

interface ScenarioFormProps {
  scenario: Scenario
  onUpdate: (scenario: Scenario) => void
  onDelete: (id: string) => void
  canDelete: boolean
}

const ScenarioForm = ({ scenario, onUpdate, onDelete, canDelete }: ScenarioFormProps) => {

  const handleUpdateScenario = async (updates: UpdateScenarioDto) => {
    onUpdate({ ...scenario, ...updates })
    const result = await updateScenario({ ...scenario, ...updates })

    console.log("SCenario:", scenario)
    if (result.error) {

    }
  }

  return (
    <Card className="shadow-sm border-gray-200 rounded-t-md pt-0">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100/50 pt-6">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
              <Calculator className="size-5 text-blue-600" />
              {scenario.name}</CardTitle>
            <CardDescription className="text-gray-600">
              Juster parametere for beregning</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onDelete(scenario.id)}>
            <TrashIcon className="size-5 text-red-400" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={["basic"]} className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger className="text-sm font-medium">Grunnleggende info</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor={`prisantydning-${scenario.id}`} className="text-xs">
                    Bud
                  </Label>
                  <FormattedInput id={`prisantydning-${scenario.id}`} value={scenario.offer_price} onChange={(value) => handleUpdateScenario({ offer_price: value })}
                    className="h-8" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`egenkapital-${scenario.id}`} className="text-xs">
                    Egenkapital
                  </Label>
                  <FormattedInput
                    id={`egenkapital-${scenario.id}`}
                    value={scenario.own_capital}
                    onChange={(value) => handleUpdateScenario({ own_capital: value })}
                    className="h-8"
                  />
                </div>

                <div className="space-y-1">
                  <Label htmlFor={`rente-${scenario.id}`} className="text-xs">
                    Rente (%)
                  </Label>
                  <FormattedInput
                    id={`rente-${scenario.id}`}
                    value={scenario.interest_rate}
                    onChange={(value) => handleUpdateScenario({ interest_rate: value })}
                    className="h-8"
                    isPercentage={true}
                    step="0.1"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`nedbetalingstid-${scenario.id}`} className="text-xs">
                    Nedbetalingstid (år)
                  </Label>
                  <FormattedInput
                    id={`nedbetalingstid-${scenario.id}`}
                    value={scenario.loan_period_years}
                    onChange={(value) => handleUpdateScenario({ loan_period_years: value })}
                    className="h-8"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`nedbetalingstid-${scenario.id}`} className="text-xs">
                    Oppussingskostnader (kr)
                  </Label>
                  <FormattedInput
                    id={`renovation-${scenario.id}`}
                    value={scenario.renovation}
                    onChange={(value) => handleUpdateScenario({ renovation: value })}
                    className="h-8"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="co_borrower">
            <AccordionTrigger className="text-sm font-medium">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Medlåntaker
                {scenario.has_co_borrower && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">Aktiv</span>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    id={`co-borrower-${scenario.id}`}
                    checked={scenario.has_co_borrower}
                    onCheckedChange={(checked) => handleUpdateScenario({ has_co_borrower: checked })}
                  />
                  <Label htmlFor={`medlantaker-${scenario.id}`} className="text-sm font-medium">
                    Har medlåntaker
                  </Label>
                </div>

                {scenario.has_co_borrower && (
                  <div className="grid gap-4 sm:grid-cols-2 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor={`hoverlantaker-lonn-${scenario.id}`}
                        className="text-sm font-medium">
                        Hovedlåntaker netto lønn/mnd
                      </Label>
                      <FormattedInput
                        id={`hovedlantaker-lonn-${scenario.id}`}
                        value={scenario.primary_net_income}
                        onChange={(value) => handleUpdateScenario({ primary_net_income: value })}
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`medlantaker-lonn-${scenario.id}`} className="text-sm font-medium">
                        Medlåntaker netto lønn/mnd
                      </Label>
                      <FormattedInput
                        id={`medlantaker-lonn-${scenario.id}`}
                        value={scenario.co_borrower_net_income || 0}
                        onChange={(value) => handleUpdateScenario({ co_borrower_net_income: value })}
                        className="h-10"
                      />
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sales" className="border-gray-200">
            <AccordionTrigger className="text-sm font-medium text-gray-900 hover:text-blue-700">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Salgsestimering
                {scenario.show_price_estimation &&
                  <span className="
                  text-xs 
                  bg-blue-100 
                  text-blue-800 
                  px-2 
                  py-1 
                  rounded-full font-medium">
                    Aktiv
                  </span>}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Switch
                    checked={scenario.show_price_estimation}
                    onCheckedChange={(checked) => handleUpdateScenario({ show_price_estimation: checked })}
                    id={`sales-estimation-${scenario.id}`} />
                  <Label htmlFor={`sales-estimation-${scenario.id}`}>
                    Kalkuler avkastning
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {scenario.show_price_estimation && (
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="space-y-2">
              <Label htmlFor={`price-increase-${scenario.id}`} className="text-sm font-medium text-gray-700">
                Forventet årlig prisøkning (%)
              </Label>
              <FormattedInput
                id={`price-increase-${scenario.id}`}
                isPercentage
                className="h-10"
                value={scenario.expected_return_rate}
                onChange={(value) => handleUpdateScenario({ expected_return_rate: value })}
              />
            </div>
          </div>
        )}
      </CardContent >
    </Card >
  )
}

export default ScenarioForm;
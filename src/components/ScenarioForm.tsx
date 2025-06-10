import { Scenario, UpdateScenarioDto } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Label } from "./ui/label";
import FormattedInput from "./FormattedInput";
import { updateScenario } from "@/lib/actions";

interface ScenarioFormProps {
  scenario: Scenario
  onUpdate: (scenario: Scenario) => void
  onDelete: (id: string) => void
  canDelete: boolean
}

const ScenarioForm = ({ scenario, onUpdate, onDelete, canDelete }: ScenarioFormProps) => {

  const handleUpdateScenario = async (updates: UpdateScenarioDto) => {
    onUpdate({ ...scenario, ...updates })
    const res = await updateScenario({ ...scenario, ...updates })
    console.log("result:", res)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{scenario.name}</CardTitle>
            <CardDescription>Juster parametere for beregning</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onDelete(scenario.id)}>
            <TrashIcon className="size-4" />
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
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent >
    </Card >
  )
}

export default ScenarioForm;
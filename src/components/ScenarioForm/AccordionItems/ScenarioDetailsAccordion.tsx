import { Save } from "lucide-react";
import FormattedInput from "../../FormattedInput"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Button } from "../../ui/button";
import { Label } from "../../ui/label"
import { Scenario, UpdateScenarioDto } from "@/lib/types"

interface UpdateScenarioAccordionProps {
  scenario: Scenario;
  handleUpdateScenario: (updates: UpdateScenarioDto) => void;
}

const ScenarioDetailsAccordion = ({ scenario, handleUpdateScenario }: UpdateScenarioAccordionProps) => {
  return (
    <AccordionItem value="basic" className="">
      <AccordionTrigger className="text-sm font-medium pt-0">Grunnleggende info</AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor={`prisantydning-${scenario.id}`} className="text-xs">
              Bud
            </Label>
            <div>
              <FormattedInput id={`prisantydning-${scenario.id}`} value={scenario.offer_price} onChange={(value) => handleUpdateScenario({ offer_price: value })}
              />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor={`egenkapital-${scenario.id}`} className="text-xs">
              Egenkapital
            </Label>
            <FormattedInput
              id={`egenkapital-${scenario.id}`}
              value={scenario.own_capital}
              onChange={(value) => handleUpdateScenario({ own_capital: value })}

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

            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default ScenarioDetailsAccordion;
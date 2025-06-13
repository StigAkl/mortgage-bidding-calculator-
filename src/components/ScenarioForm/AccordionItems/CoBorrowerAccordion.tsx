import { Users } from "lucide-react"
import FormattedInput from "../../FormattedInput"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion"
import { Switch } from "../../ui/switch"
import { Label } from "../../ui/label"
import { Scenario, UpdateScenarioDto } from "@/lib/types"

interface CoBorrowerAccordionProps {
  scenario: Scenario;
  handleUpdateScenario: (updates: UpdateScenarioDto) => void;
}

const CoBorrowerAccordion = ({ scenario, handleUpdateScenario }: CoBorrowerAccordionProps) => {

  return (
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
  )
}

export default CoBorrowerAccordion;
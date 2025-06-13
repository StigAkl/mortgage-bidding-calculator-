import { Scenario, UpdateScenarioDto } from "@/lib/types"
import { AccordionContent, AccordionItem, AccordionTrigger } from "../../ui/accordion";
import { TrendingUp } from "lucide-react";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import FormattedInput from "@/components/FormattedInput";

interface SalesEstimationAccordionProps {
  scenario: Scenario;
  handleUpdateScenario: (updates: UpdateScenarioDto) => void;
}

const SalesEstimationAccordion = ({ scenario, handleUpdateScenario }: SalesEstimationAccordionProps) => {
  return (
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

        {scenario.show_price_estimation && (
          <div className="grid gap-4 grid-cols-2 pt-2">
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
      </AccordionContent>
    </AccordionItem>
  )
}

export default SalesEstimationAccordion;
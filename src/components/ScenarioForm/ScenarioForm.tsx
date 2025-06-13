"use client";
import { Property, Scenario, UpdateScenarioDto } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, SaveAll, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Accordion } from "../ui/accordion";
import { Label } from "../ui/label";
import FormattedInput from "../FormattedInput";
import { updateScenario } from "@/lib/actions";
import CoBorrowerAccordion from "./AccordionItems/CoBorrowerAccordion";
import ScenarioDetailsAccordion from "./AccordionItems/ScenarioDetailsAccordion";
import SalesEstimationAccordion from "./AccordionItems/SalesEstimationAccordion";
import { useState } from "react";

interface ScenarioFormProps {
  scenario: Scenario
  onUpdate: (scenario: Scenario) => void
  onDelete: (id: string) => void
  canDelete: boolean;
  property: Property;
}

const ScenarioForm = ({ scenario, onUpdate, onDelete, canDelete, property }: ScenarioFormProps) => {

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setIsSaved] = useState(false);

  const handleUpdateScenario = async (updates: UpdateScenarioDto) => {
    setIsSaved(false);
    onUpdate({ ...scenario, ...updates })
  }

  const handleSaveScenario = async () => {
    setIsSaving(true);
    const result = await updateScenario(scenario.id, scenario);
    setIsSaving(false);
    if (result.error) {
      throw new Error("Error..");
    } else {
      setIsSaved(true);
    }
  }

  return (
    <Card className="shadow-sm border-gray-200 rounded-t-md pt-0">
      <CardHeader className="pt-4">
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
          <ScenarioDetailsAccordion handleUpdateScenario={handleUpdateScenario} scenario={scenario} />
          <CoBorrowerAccordion handleUpdateScenario={handleUpdateScenario} scenario={scenario} />
          <SalesEstimationAccordion handleUpdateScenario={handleUpdateScenario} scenario={scenario} />
        </Accordion>
        <div className="mt-3">
          <Button variant="outline" onClick={() => handleSaveScenario()} disabled={isSaving || saved}><SaveAll />{saved ? "Lagret!" : "Lagre endringer"}</Button>
        </div>
      </CardContent >
    </Card >
  )
}

export default ScenarioForm;
"use client"
import { Property, Scenario } from "@/lib/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { createScenarioAction } from "@/lib/actions";
import ScenarioForm from "./ScenarioForm";
import ScenarioResults from "./ScenarioResults";


interface ScenarioTabsProps {
  initialScenarios: Scenario[];
  property: Property;
}

const ScenarioTabs = ({ initialScenarios, property }: ScenarioTabsProps) => {
  const [scenarios, setScenarios] = useState(initialScenarios);
  const [activeTab, setActiveTab] = useState(scenarios.length > 0 ? scenarios[0].id : "");
  const [error, setError] = useState<string | undefined>(undefined);

  const addNewScenario = async () => {
    const scenario = {
      has_co_borrower: false,
      interest_rate: 5.6,
      loan_period_years: 30,
      name: "Scenario ".concat((scenarios.length + 1).toString()),
      offer_price: property.asking_price + (scenarios.length * 100000),
      own_capital: 650_000,
      primary_net_income: 40_000,
      property_id: property.id,
    };

    const result = await createScenarioAction(scenario)

    if (result.success && result.id) {
      setScenarios((prev) => [...prev, { ...scenario, id: result.id }]);
    } else {
      setError(result.error);
    }
  }

  const removeScenario = async (id: string) => {
    if (scenarios.length <= 1) return

    // TODO
    const result = await deleteScenario(id)

    if (result.success) {
      const updatedScenarios = scenarios.filter((s) => s.id !== id)
      setScenarios(updatedScenarios)

      if (activeTab === id) {
        setActiveTab(updatedScenarios[0]?.id || "")
      }
    }
  }

  const updateScenarioState = (updatedScenario: Scenario) => {
    setScenarios(scenarios.map((s) => (s.id === updatedScenario.id ? updatedScenario : s)))
  }

  if (scenarios.length === 0) {
    return (
      <div className="text-center py-12">
        {error && (
          <p className="bg-red-100 text-sm text-red-800 text-center px-3 py-2 rounded-lg mb-6">{error}</p>
        )}
        <h3 className="text-lg font-semibold mb-2">Ingen scenarioer for denne boligen enda</h3>
        <p className="text-muted-foreground mb-4">Opprett ditt første scenario for denne boligen</p>
        <Button className="cursor-pointer" onClick={() => addNewScenario()}>
          <PlusCircle />
          Opprett ditt første scenario
        </Button>
      </div>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <h1 className="text-2xl mt-4 border-t">Scenarioer</h1>
      <div className="flex items-center justify-between">
        <TabsList className="overflow-x-auto mt-2">
          {scenarios.map((scenario) => (
            <TabsTrigger key={scenario.id} value={scenario.id}>
              {scenario.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <Button onClick={() => addNewScenario()} size="sm" variant="outline">
          <PlusCircle className="" />
          Legg til scenario
        </Button>
      </div>

      {scenarios.map((scenario) => (
        <TabsContent key={scenario.id} value={scenario.id}>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ScenarioForm
                scenario={scenario}
                onUpdate={updateScenarioState}
                onDelete={removeScenario}
                canDelete={scenarios.length > 1}
              />
            </div>
            <div>
              <ScenarioResults scenario={scenario} property={property} />
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default ScenarioTabs;
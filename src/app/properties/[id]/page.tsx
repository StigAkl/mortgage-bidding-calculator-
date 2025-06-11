import Container from "@/components/Container"
import PropertyInfo from "@/components/PropertyInfo";
import ScenarioTabs from "@/components/ScenarioTabs";
import { Button } from "@/components/ui/button";
import { sql } from "@/lib/database";
import { Property, Scenario } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const result = await sql`
  SELECT * FROM mortgage.properties WHERE id = ${id}
  `;

  const property = result[0] as Property;

  if (!property)
    notFound();

  const scenarios = (await sql`
  SELECT * FROM mortgage.scenarios WHERE property_id = ${property.id}`) as Scenario[];

  return (
    <Container>
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/properties">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tilbake til boliger
          </Link>
        </Button>
      </div>

      <PropertyInfo property={property} />
      <ScenarioTabs initialScenarios={scenarios} property={property} />
    </Container>
  )
}

export default Page;
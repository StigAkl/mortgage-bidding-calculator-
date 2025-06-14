import Container from "@/components/Container";
import EditProperty from "@/components/EditProperty";
import { Button } from "@/components/ui/button";
import { findPropertyById } from "@/lib/repository/propertyRepo";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EditProps {
  params: Promise<{ id: string }>;
};


const Edit = async ({ params }: EditProps) => {
  const propertyId = (await params).id;
  const property = await findPropertyById(propertyId);

  return (
    <Container>
      <div>
        <div className="flex items-center gap-5 space-y-6">
          <Button variant="ghost" asChild>
            <Link href={`/properties/${propertyId}`}>
              <ArrowLeft /> Tilbake til bolig
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Rediger bolig</h1>
            <p className="text-muted-foreground">Oppdater inforamsjon om {property.name}</p>
          </div>
        </div>
        <EditProperty property={property} />
      </div>
    </Container>
  )
}

export default Edit;
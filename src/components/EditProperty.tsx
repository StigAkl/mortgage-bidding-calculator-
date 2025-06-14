"use client"
import { Property } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Home, Save, X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { updateProperty } from "@/lib/repository/propertyRepo";
import { useRouter } from "next/navigation";

interface UpdatePropertyDto {
  name: string;
  asking_price: number;
  purchase_costs: number;
  shared_debt: number;
  monthly_shared_costs: number;
}

interface EditPropertyProps {
  property: Property;
}


const EditProperty = ({ property }: EditPropertyProps) => {


  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<UpdatePropertyDto>({
    name: property.name,
    monthly_shared_costs: property.monthly_shared_costs,
    asking_price: property.asking_price,
    purchase_costs: property.purchase_costs,
    shared_debt: property.shared_debt
  });

  const fallbackUrl = `/properties/${property.id}`;
  const handleUpdateProperty = async (formData: FormData) => {

    const name = formData.get("property-name") as string;
    const monthly_shared_costs = Number(formData.get("monthlyCosts"));
    const purchase_costs = Number(formData.get("purchase_costs"));
    const asking_price = Number(formData.get("price"));
    const shared_debt = Number(formData.get("sharedDebt"));

    const updatedProperty: UpdatePropertyDto = {
      name, monthly_shared_costs, purchase_costs, asking_price, shared_debt
    }

    try {
      await updateProperty(property.id, updatedProperty);
      router.push(fallbackUrl);
    } catch (e) {
      console.error("Error saving property:", e);
    }
  }

  const handleCancel = () => {
    router.push(fallbackUrl)
  }

  return (
    <Card className="max-w-2xl shadow-sm border-gray-200 mt-4 pt-0">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100/50 pt-3">
        <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          Rediger boliginformasjon
        </CardTitle>
        <CardDescription className="text-gray-600">Oppdater grunnleggende informasjon om boligen</CardDescription>
      </CardHeader>

      <CardContent>
        <form action={handleUpdateProperty}>
          <FormGroup>
            <Label htmlFor="property-name">
              Navn på bolig
            </Label>
            <Input id="property-name" name="property-name" type="text"
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              value={formData.name} autoComplete="off" />
          </FormGroup>
          <div className="grid grid-cols-2 gap-4">
            <FormGroup>
              <Label htmlFor="price">Prisantydning</Label>
              <Input type="number" name="price" max={999999999} onChange={(e) => setFormData((prev) => ({ ...prev, asking_price: parseInt(e.target.value) }))} value={formData.asking_price} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="purchase_costs">Omkostninger</Label>
              <Input type="number" name="purchase_costs"
                onChange={(e) => setFormData((prev) => ({ ...prev, purchase_costs: parseInt(e.target.value) }))}
                value={formData.purchase_costs} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="sharedDebt">Fellesgjeld</Label>
              <Input type="number"
                onChange={(e) => setFormData((prev) => ({ ...prev, shared_debt: parseInt(e.target.value) }))}
                name="sharedDebt" value={formData.shared_debt} />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="monthlyCosts">Fellesutgifter / mnd</Label>
              <Input type="number"
                onChange={(e) => setFormData((prev) => ({ ...prev, monthly_shared_costs: parseInt(e.target.value) }))}
                name="monthlyCosts" value={formData.monthly_shared_costs} />
            </FormGroup>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              disabled={!formData.name?.trim() || isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-secondary"
            >
              <Save className="size-4" />
              {isSubmitting ? "Lagrer..." : "Lagre endringer"}
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting} className="flex-1">
              <X className="size-4" />
              Avbryt
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  )
}

interface FormGroupProps {
  children: ReactNode;
}

const FormGroup = ({ children }: FormGroupProps) => {
  return <div className="space-y-2 mt-4">{children}</div>
}

export default EditProperty;
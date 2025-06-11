"use client"
import Container from "@/components/Container";
import FormattedInput from "@/components/FormattedInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProperty, loadPropertiesByUserId } from "@/lib/actions";
import { Property, PropertyForm } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { ArrowRight, Home, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const defaultProperty: PropertyForm = {
  asking_price: 5850000,
  monthly_shared_costs: 4970,
  name: "",
  purchase_costs: 9350,
  shared_debt: 150000,
}

const Properties = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [newProperty, setNewProperty] = useState<PropertyForm>(defaultProperty);
  const router = useRouter();


  const loadProperties = async () => {
    const properties = await loadPropertiesByUserId();
    setProperties(properties);
  }

  useEffect(() => {
    loadProperties()
  }, [])

  const handleCreateProperty = async () => {
    const result = await createProperty(newProperty);
    if (result?.success && result.id) {
      setNewProperty(defaultProperty)
      router.push(`/properties/${result.id}`);
    }
  }

  if (properties.length === 0 && !isDialogOpen) {
    return (
      <Container className="h-full">
        <div className="w-full flex flex-col items-center justify-center gap-3 p-16">
          <h1 className="text-2xl">Du har ingen boliger</h1>
          <p className="text-muted-foreground">Opprett din første bolig</p>
          <Button className="cursor-pointer text-foreground" onClick={() => setIsDialogOpen(true)}>
            <PlusCircle />
            Opprett din første bolig
          </Button>
        </div>
      </Container>
    )
  }
  return (
    <Container className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mine boliger</h1>
          <p className="text-muted-foreground">Velg en bolig for å se kalkuleringer</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="text-foreground">
              <PlusCircle className="h-4 w-4 mr-2" />
              Ny bolig
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Legg til ny bolig</DialogTitle>
              <DialogDescription>Opprett en ny bolig for å lagre kalkuleringer</DialogDescription>
            </DialogHeader>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <Label htmlFor="propertyName">Navn på bolig</Label>
                <Input id="propertyName" value={newProperty.name} name="propertyName" type="text" placeholder="F.eks Leilighet i Oslo" onChange={(e) => setNewProperty((prev) => ({ ...prev, name: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="askingPrice">Prisantydning</Label>
                <FormattedInput
                  id="askingPrice"
                  value={newProperty.asking_price}
                  onChange={(value) => setNewProperty((prev) => ({ ...prev, asking_price: value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="propertyName">Omkostninger</Label>
                <FormattedInput id="purchaseCost" placeholder="" value={newProperty.purchase_costs} onChange={(value) => setNewProperty((prev) => ({ ...prev, purchase_costs: value }))} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sharedDebt">Fellesgjeld</Label>
                <FormattedInput id="sharedDebt" value={newProperty.shared_debt} onChange={(value) => setNewProperty((prev) => ({ ...prev, shared_debt: value }))} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlySharedCosts">Fellesutgifter / mnd</Label>
                <FormattedInput id="monthlySharedCosts" value={newProperty.monthly_shared_costs} onChange={(value) => setNewProperty((prev) => ({ ...prev, monthly_shared_costs: value }))} />
              </div>
            </form>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Avbryt
              </Button>
              <Button onClick={handleCreateProperty}>
                Opprett bolig
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <CardTitle className="text-lg">{property.name}</CardTitle>
                </div>
                <CardDescription className="text-sm">Prisantydning: <span className="font-semibold"> kr {formatNumber(property.asking_price)}</span></CardDescription>
                <CardDescription className="text-sm">Totalpris: <span className="font-semibold"> kr {formatNumber(property.asking_price + property.purchase_costs + property.shared_debt)}</span></CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/properties/${property.id}`} className="flex items-center">Se kalkuleringer <ArrowRight className="h-4 w-4 ml-2" /> </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default Properties;
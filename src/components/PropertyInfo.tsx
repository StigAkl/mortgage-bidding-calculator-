import { Property } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

// <div>
//   <div className="text-sm text-muted-foreground">Navn</div>
//   <div className="font-medium">{property.name}</div>
// </div>
interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo = ({ property }: PropertyInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Boliginformasjon</CardTitle>
        <h1 className="text-muted-foreground">{property.name}</h1>
      </CardHeader>
      <CardContent>
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-muted-foreground">Prisantydning</div>
            <div className="font-medium">{formatCurrency(property.asking_price)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Omkostninger</div>
            <div className="font-medium">{formatCurrency(property.purchase_costs)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Fellesgjeld</div>
            <div className="font-medium">{formatCurrency(property.shared_debt)}</div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground">Fellesutgifter</div>
            <div className="font-medium">{formatCurrency(property.monthly_shared_costs)}/mnd</div>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}

export default PropertyInfo;
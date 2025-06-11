import { Property } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Home } from "lucide-react";

// <div>
//   <div className="text-sm text-muted-foreground">Navn</div>
//   <div className="font-medium">{property.name}</div>
// </div>
interface PropertyInfoProps {
  property: Property;
}

const PropertyInfo = ({ property }: PropertyInfoProps) => {
  return (
    <Card className="shadow-sm border-gray-200 rounded-t-md pt-0">
      <CardHeader className="pb-4 bg-gradient-to-r from-gray-50 to-gray-100/50 pt-6">
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <Home className="h-5 w-5 text-blue-600" />
          Boliginformasjon
        </CardTitle>
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function UITest() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Finvesta UI Components Test</h1>

      {/* Financial Values */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Display Test</CardTitle>
          <CardDescription>
            Testing financial colors and components
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <span className="text-financial-positive font-bold">
              +€1,500.00
            </span>
            <span className="text-financial-negative font-bold">-€250.00</span>
            <span className="text-financial-warning font-bold">⚠️ Alert</span>
          </div>

          <div className="flex gap-2">
            <Badge className="bg-financial-crypto">Crypto</Badge>
            <Badge className="bg-financial-cash">Cash</Badge>
            <Badge className="bg-financial-investment">Investment</Badge>
          </div>

          <Alert>
            <AlertDescription>
              💰 Tienes €22,000 sin rentabilidad - considera mover a cuenta
              remunerada
            </AlertDescription>
          </Alert>

          <Button>Registrar Transacción</Button>
        </CardContent>
      </Card>

      {/* Financial Context Test */}
      <Card>
        <CardHeader>
          <CardTitle>Contexto Financiero Usuario</CardTitle>
          <CardDescription>
            Datos reales de nuestro usuario específico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground">
                Patrimonio Neto
              </span>
              <p className="text-2xl font-bold">€32,000</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">% Cripto</span>
              <p className="text-2xl font-bold text-financial-warning">
                31.25%
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Liquidez sin rentabilidad
              </span>
              <p className="text-2xl font-bold text-financial-negative">
                €22,000
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                Objetivo mensual
              </span>
              <p className="text-2xl font-bold text-financial-positive">
                €1,500
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

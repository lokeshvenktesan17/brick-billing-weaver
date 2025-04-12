
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin } from "lucide-react";
import { Client } from "@/utils/mockData";
import { Button } from "@/components/ui/button";

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-textile-50 border-b pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-textile-600 flex items-center justify-center">
            <span className="text-white font-semibold">{client.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">{client.name}</h3>
            <p className="text-sm text-muted-foreground">{client.company}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{client.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{client.address}</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
          <div>
            <p className="text-muted-foreground text-xs">Outstanding</p>
            <p className="font-semibold text-amber-600">${client.outstandingAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Total Billed</p>
            <p className="font-semibold">${client.totalBilled.toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-between pt-3 bg-muted/30">
        <Button variant="outline" size="sm">View Details</Button>
        <Button size="sm">New Invoice</Button>
      </CardFooter>
    </Card>
  );
};

export default ClientCard;

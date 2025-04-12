
import React from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { invoices } from "@/utils/mockData";
import { cn } from "@/lib/utils";

const RecentInvoices = () => {
  const recentInvoices = [...invoices].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }).slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-textile-100 flex items-center justify-center">
                  <span className="text-textile-700 font-semibold">
                    {invoice.client.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{invoice.client.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {invoice.invoiceNumber}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">
                    ₹{invoice.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {format(new Date(invoice.date), "MMM d, yyyy")}
                  </div>
                </div>
                <Badge 
                  className={cn(
                    invoice.status === 'paid' && 'bg-emerald-500 hover:bg-emerald-600',
                    invoice.status === 'pending' && 'bg-amber-500 hover:bg-amber-600',
                    invoice.status === 'overdue' && 'bg-red-500 hover:bg-red-600'
                  )}
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentInvoices;

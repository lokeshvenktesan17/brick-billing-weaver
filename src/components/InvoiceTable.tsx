
import React from "react";
import { format } from "date-fns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, MoreHorizontal } from "lucide-react";
import { Invoice } from "@/utils/mockData";
import { cn } from "@/lib/utils";

interface InvoiceTableProps {
  invoices: Invoice[];
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ invoices }) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.client.name}</TableCell>
              <TableCell>{format(new Date(invoice.date), "MMM d, yyyy")}</TableCell>
              <TableCell>{format(new Date(invoice.dueDate), "MMM d, yyyy")}</TableCell>
              <TableCell className="text-right">
                ${invoice.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell>
                <Badge 
                  className={cn(
                    invoice.status === 'paid' && 'bg-emerald-500 hover:bg-emerald-600',
                    invoice.status === 'pending' && 'bg-amber-500 hover:bg-amber-600',
                    invoice.status === 'overdue' && 'bg-red-500 hover:bg-red-600'
                  )}
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;

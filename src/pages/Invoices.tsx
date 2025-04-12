
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import InvoiceTable from "@/components/InvoiceTable";
import { invoices } from "@/utils/mockData";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Layout/Navbar";
import { Card } from "@/components/ui/card";
import CreateInvoiceForm from "@/components/InvoiceForm/CreateInvoiceForm";

const Invoices = () => {
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Invoices</h1>
            <p className="text-muted-foreground">Manage your invoices and track payments.</p>
          </div>
          <Button 
            className="bg-textile-600 hover:bg-textile-700"
            onClick={() => setIsCreateInvoiceOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Create Invoice
          </Button>
        </div>
        
        <Card className="mb-8 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search invoices..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </Card>
        
        <InvoiceTable invoices={invoices} />

        <CreateInvoiceForm
          open={isCreateInvoiceOpen}
          onClose={() => setIsCreateInvoiceOpen(false)}
        />
      </main>
    </div>
  );
};

export default Invoices;

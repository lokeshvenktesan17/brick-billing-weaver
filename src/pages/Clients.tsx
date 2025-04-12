
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import { clients } from "@/utils/mockData";
import Navbar from "@/components/Layout/Navbar";
import { Input } from "@/components/ui/input";
import ClientCard from "@/components/ClientCard";
import { Card } from "@/components/ui/card";

const Clients = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">Manage your client information and activities.</p>
          </div>
          <Button className="bg-textile-600 hover:bg-textile-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Client
          </Button>
        </div>
        
        <Card className="mb-8 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search clients..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Clients;

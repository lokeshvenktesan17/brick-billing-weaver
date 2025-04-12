
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import RecentInvoices from "@/components/Dashboard/RecentInvoices";
import Navbar from "@/components/Layout/Navbar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to Billing Bricks. Here's an overview of your business.</p>
          </div>
          <Button className="bg-textile-600 hover:bg-textile-700">
            <PlusCircle className="mr-2 h-4 w-4" /> New Invoice
          </Button>
        </div>
        
        <DashboardStats />
        
        <div className="mt-8 grid grid-cols-1 gap-8">
          <RecentInvoices />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

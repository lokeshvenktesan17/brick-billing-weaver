
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, Clock, FileText, AlertTriangle } from "lucide-react";
import { getStats } from "@/utils/mockData";

type ChangeType = "positive" | "negative" | "neutral";

const DashboardStats = () => {
  const stats = getStats();

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <CircleDollarSign className="h-6 w-6 text-emerald-500" />,
      change: "+12.5% from last month",
      changeType: "positive" as ChangeType,
    },
    {
      title: "Pending Invoices",
      value: `${stats.invoicesByStatus.pending}`,
      subValue: `₹${stats.pendingRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <Clock className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "Overdue Invoices",
      value: `${stats.invoicesByStatus.overdue}`,
      subValue: `₹${stats.overdueRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Total Invoices",
      value: `${stats.totalInvoices}`,
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      change: "+2 from last week",
      changeType: "neutral" as ChangeType,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            {stat.subValue && (
              <p className="text-sm text-muted-foreground">{stat.subValue}</p>
            )}
            {stat.change && (
              <p className={`text-xs ${
                stat.changeType === "positive" ? "text-emerald-500" : 
                stat.changeType === "negative" ? "text-red-500" : "text-muted-foreground"
              }`}>
                {stat.change}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;

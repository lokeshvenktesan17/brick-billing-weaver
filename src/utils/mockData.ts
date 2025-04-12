
import { format } from "date-fns";

// Types
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  company: string;
  outstandingAmount: number;
  totalBilled: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  unit: string;
  inStock: number;
  category: string;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  client: Client;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  notes?: string;
}

// Mock Data
export const clients: Client[] = [
  {
    id: "c1",
    name: "Textile Traders Ltd",
    email: "contact@textiletraders.com",
    phone: "555-123-4567",
    address: "123 Fabric Ave, Textile District",
    company: "Textile Traders Ltd",
    outstandingAmount: 2450,
    totalBilled: 15750
  },
  {
    id: "c2",
    name: "Fashion Fabrics Inc",
    email: "orders@fashionfabrics.com",
    phone: "555-987-6543",
    address: "456 Cotton Road, Design Quarter",
    company: "Fashion Fabrics Inc",
    outstandingAmount: 0,
    totalBilled: 8900
  },
  {
    id: "c3",
    name: "Linen & Co.",
    email: "info@linenco.com",
    phone: "555-456-7890",
    address: "789 Thread Street, Material Park",
    company: "Linen & Co.",
    outstandingAmount: 1230,
    totalBilled: 4560
  },
  {
    id: "c4",
    name: "Silk Solutions",
    email: "sales@silksolutions.com",
    phone: "555-789-0123",
    address: "321 Weaver Lane, Textile Town",
    company: "Silk Solutions",
    outstandingAmount: 3800,
    totalBilled: 12400
  }
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Cotton",
    description: "High-quality cotton fabric, 300 thread count",
    sku: "COT-300",
    price: 12.99,
    unit: "yard",
    inStock: 500,
    category: "Natural Fibers"
  },
  {
    id: "p2",
    name: "Silk Charmeuse",
    description: "Luxurious silk charmeuse fabric",
    sku: "SLK-CHR",
    price: 24.99,
    unit: "yard",
    inStock: 200,
    category: "Luxury Fabrics"
  },
  {
    id: "p3",
    name: "Denim",
    description: "Heavy-duty denim fabric",
    sku: "DNM-002",
    price: 9.99,
    unit: "yard",
    inStock: 800,
    category: "Durable Fabrics"
  },
  {
    id: "p4",
    name: "Linen Blend",
    description: "Linen and cotton blend",
    sku: "LIN-BLD",
    price: 15.50,
    unit: "yard",
    inStock: 350,
    category: "Natural Fibers"
  },
  {
    id: "p5",
    name: "Polyester Blend",
    description: "Polyester and cotton blend",
    sku: "PLY-BLD",
    price: 7.99,
    unit: "yard",
    inStock: 1200,
    category: "Synthetic Blends"
  }
];

export const invoices: Invoice[] = [
  {
    id: "i1",
    clientId: "c1",
    client: clients.find(c => c.id === "c1") as Client,
    invoiceNumber: "INV-2023-001",
    date: format(new Date(2023, 3, 15), "yyyy-MM-dd"),
    dueDate: format(new Date(2023, 4, 15), "yyyy-MM-dd"),
    items: [
      {
        id: "item1",
        productId: "p1",
        description: "Premium Cotton",
        quantity: 100,
        unitPrice: 12.99,
        total: 1299
      },
      {
        id: "item2",
        productId: "p4",
        description: "Linen Blend",
        quantity: 50,
        unitPrice: 15.50,
        total: 775
      }
    ],
    subtotal: 2074,
    tax: 207.4,
    total: 2281.4,
    status: "paid"
  },
  {
    id: "i2",
    clientId: "c2",
    client: clients.find(c => c.id === "c2") as Client,
    invoiceNumber: "INV-2023-002",
    date: format(new Date(2023, 3, 20), "yyyy-MM-dd"),
    dueDate: format(new Date(2023, 4, 20), "yyyy-MM-dd"),
    items: [
      {
        id: "item3",
        productId: "p2",
        description: "Silk Charmeuse",
        quantity: 75,
        unitPrice: 24.99,
        total: 1874.25
      }
    ],
    subtotal: 1874.25,
    tax: 187.43,
    total: 2061.68,
    status: "paid"
  },
  {
    id: "i3",
    clientId: "c1",
    client: clients.find(c => c.id === "c1") as Client,
    invoiceNumber: "INV-2023-003",
    date: format(new Date(2023, 5, 10), "yyyy-MM-dd"),
    dueDate: format(new Date(2023, 6, 10), "yyyy-MM-dd"),
    items: [
      {
        id: "item4",
        productId: "p3",
        description: "Denim",
        quantity: 200,
        unitPrice: 9.99,
        total: 1998
      },
      {
        id: "item5",
        productId: "p5",
        description: "Polyester Blend",
        quantity: 100,
        unitPrice: 7.99,
        total: 799
      }
    ],
    subtotal: 2797,
    tax: 279.7,
    total: 3076.7,
    status: "pending"
  },
  {
    id: "i4",
    clientId: "c4",
    client: clients.find(c => c.id === "c4") as Client,
    invoiceNumber: "INV-2023-004",
    date: format(new Date(2023, 4, 5), "yyyy-MM-dd"),
    dueDate: format(new Date(2023, 5, 5), "yyyy-MM-dd"),
    items: [
      {
        id: "item6",
        productId: "p2",
        description: "Silk Charmeuse",
        quantity: 150,
        unitPrice: 24.99,
        total: 3748.5
      }
    ],
    subtotal: 3748.5,
    tax: 374.85,
    total: 4123.35,
    status: "overdue"
  }
];

export function getStats() {
  const totalRevenue = invoices.reduce((sum, invoice) => 
    invoice.status === 'paid' ? sum + invoice.total : sum, 0);
  
  const pendingRevenue = invoices.reduce((sum, invoice) => 
    invoice.status === 'pending' ? sum + invoice.total : sum, 0);
  
  const overdueRevenue = invoices.reduce((sum, invoice) => 
    invoice.status === 'overdue' ? sum + invoice.total : sum, 0);
  
  const totalInvoices = invoices.length;
  
  const invoicesByStatus = {
    paid: invoices.filter(invoice => invoice.status === 'paid').length,
    pending: invoices.filter(invoice => invoice.status === 'pending').length,
    overdue: invoices.filter(invoice => invoice.status === 'overdue').length,
  };
  
  return {
    totalRevenue,
    pendingRevenue,
    overdueRevenue,
    totalInvoices,
    invoicesByStatus
  };
}

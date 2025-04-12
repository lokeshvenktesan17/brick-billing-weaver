
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import { Input } from "@/components/ui/input";
import { products as mockProducts } from "@/utils/mockData";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CreateProductForm from "@/components/ProductForm/CreateProductForm";
import { Product } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts);
  const { toast } = useToast();

  const handleCreateProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    toast({
      title: "Product Created",
      description: "Product has been successfully added.",
    });
    setIsCreateProductOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-muted-foreground">Manage your textile products and inventory.</p>
          </div>
          <Button 
            className="bg-textile-600 hover:bg-textile-700"
            onClick={() => setIsCreateProductOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
        
        <Card className="mb-8 p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search products..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Categories</Button>
            </div>
          </div>
        </Card>
        
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>In Stock</TableHead>
                <TableHead>Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>${product.price.toFixed(2)} / {product.unit}</TableCell>
                  <TableCell>
                    {product.inStock} {product.unit}s
                    {product.inStock < 100 && (
                      <Badge variant="outline" className="ml-2 text-amber-600 border-amber-600">
                        Low Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <CreateProductForm
          open={isCreateProductOpen}
          onClose={() => setIsCreateProductOpen(false)}
          onCreateProduct={handleCreateProduct}
        />
      </main>
    </div>
  );
};

export default Products;

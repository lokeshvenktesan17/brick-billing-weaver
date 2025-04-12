
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Pencil, Trash2 } from "lucide-react";
import Navbar from "@/components/Layout/Navbar";
import { Input } from "@/components/ui/input";
import { products as mockProducts } from "@/utils/mockData";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import CreateProductForm from "@/components/ProductForm/CreateProductForm";
import EditProductForm from "@/components/ProductForm/EditProductForm";
import { Product } from "@/utils/mockData";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Exchange rate: $1 = ₹75 (approximation)
const EXCHANGE_RATE = 75;

const Products = () => {
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const handleCreateProduct = (newProduct: Product) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
    toast({
      title: "Product Created",
      description: "Product has been successfully added.",
    });
    setIsCreateProductOpen(false);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    toast({
      title: "Product Updated",
      description: "Product has been successfully updated.",
    });
    setIsEditProductOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== selectedProduct.id)
      );
      toast({
        title: "Product Deleted",
        description: "Product has been successfully removed.",
      });
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsEditProductOpen(true);
  };

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>₹{(product.price * EXCHANGE_RATE).toFixed(2)} / {product.unit}</TableCell>
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
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openEditDialog(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => openDeleteDialog(product)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
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
        
        {selectedProduct && (
          <EditProductForm
            open={isEditProductOpen}
            product={selectedProduct}
            onClose={() => {
              setIsEditProductOpen(false);
              setSelectedProduct(null);
            }}
            onUpdateProduct={handleEditProduct}
          />
        )}

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product
                "{selectedProduct?.name}" from your database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSelectedProduct(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteProduct} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
};

export default Products;

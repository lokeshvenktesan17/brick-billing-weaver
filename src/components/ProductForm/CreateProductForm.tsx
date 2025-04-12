
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/utils/mockData";

interface CreateProductFormProps {
  open: boolean;
  onClose: () => void;
  onCreateProduct: (product: Product) => void;
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ 
  open, 
  onClose, 
  onCreateProduct 
}) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("yard");
  const [inStock, setInStock] = useState("");
  const [category, setCategory] = useState("");
  
  const categories = [
    "Natural Fibers", 
    "Synthetic Blends", 
    "Luxury Fabrics", 
    "Durable Fabrics", 
    "Cotton Blends",
    "Other"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !price || !inStock) {
      toast({
        title: "Error",
        description: "Name, price, and stock quantity are required fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate numeric values
    const priceValue = parseFloat(price);
    const stockValue = parseInt(inStock);
    
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "Error",
        description: "Price must be a positive number.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(stockValue) || stockValue < 0) {
      toast({
        title: "Error",
        description: "Stock quantity must be a non-negative integer.",
        variant: "destructive"
      });
      return;
    }

    // Generate unique SKU if not provided
    const productSku = sku || generateSku(name, category);

    // Create new product
    const newProduct: Product = {
      id: `p${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      name,
      description,
      sku: productSku,
      price: priceValue,
      unit,
      inStock: stockValue,
      category: category || "Other"
    };

    // Call the parent component's handler
    onCreateProduct(newProduct);
    toast({
      title: "Product Created",
      description: "New product has been successfully added.",
    });
    
    // Reset form and close
    resetForm();
    onClose();
  };

  const generateSku = (productName: string, productCategory: string) => {
    const namePrefix = productName.substring(0, 3).toUpperCase();
    const catPrefix = productCategory ? productCategory.substring(0, 3).toUpperCase() : "OTH";
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${namePrefix}-${catPrefix}-${randomNum}`;
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setSku("");
    setPrice("");
    setUnit("yard");
    setInStock("");
    setCategory("");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader className="mb-6">
            <SheetTitle>Add New Product</SheetTitle>
            <SheetDescription>
              Fill in the product details. Required fields are marked with an asterisk (*).
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input 
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input 
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yard">Yard</SelectItem>
                    <SelectItem value="meter">Meter</SelectItem>
                    <SelectItem value="roll">Roll</SelectItem>
                    <SelectItem value="piece">Piece</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <Input 
                id="sku"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="Product SKU (generated if left blank)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inStock">In Stock *</Label>
              <Input 
                id="inStock"
                value={inStock}
                onChange={(e) => setInStock(e.target.value)}
                placeholder="Enter quantity"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <SheetFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Product</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateProductForm;

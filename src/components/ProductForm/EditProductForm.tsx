
import React, { useState, useEffect } from "react";
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

// Exchange rate: $1 = ₹75 (approximation)
const EXCHANGE_RATE = 75;

interface EditProductFormProps {
  open: boolean;
  product: Product;
  onClose: () => void;
  onUpdateProduct: (product: Product) => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ 
  open, 
  product,
  onClose, 
  onUpdateProduct 
}) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("meter");
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

  // Initialize form with product data
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setSku(product.sku);
      // Convert price to rupees for display
      setPrice(((product.price * EXCHANGE_RATE)).toFixed(2));
      setUnit(product.unit);
      setInStock(String(product.inStock));
      setCategory(product.category);
    }
  }, [product]);

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
    // Convert price from rupees to dollars when saving
    const priceValue = parseFloat(price) / EXCHANGE_RATE;
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

    // Update product
    const updatedProduct: Product = {
      ...product,
      name,
      description,
      sku,
      price: priceValue,
      unit,
      inStock: stockValue,
      category: category || "Other"
    };

    // Call the parent component's handler
    onUpdateProduct(updatedProduct);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader className="mb-6">
            <SheetTitle>Edit Product</SheetTitle>
            <SheetDescription>
              Update the product details. Required fields are marked with an asterisk (*).
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
                <Label htmlFor="price">Price (₹) *</Label>
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
                    <SelectItem value="meter">Meter</SelectItem>
                    <SelectItem value="yard">Yard</SelectItem>
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
                placeholder="Product SKU"
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
            <Button type="submit">Save Changes</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditProductForm;

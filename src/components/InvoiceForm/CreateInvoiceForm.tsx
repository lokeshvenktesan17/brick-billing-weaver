
import React, { useState } from "react";
import { format } from "date-fns";
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
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { clients, products } from "@/utils/mockData";

interface CreateInvoiceFormProps {
  open: boolean;
  onClose: () => void;
}

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const [selectedClientId, setSelectedClientId] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([
    { id: "item1", productId: "", description: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);
  const [dueDate, setDueDate] = useState(
    format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
  );

  const handleAddItem = () => {
    setInvoiceItems([
      ...invoiceItems,
      {
        id: `item${invoiceItems.length + 1}`,
        productId: "",
        description: "",
        quantity: 1,
        unitPrice: 0,
        total: 0,
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = [...invoiceItems];
    newItems.splice(index, 1);
    setInvoiceItems(newItems);
  };

  const handleProductChange = (index: number, productId: string) => {
    const newItems = [...invoiceItems];
    const product = products.find((p) => p.id === productId);
    
    if (product) {
      newItems[index] = {
        ...newItems[index],
        productId,
        description: product.description,
        unitPrice: product.price,
        total: product.price * newItems[index].quantity,
      };
    }
    
    setInvoiceItems(newItems);
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newItems = [...invoiceItems];
    newItems[index] = {
      ...newItems[index],
      quantity,
      total: newItems[index].unitPrice * quantity,
    };
    setInvoiceItems(newItems);
  };

  const calculateSubtotal = () => {
    return invoiceItems.reduce((sum, item) => sum + item.total, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a success message
    toast({
      title: "Invoice Created",
      description: "Your invoice has been created successfully.",
    });
    
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full md:max-w-xl lg:max-w-2xl overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader className="mb-6">
            <SheetTitle>Create New Invoice</SheetTitle>
            <SheetDescription>
              Fill in the details to create a new invoice. Required fields are marked with an asterisk (*).
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Client Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Client *</Label>
                  <Select 
                    value={selectedClientId} 
                    onValueChange={setSelectedClientId}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Invoice Items</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddItem}
                >
                  <Plus className="mr-1 h-4 w-4" /> Add Item
                </Button>
              </div>

              {invoiceItems.map((item, index) => (
                <div key={item.id} className="space-y-4 p-4 bg-muted/40 rounded-md">
                  <div className="flex justify-between">
                    <h4 className="font-medium">Item {index + 1}</h4>
                    {invoiceItems.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`product-${index}`}>Product *</Label>
                      <Select
                        value={item.productId}
                        onValueChange={(value) => handleProductChange(index, value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name} (₹{product.price.toFixed(2)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${index}`}>Quantity *</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                  </div>
                  {item.description && (
                    <div className="space-y-2">
                      <Label htmlFor={`description-${index}`}>Description</Label>
                      <Input
                        id={`description-${index}`}
                        value={item.description}
                        readOnly
                      />
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span>Unit Price:</span>
                    <span>₹{item.unitPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-medium">
                    <span>Item Total:</span>
                    <span>₹{item.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Subtotal:</span>
                <span>₹{calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Tax (10%):</span>
                <span>₹{calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <SheetFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Invoice</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateInvoiceForm;

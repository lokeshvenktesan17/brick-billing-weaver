
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetFooter
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { Client } from "@/utils/mockData";

interface CreateClientFormProps {
  open: boolean;
  onClose: () => void;
  onCreateClient: (client: Client) => void;
}

const CreateClientForm: React.FC<CreateClientFormProps> = ({ 
  open, 
  onClose, 
  onCreateClient 
}) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Name and email are required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create new client
    const newClient: Client = {
      id: `c${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      name,
      email,
      phone,
      address,
      company,
      outstandingAmount: 0,
      totalBilled: 0
    };

    // Call the parent component's handler
    onCreateClient(newClient);
    toast({
      title: "Client Created",
      description: "New client has been successfully added.",
    });
    
    // Reset form and close
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setCompany("");
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <SheetHeader className="mb-6">
            <SheetTitle>Add New Client</SheetTitle>
            <SheetDescription>
              Fill in the client details. Required fields are marked with an asterisk (*).
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter client name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter client email"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
            </div>
          </div>

          <SheetFooter className="mt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Client</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CreateClientForm;

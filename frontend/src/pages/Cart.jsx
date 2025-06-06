import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

const cartItems = [
  {
    id: 1,
    name: "Cartoon Astronaut T-Shirt",
    price: 200,
    image: "/img/products/f1.jpg",
  },
  {
    id: 2,
    name: "Cartoon Astronaut T-Shirt",
    price: 2200,
    image: "/img/products/f2.jpg",
  },
  {
    id: 3,
    name: "Cartoon Astronaut T-Shirt",
    price: 2200,
    image: "/img/products/f3.jpg",
  },
];

function CartPage() {
  const [items, setItems] = useState(cartItems);
  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value) || 1 });
  };

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * quantities[item.id],
    0
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-10 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        <p className="text-muted-foreground">Review your selected items</p>
      </div>

      {/* Main Section: Cart Table + Sidebar */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Cart Table */}
        <div className="w-full lg:w-2/3">
          <Card className="overflow-x-auto shadow-lg">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-4">Remove</th>
                  <th className="p-4">Image</th>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                    <td className="p-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded"
                      />
                    </td>
                    <td className="p-4 font-medium">{item.name}</td>
                    <td className="p-4">Rs. {item.price}</td>
                    <td className="p-4">
                      <Input
                        type="number"
                        min={1}
                        value={quantities[item.id]}
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="w-20"
                      />
                    </td>
                    <td className="p-4">
                      Rs. {item.price * quantities[item.id]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Right: Coupon + Totals */}
        <div className="w-full lg:w-1/3">
          <Card className="p-6 space-y-4 shadow-lg">
            <h3 className="text-lg font-semibold">Cart Totals</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Rs. 200</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>Rs. {subtotal + 200}</span>
              </div>
            </div>
            <Button className="w-full">Proceed to Checkout</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

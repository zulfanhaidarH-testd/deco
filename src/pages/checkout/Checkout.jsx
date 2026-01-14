import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

// UI Components
import { Button } from '@/Components/ui/Button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';

// Icons
import { ShoppingCart, CreditCard, MapPin, User, Mail, QrCode, Minus, Plus, Trash2 } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    checkout,
  } = useCart();

  const [shippingCost] = useState(25000);

  const formatRupiah = (n) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(n);

  // ================= HANDLE CHECKOUT (FIXED) =================
  const handlePlaceOrder = async () => {
    const emailInput = document.getElementById('email');
    const email = emailInput?.value?.trim();

    if (!email) {
      alert('Mohon isi email terlebih dahulu.');
      return;
    }

    if (!cart || cart.length === 0) {
      alert('Keranjang kosong.');
      return;
    }

    try {
      // INI YANG BIKIN:
      // - revenue nambah
      // - stok berkurang
      // - cart ke-reset
      await checkout(email, cart);

      navigate('/order-success');
    } catch (err) {
      console.error(err);
      alert('Checkout gagal.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Checkout</h1>
        <p className="text-lg text-slate-500 mt-2">
          Please review your order and complete billing details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2">
                <MapPin /> Billing Details
              </CardTitle>
              <CardDescription>Complete your details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input placeholder="John" />
                </div>

                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input placeholder="Doe" />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+62 812 xxxx" />
                </div>
                </div>
<div className="space-y-6 pt-4 border-t border-slate-100">
<h3 className="font-semibold text-lg text-slate-900 flex items-center gap-2"><MapPin className="h-5 w-5 text-slate-400"/>Shipping Address</h3>
<div className="space-y-4">
<div className="space-y-2"><Label htmlFor="address">Street Address</Label><Input id="address" placeholder="Jl. Sudirman No. 123"/></div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="space-y-2"><Label htmlFor="city">City</Label><Input id="city" placeholder="Jakarta Selatan"/></div>
<div className="space-y-2"><Label htmlFor="state">State / Province</Label><Input id="state" placeholder="DKI Jakarta"/></div>
<div className="space-y-2"><Label htmlFor="zip">Zip Code</Label><Input id="zip" placeholder="12000"/></div>
</div>
<div className="space-y-2">
<Label htmlFor="country">Country</Label>
<Select>
<SelectTrigger>
<SelectValue placeholder="Select country" />
</SelectTrigger>
<SelectContent>
<SelectItem value="id">Indonesia</SelectItem>
<SelectItem value="sg">Singapore</SelectItem>
<SelectItem value="my">Malaysia</SelectItem>
</SelectContent>
</Select>
</div>
</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2">
                <CreditCard /> Payment Method
              </CardTitle>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="flex items-center border-2 border-primary bg-primary/5 rounded-lg p-4">
                <QrCode className="mr-3" /> QRIS / Bank Transfer
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5">
          <Card className=" top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart /> Your Order ({cart.length})
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img src={item.image} className="h-20 w-20 rounded object-cover" />

                  <div className="flex-1">
                    <h4 className="font-semibold">{item.name}</h4>

                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => decreaseQuantity(item.id)}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)}>
                        <Plus size={14} />
                      </button>
                      <button
                        className="ml-auto text-red-500"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <p className="text-right font-bold">
                      {formatRupiah(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatRupiah(cartTotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{formatRupiah(shippingCost)}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatRupiah(cartTotal + shippingCost)}</span>
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className='mb-4 p-4 bg-white rounded-xl shadow-sm'>
                <img src="/src/assets/qr.jpeg" alt="Furniture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
                <p className="text-sm  text-slate-500">
                  Scan QR to complete payment
                </p>
              </div>
              </div>
              <Button
                className="w-full h-14 text-lg font-bold"
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

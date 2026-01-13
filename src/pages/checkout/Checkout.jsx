import { useState, useEffect } from 'react';
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
  const { cart, cartTotal, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const [shippingCost] = useState(25000);
  
  const formatRupiah = (n) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  // Redirect jika cart kosong
  useEffect(() => { 
    if (cart.length === 0) navigate('/products'); 
  }, [cart.length, navigate]);

  return (
    // RENDER KONTEN SAJA (Tanpa Navbar/Footer/Wrap div Layout)
    <div className="container mx-auto px-6 py-10 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Checkout</h1>
        <p className="text-lg text-slate-500 mt-2">Please review your order and complete billing details.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: BILLING & SHIPPING */}
        <div className="lg:col-span-7 space-y-6">
          <Card>
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-2xl flex items-center gap-2"><MapPin className="h-6 w-6 text-primary"/>Billing Details</CardTitle>
              <CardDescription>Complete your details below to place your order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label htmlFor="firstName">First Name</Label><div className="relative"><User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input id="firstName" className="pl-10" placeholder="John"/></div></div>
                <div className="space-y-2"><Label htmlFor="lastName">Last Name</Label><Input id="lastName" placeholder="Doe"/></div>
                <div className="space-y-2"><Label htmlFor="email">Email Address</Label><div className="relative"><Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/><Input id="email" type="email" className="pl-10" placeholder="john@example.com"/></div></div>
                <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" placeholder="+62 812 3456 7890"/></div>
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
            <CardHeader className="border-b border-slate-100 pb-4"><CardTitle className="text-2xl flex items-center gap-2"><CreditCard className="h-6 w-6 text-primary"/>Payment Method</CardTitle></CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center border-2 border-primary bg-primary/5 rounded-lg p-4 w-full cursor-pointer">
                <input type="radio" name="payment" id="bank_transfer" className="h-4 w-4 text-primary" defaultChecked/>
                <label htmlFor="bank_transfer" className="text-sm font-medium ml-3 flex items-center gap-2 cursor-pointer"><QrCode className="h-5 w-5 text-primary"/>QRIS (Bank Transfer)</label>
              </div>
              <p className="text-sm text-muted-foreground pl-1">You will be redirected to complete your payment securely.</p>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="lg:col-span-5">
          <Card className="sticky top-24 shadow-lg">
            <CardHeader className="bg-slate-50 border-b border-slate-200"><CardTitle className="text-2xl flex items-center gap-2"><ShoppingCart className="h-6 w-6 text-primary"/>Your Order ({cart.length})</CardTitle></CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-slate-100">
                    <img src={item.image} alt={item.name} className="h-20 w-20 bg-slate-100 rounded-md object-cover"/>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between"><h4 className="font-medium text-slate-900">{item.name}</h4><span className="text-xs text-slate-500 uppercase">{item.category}</span></div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-white border border-slate-200 rounded-md p-1">
                          <button onClick={() => decreaseQuantity(item.id)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100 disabled:opacity-30" disabled={item.quantity <= 1}><Minus size={14}/></button>
                          <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)} className="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-100"><Plus size={14}/></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50"><Trash2 size={16}/></button>
                      </div>
                      <p className="text-right font-bold text-slate-900 text-sm">{formatRupiah(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-sm text-slate-600"><span>Subtotal</span><span>{formatRupiah(cartTotal)}</span></div>
                <div className="flex justify-between text-sm text-slate-600"><span>Shipping</span><span>{formatRupiah(shippingCost)}</span></div>
                <div className="flex justify-between text-lg font-bold text-slate-900 pt-4 border-t border-slate-200 mt-2"><span>Total</span><span className="text-primary">{formatRupiah(cartTotal + shippingCost)}</span></div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex flex-col items-center justify-center text-center">
                <div className="mb-4 p-4 bg-white rounded-xl shadow-sm"><div className="h-48 w-48 flex items-center justify-center bg-slate-900 text-white rounded-lg"><QrCode className="h-32 w-32 opacity-90"/></div></div>
                <div><h4 className="font-semibold text-slate-900 text-lg">Scan to Pay</h4><p className="text-xs text-slate-500 mt-2">Use your banking app to scan this QR code to complete your payment securely.</p></div>
                <div className="mt-4 w-full bg-white p-3 rounded-lg border border-slate-200 flex items-center gap-3 text-sm text-slate-600 shadow-sm"><ShoppingCart className="h-4 w-4 text-primary"/><span className="text-xs font-mono text-slate-500">Ref: <span className="font-bold text-slate-900">DEC-88219-X</span></span></div>
              </div>
              <Button className="w-full h-14 text-lg font-bold shadow-md">Place Order</Button>
              <p className="text-center text-xs text-slate-400 mt-4">By placing this order, you agree to our Terms & Conditions.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
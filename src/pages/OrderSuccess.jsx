import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {Card,CardDescription,CardFooter,CardHeader,CardTitle,}
from "@/components/ui/card";
import { Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrderSuccess() {
const navigate = useNavigate();



return (
<div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in zoom-in duration-500">
<Card className="w-full max-w-sm">
<CardHeader>
<CardTitle>ORDER SUCCESS</CardTitle>
<CardDescription>
Your order has been placed successfully.
</CardDescription>
</CardHeader>

<CardFooter className="flex-col gap-2">
<div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
<Button
onClick={() => navigate("/products")}
className="w-full h-12 text-base font-medium"
>
Continue Shopping
</Button>
<Button
variant="outline"
onClick={() => navigate("/")} // Ke Homepage
className="w-full h-12 text-base font-medium border-slate-300 hover:bg-slate-50"
>

Back to Home
</Button>
</div>
</CardFooter>
</Card>
</div>
);
}

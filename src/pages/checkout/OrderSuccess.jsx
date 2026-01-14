import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OrderSuccess() {
  const navigate = useNavigate();

  // ================= WHATSAPP HANDLER =================
  const handleWhatsapp = () => {
    const phoneNumber = "6281310965401"; // GANTI NOMOR ADMIN
    const message = encodeURIComponent(
      "Halo Admin, saya ingin konfirmasi pembelian dan cek status pengiriman pesanan saya."
    );

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-in fade-in zoom-in duration-500">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>ORDER SUCCESS</CardTitle>
          <CardDescription>
            Your order has been placed successfully.
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex-col gap-3">
          {/* 🔹 TOMBOL BARU WHATSAPP */}
          <Button
            onClick={handleWhatsapp}
            className="w-full h-12 text-base font-medium bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
          >
            <MessageCircle size={18} />
            Confirm via WhatsApp
          </Button>

          {/* 🔹 TOMBOL LAMA (TIDAK DIUBAH) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="w-full h-12 text-base font-medium bg-slate-600 hover:bg-slate-700 text-white flex items-center justify-center gap-2"
            >
              Back to Home
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

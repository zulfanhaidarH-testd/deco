// import { Button } from '../../Components/ui/Button'; // Hapus
import { Button } from '@/Components/ui/button'; // Import shadcn
import { ArrowRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="container mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 w-full lg:w-1/2 text-center lg:text-left">
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-sky-50 text-sky-600 rounded-full text-xs font-bold tracking-wider uppercase mb-2 border border-sky-100">
              New Arrival 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Design<br />for Comfort<br />
              <span className="text-slate-400 relative inline-block">
                Built to Last
                <span className="absolute bottom-2 left-0 w-full h-4 bg-yellow-200 -z-10 -rotate-1 rounded-sm"></span>
              </span>
            </h1>
            <p className="text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Jelajahi koleksi furnitur minimalis yang dirancang untuk menciptakan kedamaian.
            </p>
            <div className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start">
              {/* shadcn variant="default" */}
              <Button className="rounded-none">Shop now</Button>
              
              {/* shadcn variant="outline" */}
              <Button variant="outline" className="flex items-center gap-2">
                Explore yours <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full lg:w-1/2">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[500px] w-full">
            {/* Gambar tetap sama */}
            <div className="row-span-2 rounded-3xl overflow-hidden shadow-lg relative group">
              <img src="https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Furniture" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg relative group">
              <img src="https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Plant" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg relative group">
              <img src="https://images.unsplash.com/photo-1603376728541-6e1906a300e6?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Lamp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
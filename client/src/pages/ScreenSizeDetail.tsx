import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Laptop {
  id: number;
  brand: string;
  model: string;
  processor: string;
  os: string;
  screen_size: number;
  touch_screen: string;
  price: number;
  storage_mb: number | null;
  ram_gb: number;
  slug: string;
}

export default function ScreenSizeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState("");

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const response = await fetch("/data/all-laptops.json");
        const data = await response.json();
        
        const filtered = data.filter((laptop: Laptop) => {
          const laptopSizeSlug = laptop.screen_size
            .toString()
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
          return laptopSizeSlug === slug;
        });
        
        if (filtered.length > 0) {
          setScreenSize(filtered[0].screen_size.toString());
        }
        
        setLaptops(filtered);
      } catch (error) {
        console.error("Error loading laptops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptops();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/screen-sizes">
            <a>
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a Tamaños de Pantalla
              </Button>
            </a>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Laptops con Pantalla de {screenSize} cm</h1>
          <p className="mt-2 text-slate-600">Se encontraron {laptops.length} modelos</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {laptops.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No se encontraron laptops con este tamaño de pantalla.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {laptops.map((laptop) => (
              <Card key={laptop.id} className="hover:shadow-lg transition-shadow border-0">
                <CardHeader>
                  <CardTitle className="text-lg">{laptop.brand} {laptop.model}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Procesador:</span>
                      <span className="font-medium">{laptop.processor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Sistema Operativo:</span>
                      <span className="font-medium">{laptop.os}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">RAM:</span>
                      <span className="font-medium">{laptop.ram_gb} GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Almacenamiento:</span>
                      <span className="font-medium">
                        {laptop.storage_mb ? `${laptop.storage_mb} MB` : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Pantalla Táctil:</span>
                      <span className="font-medium">{laptop.touch_screen}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Precio:</span>
                      <span className="text-2xl font-bold text-blue-600">${laptop.price.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

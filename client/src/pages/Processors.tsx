import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

interface Processor {
  name: string;
  slug: string;
}

export default function Processors() {
  const [processors, setProcessors] = useState<Processor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProcessors = async () => {
      try {
        const response = await fetch("/data/processors.json");
        const data = await response.json();
        setProcessors(data.processors);
      } catch (error) {
        console.error("Error loading processors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProcessors();
  }, []);

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
          <Link href="/">
            <a>
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </a>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Laptops por Procesador</h1>
          <p className="mt-2 text-slate-600">Selecciona un procesador para ver todos los modelos disponibles</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {processors.map((processor) => (
            <Link key={processor.slug} href={`/processors/${processor.slug}`}>
              <a className="block">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-0">
                  <CardHeader>
                    <CardTitle className="text-lg text-center text-sm">{processor.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-slate-600">Ver modelos →</p>
                  </CardContent>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

import { Link } from "wouter";
import { APP_TITLE } from "@/const";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Laptop, Tag, Cpu, Monitor, Zap } from "lucide-react";

export default function Home() {
  const categories = [
    {
      title: "Por Marca",
      description: "Explora laptops organizadas por fabricante",
      icon: Tag,
      href: "/brands",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Por Sistema Operativo",
      description: "Encuentra laptops según su sistema operativo",
      icon: Zap,
      href: "/operating-systems",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Por Tamaño de Pantalla",
      description: "Busca por tamaño de pantalla preferido",
      icon: Monitor,
      href: "/screen-sizes",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Por Procesador",
      description: "Filtra según el tipo de procesador",
      icon: Cpu,
      href: "/processors",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Laptop className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-slate-900">{APP_TITLE}</h1>
          </div>
          <p className="mt-2 text-slate-600">Explora nuestro catálogo completo de laptops</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.href} href={category.href}>
                <a className="block h-full">
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-0 overflow-hidden">
                    <div className={`h-32 bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                      <Icon className="w-16 h-16 text-white opacity-80" />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-slate-600">Haz clic para explorar →</p>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-white rounded-lg shadow p-6 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre nuestro catálogo</h2>
          <p className="text-slate-600 mb-4">
            Contamos con un amplio catálogo de más de 800 laptops de las mejores marcas del mercado. 
            Puedes explorar nuestros productos de múltiples formas para encontrar exactamente lo que buscas.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">837+</p>
              <p className="text-sm text-slate-600">Laptops</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">20+</p>
              <p className="text-sm text-slate-600">Marcas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">5+</p>
              <p className="text-sm text-slate-600">Sistemas Operativos</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">30+</p>
              <p className="text-sm text-slate-600">Procesadores</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

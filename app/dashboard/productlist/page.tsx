import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { column,  Product } from "./columns";
import { DataTable } from "./data-table";
import { db } from "@/lib/db";


async function getData(): Promise<Product[]> {
  // Fetch data from your API here.

  const data = await db.query("SELECT products.id, name, price, image_path, category, image_path, disponible AS stock, 4 AS rating FROM products JOIN categories ON category_id[array_length(category_id, 1)] = categories.id;")
  return data.rows as Product[];

}

const Page = async () => {
  const data = await getData();
  return (
    <div className="flex flex-col gap-3 px-4">
      <header className="flex px-2 justify-between items-center ">
        <h3 className="h3">Produits</h3>
        <Button>
          <PlusCircle />
          Ajouter Produit
        </Button>
      </header>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-0 gap-0">
          <CardHeader className="flex flex-row justify-between items-center px-6 pb-2">
            <CardTitle>Vente totales</CardTitle>
            <Badge variant="secondary">+10%</Badge>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$3000</h2>
          </CardContent>
        </Card>
        <Card className="p-0 gap-0">
          <CardHeader className="flex flex-row justify-between items-center px-6 pb-2">
            <CardTitle>Vente totales</CardTitle>
            <Badge variant="secondary">+10%</Badge>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$3000</h2>
          </CardContent>
        </Card>
        <Card className="p-0 gap-0">
          <CardHeader className="flex flex-row justify-between items-center px-6 pb-2">
            <CardTitle>Vente totales</CardTitle>
            <Badge variant="secondary">+10%</Badge>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$3000</h2>
          </CardContent>
        </Card>
        <Card className="p-0 gap-0">
          <CardHeader className="flex flex-row justify-between items-center px-6 pb-2">
            <CardTitle>Vente totales</CardTitle>
            <Badge variant="secondary">+10%</Badge>
          </CardHeader>
          <CardContent>
            <h2 className="text-3xl">$3000</h2>
          </CardContent>
        </Card>
      </section>
      <div className="">
        <DataTable columns={column} data={data} />
      </div>
    </div>
  );
};

export default Page;

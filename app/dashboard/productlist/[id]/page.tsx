import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import {
  CircleDollarSign,
  LucideLayers2,
  Pencil,
  Star,
  Trash,
} from "lucide-react";
import Image from "next/image";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  let res = await db.query(
    "SELECT * FROM (SELECT * FROM products WHERE id = $1) a JOIN accounts b ON a.supplier_id = b.id JOIN user_profiles u ON b.id = u.account_id;",
    [id]
  );

  if (!res.rows[0]) {
    return (
      <section className="flex h-screen h1 text-center items-center justify-center -translate-y-1/2">
        Aucune donnée trouvée
      </section>
    );
  }
  const value = res.rows[0];


  res = await db.query("SELECT * FROM favorites WHERE product_id = $1", [
    id,
  ]);
  const stars = res.rowCount;

  res = await db.query("SELECT * FROM income_per_product WHERE id = $1;", [id]);
  const row = res.rows[0];



  return (
    <section className="flex flex-col gap-4 px-4">
      <header className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="h2">{value.name}</h2>
          <p>
            <span className="font-bold">Vendeur: </span>
            {value.lastname} <span className="font-bold">Publié le :</span> 20
            Oct, 2024
          </p>
        </div>
        <div className="flex flex-row gap-3">
          <Button>
            <Pencil /> Editer
          </Button>
          <Button variant="destructive">
            <Trash />
          </Button>
        </div>
      </header>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="py-6 px-2 flex items-center justify-center min-h-[300px]">
          <Image
            src={value.image_path}
            alt="productImage"
            width={500}
            height={500}
            className="h-auto w-auto rounded-md"
          />
        </Card>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="hover:border-primary/30 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-lg border p-4">
              <CircleDollarSign width={24} height={24} className="opacity-40" />
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">Prix</span>
                <span className="text-lg font-semibold">€{value.price}</span>
              </div>
            </Card>
            <Card className="hover:border-primary/30 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-lg border p-4">
              <LucideLayers2 width={24} height={24} className="opacity-40" />
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">Stock</span>
                <span className="text-lg font-semibold">
                  {value.disponible}
                </span>
              </div>
            </Card>
            <Card className="hover:border-primary/30 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-lg border p-4">
              <CircleDollarSign width={24} height={24} className="opacity-40" />
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">
                  No. Commandes
                </span>
                <span className="text-lg font-semibold">{row.sum}</span>
              </div>
            </Card>
            <Card className="hover:border-primary/30 bg-muted grid auto-cols-max grid-flow-col gap-4 rounded-lg border p-4">
              <CircleDollarSign width={24} height={24} className="opacity-40" />
              <div className="flex flex-col gap-1">
                <span className="text-muted-foreground text-sm">
                  Revenu total
                </span>
                <span className="text-lg font-semibold">€{row.revenu}</span>
              </div>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="h2">Description</CardTitle>
              <CardDescription className="flex flex-col gap-4 pt-4">
                {Object.entries(value.description).map(([key, value]) => {
                  return (
                    <div key={key}>
                      <span className="font-bold">{key}</span>
                      {": "}
                      <span>{value as string}</span>
                    </div>
                  );
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row w-full items-center justify-center">
              <div className="flex flex-row gap-4 items-center justify-center">
                <Star width={54} height={54} fill="orange" stroke="orange" />
                <span className="text-5xl font-medium text-gray-800">{stars as number}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default page;

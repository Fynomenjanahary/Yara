import image from "@/public/assets/images/avatar.png";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";

const latestTransactions = [
  {
    id: 1,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 1400,
  },
  {
    id: 2,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 100,
  },
  {
    id: 3,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 1200,
  },
  {
    id: 4,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 1400,
  },
  {
    id: 5,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 1400,
  },
];

const popularContent = [
  {
    id: 1,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 1400,
  },
  {
    id: 2,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 100,
  },
  {
    id: 3,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 1200,
  },
  {
    id: 4,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 1400,
  },
  {
    id: 6,
    title: "Subscription Renewal",
    badge: "John Doe",
    image,
    count: 1400,
  },
];

const CardList = ({ title }: { title: string }) => {
  const list =
    title === "Popular Content" ? popularContent : latestTransactions;
  return (
    <div>
      <h1 className="mb-6 text-lg font-medium">{title}</h1>
      <div className="flex flex-col gap-2">
        {list.map((item) => (
          <Card
            key={item.id}
            className="flex flex-row items-center justify-between gap-4 px-8 py-4"
          >
            <div className="relative size-12 overflow-hidden rounded-sm">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="font-medium">{item.title}</CardTitle>
              <Badge variant="secondary">{item.badge}</Badge>
            </CardContent>
            <CardFooter className="p-0">{item.count / 1000} K</CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardList;

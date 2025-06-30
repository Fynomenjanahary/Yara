import AuthCard from "@/components/AuthCard";

const Page = () => {
  return (
    <div className="flex w-screen flex-col gap-4 px-4">
      <h1 className="text-lg font-medium">Dashboard authentification</h1>
      <div className="flex w-full flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AuthCard />
          <AuthCard />
          <AuthCard />
          <AuthCard />
        </div>
      </div>
    </div>
  );
};

export default Page;

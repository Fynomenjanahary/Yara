import CardList from "@/components/cards/CardList";
import AppAreaChart from "@/components/charts/AppAreaChart";
import AppBarChart from "@/components/charts/AppBarChart";
import AppPieChart from "@/components/charts/AppPieChart";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-lg bg-primary-foreground p-4 lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="rounded-lg bg-primary-foreground p-4">
        <CardList title="Popular Content" />
      </div>
      <div className="rounded-lg bg-primary-foreground p-4">
        <AppPieChart />
      </div>
      <div className="rounded-lg bg-primary-foreground p-4">Test</div>
      <div className="rounded-lg bg-primary-foreground p-4 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
      <div className="rounded-lg bg-primary-foreground p-4">
        <CardList title="Latest Transactions" />
      </div>
    </div>
  );
};

export default Dashboard;

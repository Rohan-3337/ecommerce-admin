interface DashboardPageProps {
    params: {
        storeId: string,
    }
}
import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSaleCount } from "@/actions/get-sale-counts";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getStockCount } from "@/actions/get-total-stock-count";
import Heading from "@/components/Heading";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package } from "lucide-react";
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {

    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
        }
    })
    const totalRevenue = await getTotalRevenue(params.storeId);
    const salesCount = await getSaleCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphrevenue = await getGraphRevenue(params.storeId);
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Heading title="Dashboard" desc="Overview of your Store" />
                <Separator />
                <div className="grid gap-4 grid-cols-3">
                    <Card>
                    <CardHeader className=" flex flex-row items-center justify-between space-y-2">
                        <CardTitle className=" font-semibold text-sm">

                        Total Revenue
                        </CardTitle>
                        <DollarSign className=" h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatter.format(totalRevenue)}
                        </div>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className=" flex flex-row items-center justify-between space-y-2">
                        <CardTitle className=" font-semibold text-sm">

                        Sales
                        </CardTitle>
                        <CreditCard className=" h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            +{salesCount}  
                        </div>
                    </CardContent>
                    </Card>
                    <Card>
                    <CardHeader className=" flex flex-row items-center justify-between space-y-2">
                        <CardTitle className=" font-semibold text-sm">

                        Stock
                        </CardTitle>
                        <Package className=" h-4 w-4 text-muted-foreground"/>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stockCount}
                        </div>
                    </CardContent>
                    </Card>
                </div>
                <Card className=" col-span-4">
                    <CardHeader className=" text-md font-bold">
                        Overview
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphrevenue}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default DashboardPage;
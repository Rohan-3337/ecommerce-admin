import prisma from "@/lib/prismadb"

export const getTotalRevenue = async(storeId:string)=>{
    const paidOrders = await prisma.order.findMany({
        where:{
            storeId:storeId,
            ispaid:true,
        },
        include:{
            orderItems:{
                include:{
                    product:true,
                }
            }
        }
    });
    const totalrevenue = paidOrders.reduce((total,order)=>{
        const ordertotal = order.orderItems.reduce((ordersum,item)=>{
            return ordersum+ item.product.price.toNumber();
        },0);
        return total+ordertotal;
    },0);
    return totalrevenue;

}
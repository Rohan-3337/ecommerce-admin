import prisma from "@/lib/prismadb"

export const getSaleCount = async(storeId:string)=>{
    const saleCount = await prisma.order.count({
        where:{
            storeId:storeId,
            ispaid:true,
        }
    });
    return saleCount;
}
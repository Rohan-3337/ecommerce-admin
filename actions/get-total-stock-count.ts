import prisma from "@/lib/prismadb"

export const getStockCount = async(storeId:string)=>{
    const stockCount = await prisma.product.count({
        where:{
            storeId:storeId,
            
        }
    });
    return stockCount;
}
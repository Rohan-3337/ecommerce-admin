
import prisma from "@/lib/prismadb"
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";
import {format} from "date-fns"
import { formatter } from "@/lib/utils";

const OrderPages = async({params}:{params:{storeId:string}}) =>{
    const Orders = await prisma.order.findMany({
        where:{
            storeId:params.storeId
        },
        include:{
            orderItems:{
                include:{
                    product:true,
                }
            }
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    const formatedOrders:OrderColumn[] =Orders.map((item)=>({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        ispaid: item.ispaid,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))
    return (
        <>
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formatedOrders}/>
            </div>
        </div>
        </>
    )
}

export default OrderPages;
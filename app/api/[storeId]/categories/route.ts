import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

export async function GET(req: Request, {params}:{params:{storeId:string}}){
    try {
        // const {userId} = auth();
        
        // if(!userId) return new NextResponse("Unuthorized",{status: 401});
       
        if(!params.storeId) return new NextResponse("Store Id is required",{status:400});
        // const storebyUserId = await prisma.store.findFirst({
        //     where:{
        //         id: params.storeId,
        //         userId
        //     }
        // })
        // if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});
        const categories = await prisma.category.findMany({
            where:{
                storeId: params?.storeId,
            }
        })
        return NextResponse.json(categories);
        
    } catch (error) {
        console.error("[CATEGORY_GET]",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}


export async function POST(req: Request, {params}:{params:{storeId:string}}){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {name,billboardId} = body;
        if(!userId) return new NextResponse("Unuthorized",{status: 401});
        if(!name) return new NextResponse("name is required",{status:400});
        if(!billboardId) return new NextResponse("image Url is required",{status:400});
        if(!params.storeId) return new NextResponse("Store Id is required",{status:400});
         
        const category = await prisma.category.create({
            data:{
                name:name,
                billboardId:billboardId,
                storeId:params.storeId
            }
        })
        return NextResponse.json(category);
        
    } catch (error) {
        console.error("[CATEGORY_POST]",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}
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
        const billboards = await prisma.billboard.findMany({
            where:{
                storeId: params?.storeId,
            }
        })
        return NextResponse.json(billboards);
        
    } catch (error) {
        console.error("[BILLBOARD_POST]",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}


export async function POST(req: Request, {params}:{params:{storeId:string}}){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {label,imageUrl} = body;
        if(!userId) return new NextResponse("Unuthorized",{status: 401});
        if(!label) return new NextResponse("label is required",{status:400});
        if(!imageUrl) return new NextResponse("image Url is required",{status:400});
        if(!params.storeId) return new NextResponse("Store Id is required",{status:400});
         
        const billboard = await prisma.billboard.create({
            data:{
                label:label,
                imageUrl:imageUrl,
                storeId:params.storeId
            }
        })
        return NextResponse.json(billboard);
        
    } catch (error) {
        console.error("[BILLBOARD_GET]",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}
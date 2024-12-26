import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
export async function PATCH(req: Request, {params}:{params:{storeId:string}}){

    try {
        const {userId} =auth();
        const body = await req.json();
        const {name} = body;
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        if(!name){
            return new NextResponse("name is Missing",{status:400});

        }
        if(!params.storeId){
            return new NextResponse("storeId is Missing",{status:400});

        }
        const updateStore = await prisma.store.updateMany({
            where:{
                id: params.storeId,
                userId,
            },
            data:{
                name,
            }
        });

        return NextResponse.json(updateStore);



    } catch (error) {
        console.log("[StoreId_PATCH]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}


export async function DELETE(req: Request, {params}:{params:{storeId:string}}){

    try {
        const {userId} =auth();
       
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        
        if(!params.storeId){
            return new NextResponse("storeId is Missing",{status:400});

        }
        const deleteStore = await prisma.store.delete({
            where:{
                id: params.storeId,
                userId,
            },
            
        });

        return NextResponse.json(deleteStore);



    } catch (error) {
        console.log("[StoreId_PATCH]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}
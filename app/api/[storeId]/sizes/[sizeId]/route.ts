import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req: Request, {params}:{params:{storeId:string,sizeId:string}}){

    try {
        
        
        const size = await prisma.size.findFirst({
            where:{
                id: params.sizeId,
                
            },
            
        });

        return NextResponse.json(size);



    } catch (error) {
        console.log("[size_GET]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}
export async function PATCH(req: Request, {params}:{params:{storeId:string,sizeId:string}}){

    try {
        const {userId} =auth();
        const body = await req.json();
        const {name,value} = body;
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        if(!name){
            return new NextResponse("name is Missing",{status:400});

        }
        if(!value){
            return new NextResponse("Value is Missing",{status:400});

        }
        if(!params.sizeId){
            return new NextResponse("sizeId is Missing",{status:400});

        }
        const storebyUserId = await prisma.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});

        const size = await prisma.size.updateMany({
            where:{
                id: params.sizeId,
                
            },
            data:{
                name,
                value
            }
        });

        return NextResponse.json(size);



    } catch (error) {
        console.log("[sizeId_PATCH]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}


export async function DELETE(req: Request, {params}:{params:{storeId:string,sizeId:string}}){

    try {
        const {userId} =auth();
       
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        
        if(!params.sizeId){
            return new NextResponse("sizeId is Missing",{status:400});

        }
        const storebyUserId = await prisma.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});
        const size = await prisma.size.delete({
            where:{
                id: params.sizeId,
                
            },
            
        });

        return NextResponse.json(size);



    } catch (error) {
        console.log("[size_DELETE]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}
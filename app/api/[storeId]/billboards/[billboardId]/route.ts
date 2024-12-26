import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req: Request, {params}:{params:{storeId:string,billboardId:string}}){

    try {
        
        
        const billboard = await prisma.billboard.findFirst({
            where:{
                id: params.billboardId,
                
            },
            
        });

        return NextResponse.json(billboard);



    } catch (error) {
        console.log("[BillBoard_GET]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}
export async function PATCH(req: Request, {params}:{params:{storeId:string,billboardId:string}}){

    try {
        const {userId} =auth();
        const body = await req.json();
        const {label,imageUrl} = body;
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        if(!label){
            return new NextResponse("label is Missing",{status:400});

        }
        if(!imageUrl){
            return new NextResponse("image Url is Missing",{status:400});

        }
        if(!params.billboardId){
            return new NextResponse("billboardId is Missing",{status:400});

        }
        const storebyUserId = await prisma.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});

        const billboard = await prisma.billboard.updateMany({
            where:{
                id: params.billboardId,
                
            },
            data:{
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard);



    } catch (error) {
        console.log("[BILLBOARDId_PATCH]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}


export async function DELETE(req: Request, {params}:{params:{storeId:string,billboardId:string}}){

    try {
        const {userId} =auth();
       
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        
        if(!params.billboardId){
            return new NextResponse("billboardId is Missing",{status:400});

        }
        const storebyUserId = await prisma.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});
        const billboard = await prisma.billboard.delete({
            where:{
                id: params.billboardId,
                
            },
            
        });

        return NextResponse.json(billboard);



    } catch (error) {
        console.log("[BillBoard_DELETE]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}
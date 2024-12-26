import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";


export async function GET(req: Request, {params}:{params:{storeId:string,colorsId:string}}){

    try {
        
        
        const colors = await prisma.color.findFirst({
            where:{
                id: params.colorsId,
                
            },
            
        });

        return NextResponse.json(colors);



    } catch (error) {
        console.log("[colors_GET]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}
export async function PATCH(req: Request, {params}:{params:{storeId:string,colorsId:string}}){

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
        if(!params.colorsId){
            return new NextResponse("colorsId is Missing",{status:400});

        }
        const storebyUserId = await prisma.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});

        const colors = await prisma.color.updateMany({
            where:{
                id: params.colorsId,
                
            },
            data:{
                name,
                value
            }
        });

        return NextResponse.json(colors);



    } catch (error) {
        console.log("[colorsId_PATCH]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}


export async function DELETE(req: Request, {params}:{params:{storeId:string,colorsId:string}}){

    try {
        const {userId} =auth();
       
        if(!userId){
            return new NextResponse("UnAuthorized",{status:401});
        };
        
        if(!params.colorsId){
            return new NextResponse("colorsId is Missing",{status:400});

        }
        const storebyUserId = await prisma.store.findFirst({
            where:{
                id: params.storeId,
                userId
            }
        })
        if(!storebyUserId) return new NextResponse("Unauthorized",{status:403});
        const colors = await prisma.color.delete({
            where:{
                id: params.colorsId,
                
            },
            
        });

        return NextResponse.json(colors);



    } catch (error) {
        console.log("[colors_DELETE]",error);  
        return new NextResponse("Internal Error",{status:500})
    }
}
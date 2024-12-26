import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"

export async function POST(req: Request, res: Response){
    try {
        const {userId} = auth();
        const body = await req.json();
        const {name} = body;
        if(!userId) return new NextResponse("Unuthorized",{status: 401});
        if(!name) return new NextResponse("name is required",{status:400});
        const store = await prisma.store.create({
            data: {
                name,
                userId,
            },
        });
        return NextResponse.json(store);
        
    } catch (error) {
        console.error("[STORE_POST]",error);
        return new NextResponse("Internal Server Error",{status:500});
    }
}
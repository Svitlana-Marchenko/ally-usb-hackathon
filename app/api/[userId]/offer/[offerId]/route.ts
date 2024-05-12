import {database} from "@/lib/database";
import {NextResponse} from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string; offerId: string } }
) {

    try {
        const {userId, offerId} = params

        const request = await database.request.create({
            data:{
                userId,
                offerId
            }
        })

        return NextResponse.json(request);
    } catch (error) {
        console.log("[NEW_REQUEST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
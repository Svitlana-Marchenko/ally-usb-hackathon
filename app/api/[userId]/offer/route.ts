import {database} from "@/lib/database";
import {NextResponse} from "next/server";

export async function POST(
    req: Request,
    { params }: { params: { userId: string } }
) {

    try {
        const values = await req.json();
        const {userId} = params
        const user = await database.user.findUnique({ where: { id: userId } });

        if (!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const offer = await database.offer.create({
            data: {
                ...values,
                userId
            }
        })

        return NextResponse.json(offer);
    } catch (error) {
        console.log("[NEW_OFFER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
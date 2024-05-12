import {database} from "@/lib/database";
import {NextResponse} from "next/server";

export async function POST(
    req: Request,
) {

    try {
        const values = await req.json();

        const user = await database.user.create({
            data: {
                ...values,
            }
        })

        return NextResponse.json(user);
    } catch (error) {
        console.log("[NEW_USER]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
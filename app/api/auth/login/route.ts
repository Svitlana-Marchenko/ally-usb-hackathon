import {database} from "@/lib/database";
import {NextResponse} from "next/server";

export async function POST(
    req: Request
) {

    const {email, password} = await req.json();

    const user = await database.user.findUnique({where: {email}});

    if (!user || !user.email || !user.password) {
        return new NextResponse("Email does not exist!", {status: 404});
    }

    if (password !== user.password) {
        return new NextResponse("ERROR", {status: 401});
    }

    return NextResponse.json(user);
}

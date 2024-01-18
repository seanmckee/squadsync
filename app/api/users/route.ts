// import connectMongoDB from "@/lib/mongodb";
// import User from "@/lib/models/User";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const { email, clerkID } = await request.json();
//   await connectMongoDB();

//   await User.create({ email, clerkID });
//   return NextResponse.json({ message: "User Created" }, { status: 201 });
// }

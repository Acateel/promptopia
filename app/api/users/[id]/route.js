import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  const id = params.id;

  try {
    connectToDB();
    const existingUser = await User.findById(id);

    if (!existingUser) {
      return new Response("User not found", { status: 404 });
    }

    // will add hiding personal information if it need
    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user", { status: 500 });
  }
};

import connectDB from "@/lib/db";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    const users = await User.find().sort({ createdAt: -1 });
    return res.json(users);
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    await User.findByIdAndDelete(id);
    return res.json({ message: "User deleted" });
  }
}
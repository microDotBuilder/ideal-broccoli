import ApiResponse from "../utils/api-response";
import asyncHandler from "../utils/async-handler";
import { Prisma } from "../db";

const prisma = new Prisma();

const getUser = asyncHandler(async (req, res) => {
  const db = prisma.getClient();
  const email = req.body.email as string;
  const user = await db.user.findUnique({
    select: {
      id: true,
      name: true,
    },
    where: {
      email,
    },
  });

  prisma.break();
  if (!user) {
    res.status(404).json(new ApiResponse(404, "Not Found", "User not found"));
  }
  res.status(200).json(new ApiResponse(200, "OK", user));
});

export { getUser };

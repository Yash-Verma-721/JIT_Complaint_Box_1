import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin";

export const seedDefaultAdmin = async () => {
  try {
    const email = process.env.ADMIN_DEFAULT_EMAIL || "admin@jit.com";
    const password = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
    const name = "JIT Admin";

    const existing = await Admin.findOne({ email });

    if (existing) {
      console.log("Default admin already exists");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      passwordHash,
      name,
    });

    console.log("Default admin created:", email);
  } catch (error) {
    console.error("Error seeding default admin:", error);
  }
};

/**
 * Sets the admin login to:
 *   email:    sunfloeby@gmail.com
 *   password: Bulan3005
 *
 * Usage:
 *   1. Place this file in your project (e.g. scripts/update-admin-credentials.ts)
 *   2. Run:  npx tsx scripts/update-admin-credentials.ts
 *      (or:  npx ts-node scripts/update-admin-credentials.ts)
 *
 * This updates the existing ADMIN user if one exists, or creates a new one
 * if none does. Requires DATABASE_URL to be set (same as the app uses).
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const NEW_EMAIL = "sunfloeby@gmail.com";
const NEW_PASSWORD = "Bulan3005";

async function main() {
  const hashedPassword = await bcrypt.hash(NEW_PASSWORD, 10);

  const existingAdmin = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (existingAdmin) {
    await prisma.user.update({
      where: { id: existingAdmin.id },
      data: { email: NEW_EMAIL, password: hashedPassword },
    });
    console.log(`Updated existing admin (${existingAdmin.id}) -> ${NEW_EMAIL}`);
  } else {
    const created = await prisma.user.create({
      data: {
        email: NEW_EMAIL,
        password: hashedPassword,
        role: "ADMIN",
        name: "Admin",
      },
    });
    console.log(`Created new admin (${created.id}) -> ${NEW_EMAIL}`);
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

-- Alternative to the TS script: run this directly against your Postgres
-- database (e.g. via Supabase SQL editor, or `psql $DIRECT_URL -f this-file.sql`).
--
-- Sets the admin login to:
--   email:    sunfloeby@gmail.com
--   password: Bulan3005  (already bcrypt-hashed below, cost factor 10)

-- If an ADMIN user already exists, update it:
UPDATE users
SET email = 'sunfloeby@gmail.com',
    password = '$2b$10$P.YCcAaKpHPvvP7aDoK.2OBKXRJYrSzvIl/icjfZ66kO2Fku5ejKe',
    updated_at = now()
WHERE role = 'ADMIN';

-- If no ADMIN user exists yet, insert one instead (only run this if the
-- UPDATE above affected 0 rows):
-- INSERT INTO users (id, email, password, role, name, created_at, updated_at)
-- VALUES (
--   gen_random_uuid()::text,
--   'sunfloeby@gmail.com',
--   '$2b$10$P.YCcAaKpHPvvP7aDoK.2OBKXRJYrSzvIl/icjfZ66kO2Fku5ejKe',
--   'ADMIN',
--   'Admin',
--   now(),
--   now()
-- );

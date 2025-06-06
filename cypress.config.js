import { defineConfig } from 'cypress';
import { Pool } from 'pg';

const pool = new Pool({
  host: "aws-0-sa-east-1.pooler.supabase.com",
  user: "postgres.xazzvflfwnknhriwixry",
  password: "aY%LJPC6aLD57t@",
  database: "postgres",
  port: 5432,
});

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",
    viewportWidth: 1440,
    viewportHeight: 900,

    setupNodeEvents(on, config) {
      on("task", {
        async removeUser(email) {
          try {
            const res = await pool.query(
              "DELETE FROM public.users WHERE email = $1",
              [email]
            );
            return { success: res.rowCount > 0 };
          } catch (err) {
            console.error(err);
            return { success: false };
          }
        },

        async findToken(email) {
          try {
            const result = await pool.query(
              `SELECT B.token
               FROM public.users A
               INNER JOIN public.user_tokens B ON A.id = B.user_id
               WHERE A.email = $1
               ORDER BY B.created_at DESC
               LIMIT 1`,
              [email]
            );
            return result.rows[0]?.token;
          } catch (err) {
            console.error(err);
            return null;
          }
        }
      });
    }
  }
});

import { defineConfig } from 'cypress';
import { Pool } from 'pg';


export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/",

    viewportWidth: 1440, 
    viewportHeight: 900, 

    setupNodeEvents(on, config) {
      const pool = new Pool({
        host: "aws-0-sa-east-1.pooler.supabase.com",
        user: "postgres.xazzvflfwnknhriwixry",
        password: "aY%LJPC6aLD57t@",
        database: "postgres",
        port: 5432,
      });

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
      });
    },
  },
});

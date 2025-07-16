// cypress.config.js
import { defineConfig } from "cypress";
import { Pool } from "pg";

// (Opcional: considere usar dotenv para proteger credenciais em produção)
const pool = new Pool({
  host: "aws-0-sa-east-1.pooler.supabase.com",
  user: "postgres.xazzvflfwnknhriwixry",
  password: "aY%LJPC6aLD57t@",
  database: "postgres",
  port: 5432,
  ssl: { rejectUnauthorized: false } // bom para cloud (supabase)
});

async function removeUser(email) {
  try {
    const res = await pool.query(
      "DELETE FROM public.users WHERE email = $1",
      [email]
    );
    return { success: res.rowCount > 0 };
  } catch (err) {
    console.error("DB removeUser error:", err);
    return { success: false };
  }
}

async function findToken(email) {
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
    return result.rows[0]?.token || null;
  } catch (err) {
    console.error("DB findToken error:", err);
    return null;
  }
}

export default defineConfig({
  projectId: "c8md7t", // Cypress Cloud project ID
  video: true,

  e2e: {
    baseUrl: "https://samuraibs-web.onrender.com",
    
    viewportWidth: 1440,
    viewportHeight: 900,

    setupNodeEvents(on, config) {
      on("task", {
        removeUser,
        findToken
      });
    }
  }
});

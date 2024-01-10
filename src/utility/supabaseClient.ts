import { createClient } from "@refinedev/supabase";

// Change supabase key to service_role

const SUPABASE_URL = "https://xyysrbotmuovoiivlzog.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eXNyYm90bXVvdm9paXZsem9nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMTI4MTY5MiwiZXhwIjoyMDE2ODU3NjkyfQ.VLB1GijhXag-BsDBUNkaEJog2xFpyo0hqVlVyjtgbek";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});

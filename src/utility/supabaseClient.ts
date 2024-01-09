import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://xyysrbotmuovoiivlzog.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5eXNyYm90bXVvdm9paXZsem9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyODE2OTIsImV4cCI6MjAxNjg1NzY5Mn0.KH1ZRMqt7bcHPEeT6VZHctABF_RSzLSIFbfUW0mrZs4";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});

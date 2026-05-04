import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ccyitzzmjzzzlvropnrt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjeWl0enptanp6emx2cm9wbnJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NzIxNDIsImV4cCI6MjA5MzQ0ODE0Mn0.5U38Y9a0_csomze1KZ6YKQl7Exm0AhCkWI3Mggpc1X8";

export const supabase = createClient(supabaseUrl, supabaseKey);
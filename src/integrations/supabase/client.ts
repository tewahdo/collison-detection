import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nyetklvkvgxftdhejigs.supabase.co";
const supabaseKey = "sb_publishable_PnHhvHB606Vqs98gH3j5kQ_snX9yiPe";

export const supabase = createClient(supabaseUrl, supabaseKey);

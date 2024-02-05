import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const url: any = process.env.SUPABASE_URL;
const anon: any = process.env.SUPABASE_KEY;

const supabase = createClient(url, anon);

export default supabase;

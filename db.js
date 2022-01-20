import { createClient } from "@supabase/supabase-js";
import getSnapshot from "./snapshot.js";

import "dotenv/config";
const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_TABLENAME } = process.env;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function sendData(key, value) {
  const { data, error } = await supabase
    .from(SUPABASE_TABLENAME)
    .insert([{ address: key, balance: value }]);

  return data;
}

async function main() {
  const holders = await getSnapshot();
  for (const [key, value] of Object.entries(holders)) {
    console.log("Data sent:", await sendData(key, value));
  }
}

main();

import fs from "fs";
import { createClient } from "@supabase/supabase-js";
import getSnapshot from "./snapshot.js";

import "dotenv/config";
const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_TABLENAME } = process.env;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// function to send data to supabase
async function sendData(key, value) {
  const { data, error } = await supabase
    .from(SUPABASE_TABLENAME)
    .insert([{ address: key, balance: value }]);

  return data;
}

async function main() {
  const holders = await getSnapshot();

  // save data in supabase
  for (const [key, value] of Object.entries(holders)) {
    console.log("Data sent:", await sendData(key, value));
  }

  // or/and in a local json file
  let json = JSON.stringify(holders);
  fs.writeFile("holders.json", json, "utf8", function (err) {
    if (err) throw err;
    console.log("complete");
  });
}

main();

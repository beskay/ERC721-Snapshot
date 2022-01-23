const supa = require("@supabase/supabase-js");
const snapshot = require("./snapshot");
const tree = require("./merkleTree");

require("dotenv").config();
const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_TABLENAME } = process.env;

const supabase = supa.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// function to send data to supabase
async function sendData(key, value) {
  const { data, error } = await supabase
    .from(SUPABASE_TABLENAME)
    .insert([{ address: key, balance: value }]);

  return data;
}

async function main() {
  const holders = await snapshot.getSnapshot();
  const merkletree = tree.generateMerkleTree(holders);
  const proofs = tree.generateProofs(merkletree, holders);

  console.log(proofs);
  /*   for (const [key, value] of Object.entries(holders)) {
    console.log("Data sent:", await sendData(key, value));
  } */
}

main();

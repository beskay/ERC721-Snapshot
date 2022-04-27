const supa = require("@supabase/supabase-js");
const snapshot = require("./snapshot");
const tree = require("./merkleTree");

require("dotenv").config();
const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_TABLENAME } = process.env;

const supabase = supa.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// function to send data to supabase
async function sendData(account, amount, proof) {
  const { data, error } = await supabase.from(SUPABASE_TABLENAME).insert([
    {
      account: account,
      balance: amount,
      proof: proof,
    },
  ]);

  return data;
}

async function main() {
  const holders = await snapshot.getSnapshot();
  const merkletree = tree.generateMerkleTree(holders);
  const proofs = tree.generateProofs(merkletree, holders);

  entries = {};
  Object.entries(holders).forEach(async ([account, amount]) => {
    entries[account] = {
      balance: amount,
      proof: proofs[account],
    };

    //console.log(await sendData(account, amount, proofs[account]));
    console.log(`${account}, ${amount}, ${proofs[account]}`);
  });

  // do something with entries if needed
}

main();

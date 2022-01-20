# ERC721 Snapshot

Simple script for creating a snapshot of all token holders + corresponding balances of an ERC721 contract. Data is being stored using Supabase.

## Installation

Clone this repo and run

```
npm install
```

In the root directory

Create an .env file in the root directory and declare following variables:

```
ALCHEMY_KEY = "https://abcdefg"

SUPABASE_URL = https://abcdefg
SUPABASE_ANON_KEY = abcdefg
SUPABASE_TABLENAME = "NAME"


CONTRACT_ADDRESS = "0xabcd"
SUPPLY = xxx
```

Go to your Supabase dashboard and click on Settings in the sidebar navigation. Here, click on API and you will see a bunch of Config and API Keys. Grab the URL and API (anon public) key and throw the values respectively into the .env file.

Supply is the circulating supply of NFTs, e.g. 10000 for BAYC.

You dont have to use Alchemy as your provider obviously, you can also use Infura or your own node etc.

### Supabase

Create a new project (or use an existing one) and create a new table. Give it a name, make sure the name matches the name supplied in your .env file.

Add two columns:

```
Column 1: name = address, type = text
Column 2: name = balance, type = int8
```

### Creating the snapshot

Run

```
node db.js
```

And thats literally it. All tokenholders with their corresponding tokenbalance will appear in your Supabase database. You will see the sent data in your terminal, e.g.

```
Data sent: [
  { address: '0xabcdefg123456', balance: 1 }
]
...
```

If you dont want to save the data via Supabase, just run

```
node snapshot.js
```

Make sure to edit the script and save the data somewhere else in that case, or just display it in your terminal with

```
console.log(holders)
```

## Useful resources

Supabase docs
https://supabase.com/docs/

Ethers js docs
https://docs.ethers.io/v5/

OpenZeppeling ERC721
https://docs.openzeppelin.com/contracts/4.x/api/token/erc721

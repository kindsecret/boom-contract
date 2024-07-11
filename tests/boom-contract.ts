import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Keypair } from "@solana/web3.js";
import { BoomContract } from "../target/types/boom_contract";

describe("boom-contract", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.BoomContract as Program<BoomContract>;

  it("Is initialized!", async () => {
    // Add your test here.
    const metadata = {
      name: "Boom",
      symbol: "BOOM",
      uri: "https://sapphire-sophisticated-panda-344.mypinata.cloud/ipfs/QmSBPN1JgcSAoc7fQizsjtyBdot7HY49RFyt6wzEV2DaZ5",
    };

    const mintKeypair = Keypair.generate();
    const creator = anchor.Wallet.local();

    const tx = await program.methods
      .createTokenMint(metadata.name, metadata.symbol, metadata.uri)
      .accounts({
        payer: creator.publicKey,
        mintAccount: mintKeypair.publicKey,
      })
      .signers([mintKeypair, creator.payer])
      .rpc();

    console.log(
      `     Transaction Signature: https://explorer.solana.com/tx/${tx}?cluster=devnet`
    );
    console.log(
      `     Token address: https://explorer.solana.com/address/${mintKeypair.publicKey}?cluster=devnet`
    );

  });
});

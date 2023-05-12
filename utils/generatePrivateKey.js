import { randomBytes, hexlify } from "ethers";

export default function generatePrivateKey() {
  const bytes = randomBytes(32);
  const privateKey = hexlify(bytes);
  return privateKey;
}

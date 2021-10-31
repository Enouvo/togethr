import { create } from 'ipfs-http-client';

/* Create an instance of the client */
export const ipfs = create('https://ipfs.infura.io:5001/api/v0');

export const getIpfs = (ipfsHash) => `https://ipfs.infura.io/ipfs/${ipfsHash}`;

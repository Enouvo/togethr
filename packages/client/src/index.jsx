import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import 'antd/dist/antd.css';
import App from './App.jsx';
import { config } from '@onflow/fcl';

config({
  'accessNode.api': 'https://access-testnet.onflow.org',
  'discovery.wallet': 'https://fcl-discovery.onflow.org/testnet/authn',
  '0xNonFungibleToken': '0x631e88ae7f1d7c20',
  '0xFungibleToken': '0x9a0766d93b6608b7',
  '0xTogethrCreator': '0xecab3beb444ddcce',
  '0xTogethrFunder': '0xecab3beb444ddcce',
  '0xTogethrNFT': '0x15b2d59c0036a859',
  '0xTogethrMarket': '0x15b2d59c0036a859',
  '0xFlowToken': '0x7e60df042a9c0868',
});

ReactDOM.render(<App />, document.getElementById('root'));

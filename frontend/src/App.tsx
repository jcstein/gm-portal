import './App.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect, SetStateAction } from 'react'
import { ethers } from 'ethers'
import WavePortal from '../WavePortal.json'
import { useAccount } from "wagmi";
import moment from 'moment'

const contractAddress = '0x79dedb9725776ac25b81cd34ffa7800adf41a245'

function App() {
  useEffect(() => {
    getAllWaves()
    getTotalWaves()
    }, [])
  const [viewState, setViewState] = useState('view-posts')
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState('')
  const [totalWaves, setTotalWaves] = useState(0)
  const { address } = useAccount();

  async function getAllWaves() {
    const provider = new ethers.providers.Web3Provider((window.ethereum as any))
    const contract = new ethers.Contract(contractAddress, WavePortal.abi, provider)
    let data = await contract.getAllWaves()
    data = data.map((d: { waver: string, message: string; timestamp: string }) => ({
      waver: d['waver'],
      message: d['message'],
      timestamp: d['timestamp'],
    }))
    setPosts(data)
  }

  async function getTotalWaves() {
    const provider = new ethers.providers.Web3Provider((window.ethereum as any))
    const contract = new ethers.Contract(contractAddress, WavePortal.abi, provider)
    const totalWaves = await contract.getTotalWaves()
    console.log('total waves', totalWaves)
    setTotalWaves(totalWaves.toString())
  }

  async function wave() {
    const provider = new ethers.providers.Web3Provider((window.ethereum as any))
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, WavePortal.abi, signer)
    const tx = await contract.wave(message)
    await tx.wait()
    setViewState('view-posts')
  }

  function toggleView(value: SetStateAction<string>) {
    setViewState(value)
    if (value === 'view-posts') {
      getAllWaves()
      getTotalWaves()
    }
  }

  return (
    <div style={outerContainerStyle}>
      <div style={innerContainerStyle}>
      <h1>GM Portal</h1>
      {!address ? (<div>
      <h3>What is GM?</h3>
      <p>GM means good morning. It's GM o'clock somewhere, so there's never a bad time to say GM, Gm, or gm.</p>
      <h3>Getting Started</h3>
      <p>First, DM me at <a href="https://twitter.com/JoshCStein" target="_blank">@JoshCStein</a> or <a href="https://www.lensfrens.xyz/joshcs.lens" target="_blank">joshcs.lens</a> with your Ethereum wallet address to receive EMINT tokens.</p>
      <p>Then, you can connect your Ethereum wallet below to the Ethermint Sovereign Rollup to display the posts from the smart contract and post a GM. You only need EMINT to post.</p>
      </div> ) : null}
      {!address ? (<div>
        <br/>
        <h3 style={{ textAlign: 'center'}}>Connect your Ethereum wallet to begin ✨</h3>
      </div> ) : null}
      <div style={buttonContainerStyle}>
      <ConnectButton />
      </div>
      {!address ? (<div>
      <br/>
      <h4>Nice, what's going on under the hood?</h4>
      <p>This GM Portal is built with <a href="https://celestia.org" target="_blank">Celestia</a>, <a href ="https://docs.celestia.org/developers/rollmint" target="_blank">RollKit</a>, & <a href="https://github.com/celestiaorg/ethermint" target="_blank">Ethermint</a>.</p>
      <p>The GM Portal is a smart contract demo on a <a href="https://celestia.org/glossary/sovereign-rollup" target="_blank">sovereign rollup</a> built on Celestia to provide <a href="https://celestia.org/glossary/data-availability" target="_blank">data availability</a> and <a href="https://ethereum.org/en/developers/docs/consensus-mechanisms/" target="_blank">consensus</a>, leveraging Ethermint with RollKit as the <a href="https://celestia.org/glossary/execution-environment" target="_blank">execution environment</a>.</p>
      <p>This allows users to securely create and share blog posts on the blockchain without the need for a centralized server or authority.</p></div> ) : null}
      {address ? (
      <div style={buttonContainerStyle}>
        <button onClick={() => toggleView('view-posts')} style={buttonStyle}>View Posts</button>
        {viewState !== 'create-post' && <button  onClick={() => toggleView('create-post')} style={buttonStyle}>Create Post</button>}
      </div>
      ) : null}
      {
        viewState === 'view-posts' && address && (
          <div style={{ textAlign: 'left'}}>
            <div style={postContainerStyle}>
            <h1>Posts</h1>
            <h3>☀️ Total GMs: {totalWaves}</h3>
            {
              posts.slice().reverse().map((post, index) => (
                <div style={postStyle} key={index}>
                  <h2>{(post as any).message}</h2>
                  <p className="wallet-address">📤 From: {(post as any).waver}</p>
                  <p>⏰ GM'd at: {moment.unix((post as any).timestamp).format('lll')}</p>
                </div>
              ))
            }
          </div>
          </div>
        )
      }
      {
        viewState === 'create-post' && (
          <div style={formContainerStyle}>
              <h2>Create Post</h2>
              <input
                placeholder='Message'
                onChange={e => setMessage(e.target.value)}
                style={inputStyle}
              />
              <button onClick={wave}>Create Post</button>
          </div>
        )
      }
      <p style={{ textAlign: 'center'}}>This site is <a href="https://github.com/jcstein/gm-portal" target="_blank">open source 🐱</a></p>
      </div>
    </div>
  )
}

const outerContainerStyle = {
  padding: '50px 0px',
}

const innerContainerStyle = {
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
  textAlign: 'left' as any
}

const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as any,
  alignItems: 'center'
}

const inputStyle = {
  marginBottom: '10px',
  padding: '10px',
  height: '40px',
}

const postContainerStyle = {
  margin: '0 auto',
  width: '100%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column' as any,
  alignItems: 'start',
  justifyContent: 'center',
}

const postStyle = {
  border: '1px solid rgba(255, 255, 255, .2)',
  width: '100%',
  maxWidth: '600px',
  borderRadius: '13px',
  padding: '5px 10px 5px 10px',
  margin: '7px 0 7px 0',
  background: 'rgba(255, 255, 255, .1)',
}

const buttonStyle = {
  marginTop: 15,
  marginRight: 5,
  border: '1px solid rgba(255, 255, 255, .2)'
}

const buttonContainerStyle = {
  marginTop: 15,
  marginRight: 5,
  display: 'flex',
  justifyContent: 'center',
}

export default App
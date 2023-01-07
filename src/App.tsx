import './App.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect, SetStateAction } from 'react'
import { ethers } from 'ethers'
import WavePortal from '../WavePortal.json'
import { useAccount } from "wagmi";
import moment from 'moment'

const contractAddress = '0xa7df09af4e5e90db542639d4e97fd2585abe66d3'

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
    data = data.map(d => ({
      waver: d['waver'],
      message: d['message'].toString(),
      timestamp: d['timestamp'].toString(),
    }))

    setPosts(data)
  }

  async function getTotalWaves() {
    const provider = new ethers.providers.Web3Provider((window.ethereum as any))
    const contract = new ethers.Contract(contractAddress, WavePortal.abi, provider)
    // const totalWaves = await contract.getTotalWaves.toString()
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
        <h3>Getting Started</h3>
      <p>First, you will need to connect your Ethereum wallet to Ethermint to display the posts from the smart contract and make posts.</p>
      <p>DM joshcs.lens or @JoshCStein with your wallet address to receive test tokens.</p>
      </div> ) : null}
      <br />
      <h3 style={{ justifyContent: 'right', textAlign: 'right'}}>Connect your Ethereum wallet to begin ✨</h3>
      <div style={buttonContainerStyle}>
      <ConnectButton />
      </div>
      {address ? (
      <div style={buttonContainerStyle}>
        <button onClick={() => toggleView('view-posts')} style={buttonStyle}>View Posts</button>
        <button  onClick={() => toggleView('create-post')} style={buttonStyle}>Create Post</button>
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
                <div key={index}>
                  <h2>{post.message}</h2>
                  <p>📤 From: {post.waver}</p>
                  <p>⏰ GM'd at: {moment.unix(post.timestamp).format('lll')}</p>
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
      </div>
    </div>
  )
}

const outerContainerStyle = {
  width: '90vw',
  height: '100vh',
  padding: '50px 0px',
}

const innerContainerStyle = {
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
}

const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const inputStyle = {
  width: '400px',
  marginBottom: '10px',
  padding: '10px',
  height: '40px',
}

const postContainerStyle = {
  margin: '0 auto',
  padding: '1em',
  width: '90%',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
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
  justifyContent: 'right',
}

export default App

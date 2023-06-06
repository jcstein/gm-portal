import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect, SetStateAction } from 'react'
import { ethers } from 'ethers'
import WavePortal from '../WavePortal.json'
import { useAccount } from "wagmi";
import moment from 'moment'
import { Heading, Flex, VStack, Button, HStack, Text, Link, Card, CardBody, CardHeader, CardFooter, Input } from '@chakra-ui/react';
import { Topbuttons } from "./Components/topbuttons";
import './App.css'

const contractAddress = '0x5dd0a1c2fca0ee49e986931f6cc63c0fc41d0b97'

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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if(address) {
      getAllWaves()
      getTotalWaves()
    }
  }, [address])
  const [errorMessage, setErrorMessage] = useState('')
  
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
    setLoading(true);
    try {
      const provider = new ethers.providers.Web3Provider((window.ethereum as any))
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, WavePortal.abi, signer)
      const tx = await contract.wave(message)
      await tx.wait()
      setLoading(false);
      setViewState('view-posts')
    } catch (error) {
      setErrorMessage('Something is off - please try again!')
    }
  }

  function toggleView(value: SetStateAction<string>) {
    setViewState(value)
    if (value === 'view-posts') {
      getAllWaves()
      getTotalWaves()
    }
  }

  return (
    <div>
      <Topbuttons />
      <Flex
        justifyContent="center"
        alignItems="center"
        alignSelf="center"
        minHeight="90vh"
      >
      <VStack p="8" maxWidth="800px">
        <Heading size="2xl" mb="5">GM Portal</Heading>
        {!address ? (<div>
        <Heading size="md" pb="3">A smart contract demo on Taro testnet 🧋</Heading>
        </div> ) : null}
        {!address ? (<div><br/><Heading size="sm" pb="3">Connect your Ethereum wallet to begin ✨</Heading></div> ) : null}
        <ConnectButton />
        {address ? (
        <HStack>
          <Button onClick={() => toggleView('view-posts')} colorScheme="purple">View Posts</Button>
          {viewState !== 'create-post' && <Button onClick={() => toggleView('create-post')} colorScheme="green">Create Post</Button>}
        </HStack>
        ) : null}
        {
          viewState === 'view-posts' && address && (
            <div style={{ textAlign: 'left'}}>
              <div>
              <Heading size="lg" pb="3" textAlign="center">Posts</Heading>
              <Heading size="md" pb="3" textAlign="center">☀️ Total GMs: {totalWaves}</Heading>
              {
                posts.slice().reverse().map((post, index) => (
                  <Card mb="2">
                  <div key={index}>
                    <CardHeader fontSize="xl" fontWeight="bold">{(post as any).message}</CardHeader>
                    <CardBody py="0" className="address">📤 From: {(post as any).waver}</CardBody>
                    <CardFooter pt="0">⏰ GM'd at: {moment.unix((post as any).timestamp).format('lll')}</CardFooter>
                  </div>
                  </Card>
                ))
              }
            </div>
            </div>
          )
        }
        {
          viewState === 'create-post' && (
            <VStack alignItems="center" p="3">
                <Heading size="md" pt="5" pb="3">Create Post</Heading>
                <Input
                  placeholder='Message'
                  onChange={e => setMessage(e.target.value)}
                />
                {errorMessage && <div style={{ padding: '5px' }}>{errorMessage}</div>}
                <Button onClick={wave} colorScheme="green">Send Post</Button>
                {!errorMessage && loading ? <div style={{padding: '10px'}}>Transaction processing...</div> : null}
            </VStack>
          )
        }
        <br />
        <Text textAlign="center" fontStyle="italic">This site and smart contract are <Link color="purple.500" href='https://github.com/jcstein/gm-portal' target="_blank">open source</Link>{' '}and{' '}the{' '}<Link color="purple.500" href='https://plausible.io/gmportal.xyz' target="_blank">analytics</Link> are GDPR compliant</Text>
      </VStack>
      </Flex>
      </div>
  )
}

export default App
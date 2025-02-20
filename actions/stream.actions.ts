'use server';

import { OwnCapability, StreamClient } from '@stream-io/node-sdk'

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
  const user = { id: process.env.NEXT_PUBLIC_STREAM_USER_ID! }

  if (!user) throw new Error('User is not authenticated')
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing')
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing')

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET)

  const expirationTime = Math.floor(Date.now() / 1000) + 3600
  const issuedAt = Math.floor(Date.now() / 1000) - 60

  const token = streamClient.createToken(user.id, expirationTime, issuedAt)

  return token
}

// test actions

export const getMembers = async (id: string) => {
  const user = { id: process.env.NEXT_PUBLIC_STREAM_USER_ID! }

  if (!user) throw new Error('User is not authenticated')
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing')
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing')

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET)

  const members = await streamClient.video.queryCallMembers({
    id,
    type: 'default',
  })

  const call = await streamClient.video.getCall({
    id,
    type: 'default',
  })

  console.log(call.call.session?.participants)

  return members
}

export const givePermissions = async (id: string) => {
  const user = { id: process.env.NEXT_PUBLIC_STREAM_USER_ID! }

  if (!user) throw new Error('User is not authenticated')
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing')
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing')

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET)

  streamClient.video.updateCallType({  
    name: "default",  
    grants: 
    {    
      host: [OwnCapability.JOIN_BACKSTAGE],  
    }
  });
}

export const goLive = async (id: string) => {
  const user = { id: process.env.NEXT_PUBLIC_STREAM_USER_ID! }

  if (!user) throw new Error('User is not authenticated')
  if (!STREAM_API_KEY) throw new Error('Stream API key secret is missing')
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing')

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET)

  await streamClient.video.goLive({
       id,
    type: 'default',
  })

  return null
}
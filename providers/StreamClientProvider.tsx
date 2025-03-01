'use client';

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk'

import { tokenProvider } from '@/actions/stream.actions'
import Loader from '@/components/Loader'

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>()
  const user = {
    id: process.env.NEXT_PUBLIC_STREAM_USER_ID!,
    username: process.env.NEXT_PUBLIC_STREAM_USER_NAME!,
    imageUrl: 'https://placehold.co/100x100'
  }
  const isLoaded = true

  useEffect(() => {
    if (!isLoaded || user == null) return
    if (!API_KEY) throw new Error('Stream API key is missing')

    const client = StreamVideoClient.getOrCreateInstance({
      apiKey: API_KEY,
      user: { id: user?.id, name: user?.username || user?.id, image: user?.imageUrl },
      tokenProvider
    })

    setVideoClient(client)
  }, [user, isLoaded])

  if (!videoClient) return <Loader />

  return <StreamVideo client={videoClient}>{children}</StreamVideo>
}

export default StreamVideoProvider;

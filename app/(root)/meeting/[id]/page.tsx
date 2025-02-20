'use client';

import { useState } from 'react'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useParams } from 'next/navigation'
import { Loader } from 'lucide-react'

import { useGetCallById } from '@/hooks/useGetCallById'
import Alert from '@/components/Alert'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'

const MeetingPage = () => {
  const { id } = useParams()
  const user = { id: '192335c6-5866-4559-9948-b4c12a307d40', username: 'John Doe' }
  const isLoaded = true
  const { call, isCallLoading } = useGetCallById(id!)
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  if (!isLoaded || isCallLoading) return <Loader />

  if (!call) return <p className='text-center text-3xl font-bold text-white'>Call Not Found</p>

  // get more info about custom call type:  https://getstream.io/video/docs/react/guides/configuring-call-types/
  const notAllowed = call.type === 'invited' && (!user || !call.state.members.find((m) => m.user.id === user.id))

  if (notAllowed) return <Alert title='You are not allowed to join this meeting' />

  return (
    <main className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup setIsSetupComplete={setIsSetupComplete} /> : <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage;

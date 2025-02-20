"use client"

import { goLive, getMembers, givePermissions } from "@/actions/stream.actions"

export const TestButtons = ({id}: {id: string}) => {
  return <>
     <button onClick={() => goLive(id)}>Go Live</button>
    <button onClick={() => getMembers(id)}>Get Members</button>
    <button onClick={() => givePermissions(id)}>Give Permissions</button>
  </>
}
import { Stack } from '@mui/system'
import React from 'react'
import Bottom from './Bottom/Bottom'
import Mid from './Mid/Mid'
import Top from './Top/Top'

const Home = () => {
  return (
    <>
    <Stack width='100%' margin='auto' >
        <Top />
        <Mid />
        <Bottom />
    </Stack>
    </>
  )
}

export default Home

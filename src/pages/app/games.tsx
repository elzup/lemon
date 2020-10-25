import dynamic from 'next/dynamic'

const Page = dynamic(() => import('../../components/AppGames'), {
  ssr: false,
})

export default Page

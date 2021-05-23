import dynamic from 'next/dynamic'

const Page = dynamic(() => import('../../components/AppGarden'), {
  ssr: false,
})

export default Page

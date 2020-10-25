import dynamic from 'next/dynamic'

const Page = dynamic(() => import('../../components/AppIcon'), {
  ssr: false,
})

export default Page

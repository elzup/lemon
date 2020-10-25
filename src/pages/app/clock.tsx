import dynamic from 'next/dynamic'

const Page = dynamic(() => import('../../components/AppClock'), {
  ssr: false,
})

export default Page

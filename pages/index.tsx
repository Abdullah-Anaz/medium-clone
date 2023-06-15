import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Header from '@/components/Header'
import Banner from '@/components/Banner'
import Posts from '@/components/Posts'
import { sanityClient } from '../sanity'
import { Post } from '@/typings'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  posts: [Post]
}

export default function Home({posts}: Props) {
  return (
    <main
      className="max-w-7xl mx-auto"
    >
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href='/favicon.ico'/>
      </Head>

      <Header />
      <Banner />
      <Posts posts={posts}/>
      
    </main>
  )
}

export const getServerSideProps = async() => {
  const query = `
  *[_type == "post"]{
  _id,
    title,
    author -> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  }
}

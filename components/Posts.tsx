import { urlfor } from '@/sanity'
import { Post } from '@/typings'
import Link from 'next/link'

interface Props {
  posts: [Post]
}

function Posts({posts}: Props) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map(post => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
                <div className='group cursor-pointer border rounded-lg overflow-hidden'>
                    <img className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' src={urlfor(post.mainImage).url()!} alt='' />

                    <div className='flex justify-between p-5 bg-white'>
                        <div>
                            <p className='text-lg font-bold'>{post.title}</p>
                            <p className='text-xs'>{post.description} by {post.author.name}</p>
                        </div>

                        <img className='h-12 w-12 rounded-full' src={urlfor(post.author.image).url()!} alt='' />
                    </div>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default Posts
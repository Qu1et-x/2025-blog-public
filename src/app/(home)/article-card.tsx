import { useLatestBlog } from '@/hooks/use-blog-index'
import { useConfigStore } from './stores/config-store'
import dayjs from 'dayjs'
import Link from 'next/link'
import { BaseCard } from './components/base-card'

export default function ArticleCard() {
	const { siteContent } = useConfigStore()
	const { blog, loading } = useLatestBlog()

	return (
		<BaseCard cardKey='articleCard' className='space-y-2'>
			{siteContent.enableChristmas && (
				<>
					<img
						src='/images/christmas/snow-9.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 140, left: -12, top: -16, opacity: 0.8 }}
					/>
				</>
			)}

			<h2 className='text-secondary text-sm'>最新文章</h2>

			{loading ? (
				<div className='flex h-[60px] items-center justify-center'>
					<span className='text-secondary text-xs'>加载中...</span>
				</div>
			) : blog ? (
				<Link href={`/blog/${blog.slug}`} className='flex transition-opacity hover:opacity-80'>
					{blog.cover ? (
						<img src={blog.cover} alt='cover' className='mr-3 h-12 w-12 shrink-0 rounded-xl border object-cover' />
					) : (
						<div className='text-secondary mr-3 grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/60'>+</div>
					)}
					<div className='flex-1'>
						<h3 className='line-clamp-1 text-sm font-medium'>{blog.title || blog.slug}</h3>
						{blog.summary && <p className='text-secondary mt-1 line-clamp-3 text-xs'>{blog.summary}</p>}
						<p className='text-secondary mt-3 text-xs'>{dayjs(blog.date).format('YYYY/M/D')}</p>
					</div>
				</Link>
			) : (
				<div className='flex h-[60px] items-center justify-center'>
					<span className='text-secondary text-xs'>暂无文章</span>
				</div>
			)}
		</BaseCard>
	)
}

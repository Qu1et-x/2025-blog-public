'use client'

import { useEffect, useState } from 'react'
import { useConfigStore } from './stores/config-store'
import shareList from '@/app/share/list.json'
import Link from 'next/link'
import { BaseCard } from './components/base-card'

type ShareItem = {
	name: string
	url: string
	logo: string
	description: string
	tags: string[]
	stars: number
}

export default function ShareCard() {
	const { siteContent } = useConfigStore()
	const [randomItem, setRandomItem] = useState<ShareItem | null>(null)

	useEffect(() => {
		const randomIndex = Math.floor(Math.random() * shareList.length)
		setRandomItem(shareList[randomIndex])
	}, [])

	if (!randomItem) {
		return null
	}

	return (
		<BaseCard cardKey='shareCard'>
			{siteContent.enableChristmas && (
				<>
					<img
						src='/images/christmas/snow-12.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 120, left: -12, top: -12, opacity: 0.8 }}
					/>
				</>
			)}

			<h2 className='text-secondary text-sm'>随机推荐</h2>

			<Link href='/share' className='mt-2 block space-y-2'>
				<div className='flex items-center'>
					<div className='relative mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-xl'>
						<img src={randomItem.logo} alt={randomItem.name} className='h-full w-full object-contain' />
					</div>
					<h3 className='text-sm font-medium'>{randomItem.name}</h3>
				</div>

				<p className='text-secondary line-clamp-3 text-xs'>{randomItem.description}</p>
			</Link>
		</BaseCard>
	)
}

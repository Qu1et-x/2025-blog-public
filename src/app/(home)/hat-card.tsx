'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { useConfigStore } from './stores/config-store'
import { useSize } from '@/hooks/use-size'
import { BaseCard } from './components/base-card'
import { useHomeLayout } from './hooks/use-home-layout'

export default function HatCard() {
	const { siteContent } = useConfigStore()
	const { maxSM } = useSize()
	const layout = useHomeLayout()
	const styles = layout.hatCard

	const [number, setNumber] = useState(1)

	const hatIndex = siteContent.currentHatIndex ?? 1
	const hatFlipped = siteContent.hatFlipped ?? false

	if (maxSM) return null

	return (
		<BaseCard cardKey='hatCard' className='bg-transparent border-none p-0 shadow-none ring-0'>
			<div
				onClick={() => setNumber(number + 1)}
				className='relative flex h-full w-full items-center justify-center'>
				{new Array(number)
					.fill(0)
					.map((_, index) =>
						index === 0 ? (
							<img
								key={index}
								src={`/images/hats/${hatIndex}.webp`}
								alt='hat'
								className='h-full w-full object-contain'
								style={{ width: styles.width, height: styles.height, transform: hatFlipped ? 'scaleX(-1)' : 'none' }}
							/>
						) : (
							<img
								key={index}
								src={`/images/hats/${hatIndex}.webp`}
								alt='hat'
								className='absolute h-full w-full object-contain'
								style={{ width: styles.width, height: styles.height, transform: hatFlipped ? 'scaleX(-1)' : 'none', bottom: index * 16 }}
							/>
						)
					)}
			</div>
		</BaseCard>
	)
}

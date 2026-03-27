import PenSVG from '@/svgs/pen.svg'
import { motion } from 'motion/react'
import { useConfigStore } from './stores/config-store'
import { useRouter } from 'next/navigation'
import { useSize } from '@/hooks/use-size'
import DotsSVG from '@/svgs/dots.svg'
import { BaseCard } from './components/base-card'

export default function WriteButton() {
	const { setConfigDialogOpen, siteContent } = useConfigStore()
	const { maxSM } = useSize()
	const router = useRouter()

	if (maxSM) return null

	return (
		<BaseCard cardKey='writeButtons' className='bg-transparent border-none p-0 shadow-none ring-0'>
			<div className='flex items-center gap-4'>
				<motion.button
					onClick={() => router.push('/write')}
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					style={{ boxShadow: 'inset 0 0 12px rgba(255, 255, 255, 0.4)' }}
					className='brand-btn whitespace-nowrap'>
					{siteContent.enableChristmas && (
						<>
							<img
								src='/images/christmas/snow-8.webp'
								alt='Christmas decoration'
								className='pointer-events-none absolute'
								style={{ width: 60, left: -2, top: -4, opacity: 0.95 }}
							/>
						</>
					)}

					<PenSVG />
					<span>写文章</span>
				</motion.button>
				<motion.button
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={() => setConfigDialogOpen(true)}
					className='p-2'>
					<DotsSVG className='h-6 w-6' />
				</motion.button>
			</div>
		</BaseCard>
	)
}

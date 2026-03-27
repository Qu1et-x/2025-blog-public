import { useConfigStore } from './stores/config-store'
import { BaseCard } from './components/base-card'
import Link from 'next/link'

function getGreeting() {
	const hour = new Date().getHours()

	if (hour >= 6 && hour < 12) {
		return 'Good Morning'
	} else if (hour >= 12 && hour < 18) {
		return 'Good Afternoon'
	} else if (hour >= 18 && hour < 22) {
		return 'Good Evening'
	} else {
		return 'Good Night'
	}
}

export default function HiCard() {
	const { siteContent } = useConfigStore()
	const greeting = getGreeting()
	const username = siteContent.meta.username || 'Suni'

	return (
		<BaseCard cardKey='hiCard' className='relative text-center'>
			{siteContent.enableChristmas && (
				<>
					<img
						src='/images/christmas/snow-1.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 180, left: -20, top: -25, opacity: 0.9 }}
					/>
					<img
						src='/images/christmas/snow-2.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 160, bottom: -12, right: -8, opacity: 0.9 }}
					/>
				</>
			)}
			<Link href='/live2d'>
				<img src='/images/avatar.png' className='mx-auto rounded-full' style={{ width: 120, height: 120, boxShadow: ' 0 16px 32px -5px #E2D9CE' }} />
			</Link>
			<h1 className='font-averia mt-3 text-2xl'>
				{greeting} <br /> I'm <span className='text-linear text-[32px]'>{username}</span> , Nice to <br /> meet you!
			</h1>
		</BaseCard>
	)
}

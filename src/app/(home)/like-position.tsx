import LikeButton from '@/components/like-button'
import { ANIMATION_DELAY } from '@/consts'
import { useConfigStore } from './stores/config-store'
import { BaseCard } from './components/base-card'

export default function LikePosition() {
	const { cardStyles, siteContent } = useConfigStore()

	return (
		<BaseCard cardKey='likePosition' className='bg-transparent border-none p-0 shadow-none ring-0'>
			{siteContent.enableChristmas && (
				<>
					<img
						src='/images/christmas/snow-13.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 40, left: -4, top: -4, opacity: 0.9 }}
					/>
				</>
			)}

			<LikeButton delay={cardStyles.shareCard.order * ANIMATION_DELAY * 1000} />
		</BaseCard>
	)
}

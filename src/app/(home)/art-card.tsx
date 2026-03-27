import { useConfigStore } from './stores/config-store'
import { useRouter } from 'next/navigation'
import { BaseCard } from './components/base-card'

export default function ArtCard() {
	const { siteContent } = useConfigStore()
	const router = useRouter()

	const artImages = siteContent.artImages ?? []
	const currentId = siteContent.currentArtImageId
	const currentArt = (currentId ? artImages.find(item => item.id === currentId) : undefined) ?? artImages[0]
	const artUrl = currentArt?.url || '/images/art/cat.png'

	return (
		<BaseCard cardKey='artCard' className='p-2'>
			{siteContent.enableChristmas && (
				<>
					<img
						src='/images/christmas/snow-3.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 160, right: -8, top: -16, opacity: 0.9 }}
					/>
				</>
			)}

			<img onClick={() => router.push('/pictures')} src={artUrl} alt='wall art' className='h-full w-full rounded-[32px] object-cover' />
		</BaseCard>
	)
}

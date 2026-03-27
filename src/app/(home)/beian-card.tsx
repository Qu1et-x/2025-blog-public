import { useConfigStore } from './stores/config-store'
import Link from 'next/link'
import { BaseCard } from './components/base-card'

export default function BeianCard() {
	const { siteContent } = useConfigStore()
	const beian = siteContent.beian

	if (!beian?.text) {
		return null
	}

	return (
		<BaseCard cardKey='beianCard' className='flex items-center justify-center'>
			{beian.link ? (
				<Link href={beian.link} target='_blank' rel='noopener noreferrer' className='text-secondary text-xs transition-opacity hover:opacity-80'>
					{beian.text}
				</Link>
			) : (
				<span className='text-secondary text-xs'>{beian.text}</span>
			)}
		</BaseCard>
	)
}

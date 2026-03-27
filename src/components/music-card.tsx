'use client'

import { useState, useRef, useEffect } from 'react'
import { useConfigStore } from '../app/(home)/stores/config-store'
import MusicSVG from '@/svgs/music.svg'
import PlaySVG from '@/svgs/play.svg'
import { BaseCard } from '../app/(home)/components/base-card'
import { Pause } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const MUSIC_FILES = ['/music/close-to-you.mp3']

export default function MusicCard() {
	const pathname = usePathname()
	const { siteContent } = useConfigStore()

	const [isPlaying, setIsPlaying] = useState(false)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [progress, setProgress] = useState(0)
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const currentIndexRef = useRef(0)

	const isHomePage = pathname === '/'

	// Initialize audio element
	useEffect(() => {
		if (!audioRef.current) {
			audioRef.current = new Audio()
		}

		const audio = audioRef.current

		const updateProgress = () => {
			if (audio.duration) {
				setProgress((audio.currentTime / audio.duration) * 100)
			}
		}

		const handleEnded = () => {
			const nextIndex = (currentIndexRef.current + 1) % MUSIC_FILES.length
			currentIndexRef.current = nextIndex
			setCurrentIndex(nextIndex)
			setProgress(0)
		}

		const handleTimeUpdate = () => {
			updateProgress()
		}

		const handleLoadedMetadata = () => {
			updateProgress()
		}

		audio.addEventListener('timeupdate', handleTimeUpdate)
		audio.addEventListener('ended', handleEnded)
		audio.addEventListener('loadedmetadata', handleLoadedMetadata)

		return () => {
			audio.removeEventListener('timeupdate', handleTimeUpdate)
			audio.removeEventListener('ended', handleEnded)
			audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
		}
	}, [])

	// Handle currentIndex change - load new audio
	useEffect(() => {
		currentIndexRef.current = currentIndex
		if (audioRef.current) {
			const wasPlaying = !audioRef.current.paused
			audioRef.current.pause()
			audioRef.current.src = MUSIC_FILES[currentIndex]
			audioRef.current.loop = false
			setProgress(0)

			if (wasPlaying) {
				audioRef.current.play().catch(console.error)
			}
		}
	}, [currentIndex])

	// Handle play/pause state change
	useEffect(() => {
		if (!audioRef.current) return

		if (isPlaying) {
			audioRef.current.play().catch(console.error)
		} else {
			audioRef.current.pause()
		}
	}, [isPlaying])

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (audioRef.current) {
				audioRef.current.pause()
				audioRef.current.src = ''
			}
		}
	}, [])

	const togglePlayPause = () => {
		setIsPlaying(!isPlaying)
	}

	// Hide component if not on home page and not playing
	if (!isHomePage && !isPlaying) {
		return null
	}

	return (
		<BaseCard cardKey='musicCard' className={cn('flex items-center gap-3', !isHomePage && 'fixed')}>
			{siteContent.enableChristmas && (
				<>
					<img
						src='/images/christmas/snow-10.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 120, left: -8, top: -12, opacity: 0.8 }}
					/>
					<img
						src='/images/christmas/snow-11.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 80, right: -10, top: -12, opacity: 0.8 }}
					/>
				</>
			)}

			<MusicSVG className='h-8 w-8' />

			<div className='flex-1'>
				<div className='text-secondary text-sm'>Close To You</div>

				<div className='mt-1 h-2 rounded-full bg-white/60'>
					<div className='bg-linear h-full rounded-full transition-all duration-300' style={{ width: `${progress}%` }} />
				</div>
			</div>

			<button onClick={togglePlayPause} className='flex h-10 w-10 items-center justify-center rounded-full bg-white transition-opacity hover:opacity-80'>
				{isPlaying ? <Pause className='text-brand h-4 w-4' /> : <PlaySVG className='text-brand ml-1 h-4 w-4' />}
			</button>
		</BaseCard>
	)
}

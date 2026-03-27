import { useConfigStore } from './stores/config-store'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { cn } from '@/lib/utils'
import { BaseCard } from './components/base-card'
import { useHomeLayout } from './hooks/use-home-layout'

dayjs.locale('zh-cn')

export default function CalendarCard() {
	const { siteContent } = useConfigStore()
	const layout = useHomeLayout()
	const styles = layout.calendarCard
	const now = dayjs()
	const currentDate = now.date()
	const firstDayOfMonth = now.startOf('month')
	const firstDayWeekday = (firstDayOfMonth.day() + 6) % 7
	const daysInMonth = now.daysInMonth()
	const currentWeekday = (now.day() + 6) % 7

	return (
		<BaseCard cardKey='calendarCard' className='flex flex-col'>
			{siteContent.enableChristmas && (
				<>
					<img
						src='/images/christmas/snow-7.webp'
						alt='Christmas decoration'
						className='pointer-events-none absolute'
						style={{ width: 150, right: -12, top: -12, opacity: 0.8 }}
					/>
				</>
			)}

			<h3 className='text-secondary text-sm'>
				{now.format('YYYY/M/D')} {now.format('ddd')}
			</h3>
			<ul className={cn('text-secondary mt-3 grid h-[206px] flex-1 grid-cols-7 gap-2 text-sm', (styles.height < 240 || styles.width < 240) && 'text-xs')}>
				{new Array(7).fill(0).map((_, index) => {
					const isCurrentWeekday = index === currentWeekday
					return (
						<li key={index} className={cn('flex items-center justify-center font-medium', isCurrentWeekday && 'text-brand')}>
							{dates[index]}
						</li>
					)
				})}

				{new Array(firstDayWeekday).fill(0).map((_, index) => (
					<li key={`empty-${index}`} />
				))}

				{new Array(daysInMonth).fill(0).map((_, index) => {
					const day = index + 1
					const isToday = day === currentDate
					return (
						<li key={day} className={cn('flex items-center justify-center rounded-lg', isToday && 'bg-linear border font-medium')}>
							{day}
						</li>
					)
				})}
			</ul>
		</BaseCard>
	)
}

const dates = ['一', '二', '三', '四', '五', '六', '日']

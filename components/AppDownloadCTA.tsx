import Link from './Link'

interface AppDownloadCTAProps {
  title?: string
  blurb?: string
  placement?: string
}

const AppDownloadCTA = ({
  title = 'Learn your Deen, one swipe at a time',
  blurb = 'DeenUp turns doom-scrolling into learning — a swipeable feed of bite-sized, scholar-approved Islamic lessons, quick quizzes, and daily streaks.',
  placement,
}: AppDownloadCTAProps) => (
  <div className="not-prose border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/20 my-8 rounded-xl border p-6">
    <h3 className="text-primary-700 dark:text-primary-300 mb-2 text-lg font-semibold">{title}</h3>
    <p className="mb-4 text-gray-600 dark:text-gray-400">{blurb}</p>
    <Link
      href="https://chat.whatsapp.com/Ea023Ghn0PJ27Ijs6Fp?mode=wwt"
      className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 inline-block rounded-lg px-5 py-2.5 text-sm font-medium text-white"
    >
      Join the DeenUp waitlist
    </Link>
  </div>
)

export default AppDownloadCTA

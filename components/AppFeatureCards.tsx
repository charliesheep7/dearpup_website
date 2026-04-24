const features = [
  {
    title: 'Quranic Answers 24/7',
    description:
      'Ask any Islamic question and get answers rooted in Quran and Sunnah from trusted scholars.',
  },
  {
    title: 'Daily Verses & Duas',
    description:
      'Start each day with a Quranic verse and curated duas for every moment of your life.',
  },
  {
    title: 'Track Your Deen',
    description:
      'Build Islamic habits with daily tracking, streaks, and reflection quizzes.',
  },
]

const AppFeatureCards = () => (
  <div className="my-8 grid gap-4 sm:grid-cols-3">
    {features.map((f) => (
      <div
        key={f.title}
        className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50"
      >
        <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">{f.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{f.description}</p>
      </div>
    ))}
  </div>
)

export default AppFeatureCards

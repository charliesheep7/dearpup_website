const features = [
  {
    title: 'A Feed Worth Scrolling',
    description:
      'Swipe through short, scholar-approved Islamic lessons instead of mindless doom-scrolling.',
  },
  {
    title: 'Learn Through Play',
    description:
      'Bite-sized lessons, quizzes, levels, and daily streaks make growing your Deen a habit.',
  },
  {
    title: 'Scholar-Approved',
    description:
      'Every lesson is rooted in the Quran and authentic Sunnah and reviewed by qualified scholars.',
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

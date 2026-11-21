'use client'
export default function ProfileBody() {
  return (
    <div className="w-[90%] flex flex-col lg:flex-row gap-3 m-3">
      <div className="w-[50%] relative rounded-3xl bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-2 shadow-xl dark:shadow-2xl shadow-gray-300 dark:shadow-gray-800">
        details
      </div>
      <div className="w-[50%] relative rounded-3xl bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-2 shadow-xl dark:shadow-2xl shadow-gray-300 dark:shadow-gray-800">
        resume | recruiter stats 
      </div>
    </div>
  )
}

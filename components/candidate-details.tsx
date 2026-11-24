
export default function CandidateDetails() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-3 gap-3">
        <h2 className="text-2xl font-bold">
            Candidate Details
        </h2>

        <div className="w-full flex flex-row ">
            <h4 className="text-xl font-semibold"> 
                Description:
            </h4>
            <span className="mx-2 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ex culpa officia esse eius veritatis labore rerum ratione voluptatem. Reiciendis nostrum nam porro eveniet soluta itaque illo nulla excepturi totam?
            </span>
        </div>
        <div className="w-full flex flex-row ">
            <h4 className="text-xl font-semibold"> 
                skills:
            </h4>
            <span className="mx-2 grid grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="w-fit text-white bg-gray-700 dark:text-black dark:bg-gray-400 rounded-3xl p-1">
                    javascript
                </div>
                <div className="w-fit text-white bg-gray-700 dark:text-black dark:bg-gray-400 rounded-3xl p-1">
                    nextjs
                </div>
                <div className="w-fit text-white bg-gray-700 dark:text-black dark:bg-gray-400 rounded-3xl p-1">
                    expressjs
                </div>
                <div className="w-fit text-white bg-gray-700 dark:text-black dark:bg-gray-400 rounded-3xl p-1">
                    mongodb
                </div>
            </span>
        </div>
        <div className="w-full flex flex-row ">
            <h4 className="text-xl font-semibold"> 
                Description:
            </h4>
            <span className="mx-2 ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ex culpa officia esse eius veritatis labore rerum ratione voluptatem. Reiciendis nostrum nam porro eveniet soluta itaque illo nulla excepturi totam?
            </span>
        </div>
        
    </div>
  )
}

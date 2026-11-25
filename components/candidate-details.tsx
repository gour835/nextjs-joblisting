import { PencilIcon } from "lucide-react";

export default function CandidateDetails() {
    return (
        <div className="w-full h-fit flex flex-col justify- items-center p-3 gap-3">
            <h2 className="text-2xl font-bold">
                Candidate Details
            </h2>

            <div className="w-full flex flex-col ">
                <h4 className="text-xl font-semibold">
                    Description:
                </h4>
                <span className="mx-2 ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto ex culpa officia esse eius veritatis labore rerum ratione voluptatem. Reiciendis nostrum nam porro eveniet soluta itaque illo nulla excepturi totam?
                </span>
            </div>
            <div className="w-full flex flex-col  ">
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
            <div className="w-full flex flex-col  ">
                <h4 className="text-xl font-semibold">
                    Work Experiance:
                </h4>
                <span className="mx-2  ">
                    <div className="border-4 rounded-2xl p-2 my-2">
                        <div>

                            <span className="text-lg font-semibold capitalize">
                                name:
                            </span>
                            <span >
                                identifiler
                            </span>

                        </div>

                        <div className="lg:flex">

                            <span className="text-lg font-semibold capitalize">
                                skills:
                            </span>
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

                        <div>

                            <span className="text-lg font-semibold capitalize">
                                Months:
                            </span>
                            <span >
                                identifiler
                            </span>

                        </div>
                        <div>

                            <span className="text-lg font-semibold capitalize">
                                compensation:
                            </span>
                            <span >
                                identifiler| optional
                            </span>

                        </div>
                    </div>
                    <div className="border-4 rounded-2xl p-2 my-2">
                        <div>

                            <span className="text-lg font-semibold capitalize">
                                name:
                            </span>
                            <span >
                                identifiler
                            </span>

                        </div>

                        <div className="lg:flex">

                            <span className="text-lg font-semibold capitalize">
                                skills:
                            </span>
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

                        <div>

                            <span className="text-lg font-semibold capitalize">
                                Months:
                            </span>
                            <span >
                                identifiler
                            </span>

                        </div>
                        <div>

                            <span className="text-lg font-semibold capitalize">
                                compensation:
                            </span>
                            <span >
                                identifiler| optional
                            </span>

                        </div>
                    </div>

                </span>
            </div>
            <button className="w-fit h-fit p-1 rounded-full bg-gray-500 text-white absolute inset-e-4 top-4 hover:bg-gray-400">
                <PencilIcon className="w-4 h-4" />
            </button>
        </div>
    )
}

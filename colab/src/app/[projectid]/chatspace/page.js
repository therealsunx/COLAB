const dummyData = [
    { name: "Alice", message: "Hello there!" },
    { name: "Bob", message: "How are you?" },
    { name: "Charlie", message: "Nice weather today." },
    { name: "David", message: "I'm working on a project." },
    { name: "Emma", message: "Any plans for the weekend?" }
];

export default function chatspace() {
    return (
        <div className="w-full flex flex-col items-center p-12 gap-8">
            <p className="text-3xl font-bold underline">ChatSpace</p>

            <div className="flex flex-col gap-8 bg-[#444] w-1/2 p-12 rounded-xl ">
                {dummyData.map((d, i) => (
                    <div className="flex rounded-xl bg-[#fff] text-black px-4 py-2 items-center">
                        <div className="rounded-full size-12 bg-[#0aa]" />
                        <div className="flex flex-col items-start">
                            <p className="px-6 text-[0.8rem]">{d.name}</p>
                            <p className="px-6 py-2 text-xl">{d.message}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
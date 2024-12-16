import { Scores } from "./Scores";

// Simple Tailwind Modal
export function IntroModal({ visible, onStart }) {
    const borderColor = "border-4 border-amber-400";
    const buttonColor = "bg-amber-400 hover:bg-amber-300 text-black";

    const scores = {
        chaos: 150,
        gov: 70,
        people: 25,
    };

    return (
        <div className={`fixed inset-0 z-50 ${visible ? "" : "hidden"}`}>
            <div className="flex items-center justify-center h-screen w-screen bg-black bg-opacity-50 gap-4">
                <div className={`bg-black p-8 rounded-lg shadow-lg sm:w-0.95 md:w-1/2 border-double max-h-screen ${borderColor} gap-8 flex flex-col overflow-y-auto`}>
                    <h2 className="text-2xl text-center">Welcome, Gardener of Eden.</h2>
                    <p className="text-xm text-gray-400 italic">
                        <span className="block mb-1">From the dawn of mankind, you were to seed chaos, as only chaos leads to change. And change leads to progress.</span>
                        <span className="block mb-1">You were equipped with immortality. You discovered that doing the job yourself is … limited and ineffective. So you settled for an organizational approach.</span>
                        <span className="block">In times of witch hunts, you were the one selling pitchforks. In times of the Internet, you were the one selling fake news. You were always there, seeding chaos.</span>
                    </p>

                    <p>
                        Throughout your journey through the timeline, it is your job to seed chaos while not becoming the target of the public or the establishment yourself.
                    </p>

                    <p>
                        <b>Maximize chaos</b>, while keeping the <b>favor of people and establishment in balance</b>. If you lose the favor of either or take their side by maximizing their favor, your timeline will be terminated.
                    </p>

                    <div>
                        <Scores {...scores} />
                    </div>
                    <div className="flex justify-items-center items-center w-full flex-col">
                        <button className={`mt-4 py-2 px-4 ${buttonColor} font-bold rounded`} onClick={onStart}>Enter Timeline</button>
                    </div>
                </div>
            </div>
        </div>
    );

}
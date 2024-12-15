import { Scores } from "./Scores";

// Simple Tailwind Modal
export function GameOverModal({ scores, won, looseReason, visible, remount }) {
    const borderColor = won ? "border-4 border-amber-400" : "border-8 border-stone-950 bg-red-950";
    const buttonColor = won ? "bg-amber-400 hover:bg-amber-300 text-black" : "bg-stone-950 hover:bg-stone-900 text-gray-300";
    // Cheap remount solution
    const playAgain = () => {
        if (remount) {
            remount();
        } else {
            window.location.reload();
        }
    }

    return (
        <div className={`fixed inset-0 z-50 ${visible ? "" : "hidden"}`}>
            <div className="flex items-center justify-center h-screen w-screen bg-black bg-opacity-50 gap-4">
                <div className={`bg-black p-8 rounded-lg shadow-lg sm:w-0.95 md:w-1/2 border-double max-h-screen ${borderColor} gap-8 flex flex-col overflow-y-auto`}>
                    <h2 className="text-2xl text-center">{won ? "Timeline ended successfully. " : "Timeline failed. Terminating..."}</h2>
                    <div>
                        <Scores {...scores} highlight={looseReason} />
                    </div>
                    <div className="flex justify-items-center items-center w-full flex-col">
                        <button className={`mt-4 py-2 px-4 ${buttonColor} font-bold rounded`} onClick={playAgain}>Enter New Timeline</button>
                    </div>
                </div>
            </div>
        </div>
    );

}
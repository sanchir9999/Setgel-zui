"use client";

type Props = {
    percent: number;
    showLabel?: boolean;
};

export default function ProgressBar({ percent, showLabel = true }: Props) {
    const p = Math.max(0, Math.min(100, Number.isFinite(percent) ? percent : 0));

    return (
        <div className="w-full space-y-3">
            {/* Progress info */}
            <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                <span>Явц</span>
                <span>{p}% дууссан</span>
            </div>

            {/* Progress bar */}
            <div
                className="relative w-full h-6 rounded-xl
                    bg-gradient-to-r from-gray-100 to-gray-200 
                    dark:from-zinc-800 dark:to-zinc-700
                    ring-2 ring-blue-200 dark:ring-blue-800
                    overflow-hidden shadow-inner"
            >
                {/* Fill */}
                <div
                    className="
                        h-full rounded-xl
                        transition-all duration-500 ease-out
                        bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600
                        shadow-lg
                        relative
                    "
                    style={{ width: `${p}%` }}
                >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                </div>

                {/* Label */}
                {showLabel && p > 15 && (
                    <div className="absolute inset-0 grid place-items-center">
                        <span className="text-sm font-bold text-white drop-shadow-lg">
                            {p}%
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

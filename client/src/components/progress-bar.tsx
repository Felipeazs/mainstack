import { useEffect, useState } from "react"

import { Progress } from "./ui/progress"

type ProgressProps = {
	status: number
	min: number
}

export function ProgressBar({ status, min }: ProgressProps) {
	const [progress, setProgress] = useState<number>(min)

	useEffect(() => {
		const interval = setInterval(() => {
			// eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect
			setProgress((prevState) => {
				if (status === 0) {
					clearInterval(interval)
					return 100
				}

				const nextProgress = prevState + 1

				if (nextProgress > 100) {
					return min
				}

				return nextProgress
			})
		}, 100)

		if (progress === 100) {
			setProgress(min)
		}

		return () => clearInterval(interval)
	}, [status, min])

	return (
		<Progress
			max={100}
			className={progress === 100 ? "bg-white" : "bg-slate-600"}
			value={progress}
		/>
	)
}

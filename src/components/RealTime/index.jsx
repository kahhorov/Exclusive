import { useEffect, useState } from "react";

function RealTime({ isStyle }) {
    const [time, setTime] = useState(() => {
        const savedTime = localStorage.getItem("timer");

        return savedTime
            ? JSON.parse(savedTime)
            : {
                days: 9,
                hours: 23,
                minutes: 19,
                seconds: 59,
            };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                const { days, hours, minutes, seconds } = prev;

                if (
                    days === 0 &&
                    hours === 0 &&
                    minutes === 0 &&
                    seconds === 0
                ) {
                    clearInterval(timer);
                    return prev;
                }

                let newDays = days;
                let newHours = hours;
                let newMinutes = minutes;
                let newSeconds = seconds;

                if (newSeconds > 0) {
                    newSeconds--;
                } else if (newMinutes > 0) {
                    newMinutes--;
                    newSeconds = 59;
                } else if (newHours > 0) {
                    newHours--;
                    newMinutes = 59;
                    newSeconds = 59;
                } else if (newDays > 0) {
                    newDays--;
                    newHours = 23;
                    newMinutes = 59;
                    newSeconds = 59;
                }

                const newTime = {
                    days: newDays,
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds,
                };

                localStorage.setItem("timer", JSON.stringify(newTime));

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            {
                isStyle ?
                    <div className="flex gap-3">
                        <div className="flex flex-col-reverse w-fit h-fit px-3 py-0.5 lg:flex lg:flex-col gap-0 bg-white lg:w-16 lg:h-16 rounded-full justify-center items-center">
                            <span className="text-xl lg:text-3xl font-bold"> {time.days}</span>
                            <span className="text-[0.6rem] text-gray-600">Days</span>
                        </div>
                        <div className="flex flex-col-reverse w-fit h-fit px-3 py-0.5 lg:flex lg:flex-col gap-0 bg-white lg:w-16 lg:h-16 rounded-full justify-center items-center">
                            <span className="text-xl text-3xl font-bold">{time.hours} </span>
                            <span className="text-[0.6rem] text-gray-600">Hours</span>
                        </div>
                        <div className="flex flex-col-reverse w-fit h-fit px-3 py-0.5 lg:flex lg:flex-col gap-0 bg-white lg:w-16 lg:h-16 rounded-full justify-center items-center">
                            <span className="text-xl text-3xl font-bold"> {time.minutes}</span>
                            <span className="text-[0.6rem] text-gray-600">Minutes</span>
                        </div>
                        <div className="flex flex-col-reverse w-fit h-fit px-3 py-0.5 lg:flex lg:flex-col gap-0 bg-white lg:w-16 lg:h-16 rounded-full justify-center items-center">
                            <span className="text-xl font-bold">{time.seconds}</span>
                            <span className="text-[0.6rem] text-gray-600">Seconds</span>
                        </div>
                    </div>
                    : <div className="flex gap-3">
                        <div className="flex flex-col gap-0">
                            <span className="text-[0.6rem] text-gray-600">Days</span>
                            <span className="flex gap-3 text-3xl font-bold"> {time.days} <span className="font-bold  -mt-0.3 text-red-400">:</span></span>
                        </div>
                        <div className="flex flex-col gap-0">
                            <span className="text-[0.6rem] text-gray-600">Hours</span>

                            <span className="flex gap-3 text-3xl font-bold">{time.hours} <span className="font-bold  -mt-0.3 text-red-400">:</span></span>
                        </div>
                        <div className="flex flex-col gap-0">
                            <span className="text-[0.6rem] text-gray-600">Minutes</span>

                            <span className="flex gap-3 text-3xl font-bold"> {time.minutes} <span className="font-bold  -mt-0.3 text-red-400">:</span></span>
                        </div>
                        <div className="flex flex-col gap-0">
                            <span className="text-[0.6rem] text-gray-600">Seconds</span>
                            <span className="text-3xl font-bold">{time.seconds}</span>
                        </div>
                    </div>
            }
        </>
    );
}

export default RealTime;
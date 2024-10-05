//----------------------------------------STEP-1:
//-----------THIS STEP ENABLES CLIENT-SIDE RENDERING:

"use client";
//state, ref(reference) and effect helps to store data and to use features without explaining class
import { useState, useRef, useEffect, ChangeEvent } from "react";
//Input and Button are predefined shadcn components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

//-----------------------------------------STEP-2:
//------------FOR REFERENCES:

export default function Countdown() {
//duration time sets by the user
const [duration, setDuration] = useState<number | string>("");
//timeleft defines how much time is left
const [timeLeft, setTimeLeft] = useState<number>(0);
//active defines if the timer is running
const [isActive, setIsActive] = useState<boolean>(false);
//pasued defines if the timer is paused or stoped
const [isPaused, setIsPaused] = useState<boolean>(false);
//time reference defines the timer id to store and use to control interval
const timerRef = useRef<NodeJS.Timeout | null>(null);

//-----------------------------------------STEP-3:
//------------USE OF DIFFERENT FUNCTIONS:

//handleSetDuration based on user's input if it is positive in number it sets remaining time 
//and denied the timer to be active or pasued and clears existing time interval
const handleSetDuration = () : void => {
    if(typeof duration === 'number' && duration > 0) {
        setTimeLeft(duration);
        setIsActive(false);
        setIsPaused(false);
        if(timerRef.current) {
            clearInterval(timerRef.current);
        };
    };
};

//-----------------------------------------STEP-4:

//handleStart function starts countdown if any time left.It activated the timer and makes sure it is not paused
const handleStart = () : void => {
    if(timeLeft > 0) {
        setIsActive(true);
        setIsPaused(false);
    };
};

//-----------------------------------------STEP-5:

//handlePause works to stop the timer when it is active and clear all the timer interval
const handlePause = () : void => {
    if(isActive) {
        setIsPaused(true);
        setIsActive(false);
        if(timerRef.current) {
            clearInterval(timerRef.current);
        };
    };
};

//-----------------------------------------STEP-6:

//handlereset resets all the action performed in task by user means timer is reseted again from start
const handleReset = () : void => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === 'number' ? duration : 0); 
        if(timerRef.current) {
            clearInterval(timerRef.current);
        };
};

//-----------------------------------------STEP-7:
//--------------------Use of Effects for Logics:

//useEffect works to decrease time every second when timer is active and not pasued by user
//it also ensure that the timer is cleared when components is updated or unmount
//use to run the timer
useEffect(() => {
    if(isActive && !isPaused) {
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if(prevTime <= 1) {
                    clearInterval(timerRef.current!);
                    return 0;
                }
                return prevTime -1;
            });
        }, 1000);
    };
//cleanup function when component stops or variables change it stops working      
return () => {
    if(timerRef.current) {
        clearInterval(timerRef.current);
    };
};  
}, [isActive, isPaused]);

//----------------------------------------STEP-8:
//------------------Helper Functions for timer:

//formattime helps to change timer in minutes and seconds and string format it in minutes/seconds (mm)
//and change the timer single digit(like:  7) with two digits(like:  07)
const formatTime = (time: number) : string => {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}: ${String(seconds).padStart(2, "0")}`
};

//handledurationchange works when user type anything in input value it sets the function
//(e) is that value which user puts in input (like:   10seconds, 20seconds)
//target ensures whatever value comes it convert into number and don't be blank:
const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
};

//---------------------------------------STEP-9:
//---------------Return Statement of JSX:

//return statement defines the structure of the countdown timer UI with <div> container and flexbox to style.
return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Timer box container */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Title of the countdown timer */}
        <h1 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200 text-center">
          COUNTDOWN TIMER
        </h1>
        {/* Input and set button container */}
        <div className="flex items-center mb-6">
          <Input
            type="number"
            id="duration"
            placeholder="Enter time duration in seconds"
            value={duration}
            onChange={handleDurationChange}
            className="flex-1 mr-4 rounded-md border-black-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={handleSetDuration}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            SET
          </Button>
        </div>
        {/* Display the formatted time left */}
        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handleStart}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            {isPaused ? "RESUME" : "START"}
          </Button>
          <Button
            onClick={handlePause}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            PAUSE
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="text-gray-800 dark:text-gray-200"
          >
            RESET
          </Button>
        </div>
      </div>
    </div>
  );
};
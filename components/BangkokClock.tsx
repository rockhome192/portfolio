"use client";

import { useEffect, useState } from "react";

export function BangkokClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const update = () => {
      const t = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(t);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-text tabular-nums">
      {time} ICT
    </span>
  );
}

"use client";

import { useState } from "react";
import ClientPage from "./ClientPage";

export default function Home() {

    const [remounting, setRemounting] = useState(false);
    const remount = () => {
        setRemounting(true);
        setTimeout(() => setRemounting(false), 0);
    }

    return remounting ? '...' : <ClientPage remount={remount} />;
}
'use client';

import { useState } from "react";

export interface ToggleCardPayload {
    heading: string;
    content: string;
    key: number;
}

export default function ToggleCard({payload}: {payload: ToggleCardPayload}) {
    const [showing, setShowing] = useState(false);
    const containerClass = ``;

    return (
        <div className='p-4 bg-pink-600 bg-opacity-30 flex items-center rounded-md'>
        </div>
    );
}
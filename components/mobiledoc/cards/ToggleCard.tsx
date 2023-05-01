'use client';

import { useState } from "react";

export interface Props {
    payload: {
        heading: string;
        content: string;
        key: number;
    }
}

export default function ToggleCard(props: Props) {
    const payload = props.payload;

    const [showing, setShowing] = useState(false);
    const containerClass = ``;

    return (
        <div className='p-4 bg-pink-600 bg-opacity-30 flex items-center rounded-md'>
        </div>
    );
}
'use client';

export interface Props {
    payload: {
        alignment: string;
        buttonText: string;
        buttonUrl: string;
        key: number;
    }
}

export default function ButtonCard(props: Props) {
    const payload = props.payload;

    const containerClass = `flex w-full justify-${payload.alignment == 'center' ? 'center' : 'start'}`;

    return (
        <div className={containerClass}>
            <button onClick={(e) => {
                e.preventDefault();
                window.location.href = payload.buttonUrl;
            }} className='text-center p-3 bg-pink-600 hover:bg-pink-400 rounded-md transition transform-gpu duration-300'>{payload.buttonText}</button>
        </div>
    );
}
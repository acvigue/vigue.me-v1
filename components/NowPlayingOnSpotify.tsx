'use client';

import { useEffect, useState } from "react";
import { clean } from 'profanity-cleaner'
import MarqueeText from "react-marquee-text"

const getData = async () => {
    const dto = await fetch("https://spotify-bpm.fiftytwo.workers.dev/current");
    return await dto.json();
}

export default function NowPlaying() {
    const [hasSong, setHasSong] = useState(false)
    const [imageURL, setImageURL] = useState("")
    const [songName, setSongName] = useState("")
    const [artist, setArtist] = useState("")
    const [shouldMarquee, setShouldMarquee] = useState(false)

    useEffect(() => {
        getData().then(dto => {
            if (dto && dto.item && dto.item.is_playing) {
                const albumImages = dto.item.item.album.images;
                setHasSong(true)
                setImageURL(albumImages[albumImages.length - 1].url)
                setSongName(dto.item.item.name)
                setArtist(dto.item.item.artists[0].name)

                const totalLength = songName.length + 3 + artist.length;
                if (totalLength > 30) {
                    setShouldMarquee(true)
                }
            }

        })
    }, [artist.length, songName.length]);
    return (
        hasSong ? (
            <div className="flex gap-2 items-center dark:bg-gray-800 bg-gray-200 rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageURL} alt={songName} className="rounded-l-md w-14 h-14" />
                <div className="flex flex-col pr-2 w-44 line-clamp-1 whitespace-nowrap overflow-clip">
                    <span className="dark:text-gray-400 text-gray-600 text-xs">I&apos;m currently listening to</span>
                    {shouldMarquee ? (
                        <MarqueeText duration={10} direction="right" textSpacing="1rem" className="font-semibold text-xs">
                            <span className="dark:text-gray-300 text-gray-700">{clean(songName)} <span className="text-gray-400 font-normal">by {clean(artist)}</span></span>
                        </MarqueeText>
                    ) : (
                        <span className="dark:text-gray-300 text-gray-700 font-semibold text-xs">{clean(songName)} <span className="dark:text-gray-400 text-gray-600 font-normal">by {clean(artist)}</span></span>
                    )}
                </div>
            </div>
        ) : null
    )
}
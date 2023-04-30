import { getResizedImageURLS } from "@/lib/imgproxy";

export default function SmartImage({ sources, fallback, alt, sizes='100vw', ...props }) {
    return (
        <picture>
            {Object.keys(sources).map((format) => (
                <source
                    type={format}
                    key={format}
                    srcSet={sources[format].srcSet}
                />
            ))}
            <img src={fallback} alt={alt} {...props} />
        </picture>
    );
}
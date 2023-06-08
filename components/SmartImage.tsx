export default function SmartImage({ srcset, ...props }) {
    if(!srcset) {
        return (<></>)
    }
    const fallback = srcset[0].src
    const srcs = [];
    for(const src of srcset) {
        srcs.push(`${src.src} ${src.width.toFixed(0)}w`)
    }
    return (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img src={fallback} srcSet={srcs.join(", ")} {...props} />
    );
}
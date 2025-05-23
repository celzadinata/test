import Script from "next/script";

interface AdsenseProps {
  pId: string;
}

export default function AdSense({ pId }: AdsenseProps) {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}

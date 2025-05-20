import Script from "next/script";

interface AdsenseProps {
  pId: string;
}

export default function Adsense({ pId }: AdsenseProps) {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}

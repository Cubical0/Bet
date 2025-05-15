import { FC } from "react";
import Head from "next/head";

interface SocialMetaImagesProps {
  title?: string;
}

export const SocialMetaImages: FC<SocialMetaImagesProps> = ({
  title = "Ajmeri Satta King - Live Results & Charts",
}) => {
  return (
    <Head>
      {/* Open Graph Image */}
      <meta
        property="og:image"
        content="https://www.ajmeri-satta-king.com/og-image.jpg"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter Image */}
      <meta
        name="twitter:image"
        content="https://www.ajmeri-satta-king.com/twitter-image.jpg"
      />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional Image Meta Tags */}
      <meta
        name="image"
        content="https://www.ajmeri-satta-king.com/og-image.jpg"
      />
      <link
        rel="image_src"
        href="https://www.ajmeri-satta-king.com/og-image.jpg"
      />
    </Head>
  );
};

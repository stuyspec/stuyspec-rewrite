import React from "react";
import Image from "next/image";
// create social media share button
interface ShareButtonProps {
  url: string;
  provider: string;
}

interface shareTypes {
  [key: string]: string;
}

const shareUrls: shareTypes = {
  facebook: "https://www.facebook.com/sharer/sharer.php?u=",
  twitter: "https://twitter.com/intent/tweet?url=",
  linkedin: "https://www.linkedin.com/shareArticle?mini=true&url=",
  email: "mailto:?subject=&body=",
};

const ShareButton = ({ url, provider }: ShareButtonProps) => {
  return (
    <a
      href={shareUrls[provider] + url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={`/images/${provider}.svg`}
        alt={provider}
        width="36px"
        height="36px"
        className="share-button"
      />
    </a>
  );
};

export default ShareButton;

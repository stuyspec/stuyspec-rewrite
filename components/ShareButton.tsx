import React from "react";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaRegEnvelope,
} from "react-icons/fa";

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
  email: "mailto:?subject=Check%20out%20this%20article!&body=",
};

const ShareButton = ({ url, provider }: ShareButtonProps) => {
  const returnIcon = () => {
    switch (provider) {
      case "facebook":
        return <FaFacebook size={24} />;
      case "twitter":
        return <FaTwitter size={24} />;
      case "linkedin":
        return <FaLinkedin size={24} />;
      case "email":
        return <FaRegEnvelope size={24} />;
      default:
        return <FaRegEnvelope size={24} />;
    }
  };

  return (
    <a
      href={shareUrls[provider] + url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginRight: "1rem" }}
    >
      {returnIcon()}
    </a>
  );
};

export default ShareButton;

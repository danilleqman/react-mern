import React from "react";
import { LinkCard } from "./LinkCard";

export const LinkCards = ({ links }) => {
  return (
    <div>
      {links.map((link) => {
        return <LinkCard link={link} />;
      })}
    </div>
  );
};

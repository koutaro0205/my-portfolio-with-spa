import React from "react";
import { Helmet } from "react-helmet-async";

export const HeadBlock = ({title}) => {
  return (
    <Helmet>
      <title>{title ? `ZuboRecipes | ${title}` : 'ZuboRecipes'}</title>
    </Helmet>
  );
};
import React from "react";
import { HeadBlock } from "../HeadBlock";

const NotFound = () => {
  return (
    <>
      <HeadBlock title={"Not Found"}/>
      <section className="section content-width">
        <h1 className="sectionTitle">Not Found</h1>
        <p>お探しのページは見つかりませんでした。</p>
      </section>
    </>
  )
}

export default NotFound;
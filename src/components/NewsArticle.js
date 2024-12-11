import React from "react";
import Spinner from "./Spinner.js";
import placeholder from "./../assets/placeholder.webp";

const ImageLoader = (props) => {
  const [loaded, setLoaded] = React.useState(false);
  const [src, setSrc] = React.useState(props.src);

  return (
    <div className={`w-full grow relative ${loaded ? "bg-grey-800" : ""}`}>
      <img
        src={src ? src : placeholder}
        alt="img"
        className="absolute top-0 left-0 w-full h-full"
        onLoad={() => setLoaded(true)}
        onError={({ currentTarget }) => {
          // setLoaded(true)
          currentTarget.onerror = null;
          setSrc(placeholder);
        }}
      />

      {!loaded && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

const NewsArticle = ({ url, title, author, date, image }) => {
  let publishedAt = new Date(date);
  let titleSplit = title.split("-");
  let realTitle = titleSplit[0];
  let company = titleSplit[titleSplit.length - 1];

  return (
    <div className="w-[350px] h-[556px] mb-4 mx-4 overflow-hidden border-[5px] bg-component-light-bg dark:bg-component-dark-bg border-component-border rounded-[21px] flex flex-col">
      <ImageLoader src={image} />

      <div className="w-full h-fit px-8 py-7 font-body dark:text-white text-black">
        <h1 className="text-xl">{realTitle}</h1>
        <h1 className="font-thin text-base leading-5 ml-3 my-5">
          Author: {author !== null ? author : "Anonymous"}
          <br />
          {publishedAt.toDateString()}
          <br />
          {company}
        </h1>
        <a className="text-lg my-auto font-title hover:underline" href={url}>
          Go To Page
        </a>
      </div>
    </div>
  );
};

export default NewsArticle;

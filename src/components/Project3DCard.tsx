"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { highlightTextParts } from "@/lib/highlightText";

type Project3DCardProps = {
  title: string;
  img: string;
  desc: string;
  url: string;
  badge: string;
};

export default function Project3DCard({
  title,
  img,
  desc,
  url,
  badge,
}: Project3DCardProps) {
  const renderHighlightedText = (text: string) =>
    highlightTextParts(text).map((part, index) =>
      part.kind ? (
        <span key={`${part.text}-${index}`} className={`focus-${part.kind}`}>
          {part.text}
        </span>
      ) : (
        <React.Fragment key={`${part.text}-${index}`}>{part.text}</React.Fragment>
      )
    );

  return (
    <CardContainer className="inter-var w-full" containerClassName="py-4">
      <CardBody className="group/card relative h-full min-h-[31rem] w-full rounded-lg border-2 border-[#422800] bg-[#fbeee0] p-5 shadow-[6px_6px_0_0_#422800] transition-shadow hover:shadow-[10px_10px_0_0_#422800] sm:min-h-[30rem]">
        <CardItem
          translateZ={50}
          className="flex w-full items-start justify-between gap-3"
        >
          <h2 className="text-xl font-bold leading-tight text-[#422800]">
            {renderHighlightedText(title)}
          </h2>
          <span className="shrink-0 rounded-full border border-[#422800] bg-white px-3 py-1 text-xs font-bold uppercase tracking-normal text-[#422800]">
            {badge}
          </span>
        </CardItem>

        <CardItem translateZ={100} className="mt-5 w-full">
          <img
            src={img}
            height="422"
            width="750"
            className="h-52 w-full rounded-lg border-2 border-[#422800] object-cover group-hover/card:shadow-xl"
            alt={title}
          />
        </CardItem>

        <CardItem
          as="p"
          translateZ={60}
          className="mt-5 min-h-24 text-sm leading-6 text-[#422800]"
        >
          {renderHighlightedText(desc)}
        </CardItem>

        <div className="mt-8 flex items-center justify-end">
          <CardItem
            translateZ={35}
            as="a"
            href={url}
            className="rounded-full border-2 border-[#422800] bg-white px-5 py-3 text-sm font-bold text-[#422800] shadow-[4px_4px_0_0_#422800] transition hover:bg-[#fff7ef] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0_0_#422800]"
          >
            View project
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

"use client";

import ScrollArea from "../ui/scroll-area";
import DMItem from "./dm-item";

const DMPannelContent = () => {
  return (
    <>
      <div className="mx-2 pt-1">
        <DMItem
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="any"
          title="Rohit Jain"
          backgroundHover="hover:bg-zinc-800"
        />
        <DMItem
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="any"
          title="Rohit Jain"
          backgroundHover="hover:bg-zinc-800"
        />
        <DMItem
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="any"
          title="Rohit Jain"
          backgroundHover="hover:bg-zinc-800"
        />
        <DMItem
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="any"
          title="Rohit Jain"
          backgroundHover="hover:bg-zinc-800"
        />
        <DMItem
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="any"
          title="Rohit Jain"
          backgroundHover="hover:bg-zinc-800"
        />
        <DMItem
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="any"
          title="Rohit Jain"
          backgroundHover="hover:bg-zinc-800"
        />
        <DMItem
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="any"
          title="Rohit Jain"
          backgroundHover="hover:bg-zinc-800"
        />
        <DMItem
          image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          altname="any"
          title="Rohit Jain"
          backgroundHover="hover:bg-zinc-800"
        />
      </div>
    </>
  );
};

const DMPannel = () => {
  return (
    <>
      <div className="h-[100vh] bg-[rgb(71,71,79)] pb-2 w-[255px]">
        <button className="flex justify-between items-center p-3 shadow-md focus:outline-0 w-[100%] rounded-sm hover:bg-zinc-600">
          <span>Direct Messages</span>
        </button>
        <ScrollArea
          width="w-[25
            backgroundHover0px]"
          backgroundColor="bg-[rgb(71,71,79)]"
          height="h-[75%]"
          content={<DMPannelContent />}
          padding={false}
        />
      </div>
    </>
  );
};

export default DMPannel;

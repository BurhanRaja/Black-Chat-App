"use client";

import { Search } from "lucide-react";
import ScrollArea from "../ui/scroll-area";
import DMItem from "./dm-item";
import ProfileItem from "../profile-item";

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
      <div className="h-[100vh] bg-[rgb(71,71,79)] pb-2 w-[255px] ml-20">
        <button className="flex justify-between items-center p-3 shadow-md focus:outline-0 w-[100%] rounded-sm bg-[rgb(71,71,79)] hover:bg-zinc-600">
          <span>Direct Messages</span>
        </button>
        <div className="flex justify-start items-center mt-3 mx-2 relative px-0.5">
          <Search className="absolute left-2.5 text-zinc-500" size={17} />
          <input
            className="p-1.5 pl-8 w-[100%] rounded-md bg-[rgb(43,43,47)] outline-none text-zinc-500 channel-search text-sm"
            placeholder="Find Conversation"
          />
        </div>
        <ScrollArea
          width="w-[250px]"
          backgroundColor="bg-[rgb(71,71,79)]"
          height="h-[75%]"
          content={<DMPannelContent />}
          padding={false}
        />
        <ProfileItem />
      </div>
    </>
  );
};

export default DMPannel;

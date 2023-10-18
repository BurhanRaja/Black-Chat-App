"use client";
import Avatar from "@/components/ui/avatar";
import Tooltip from "@/components/ui/tooltip";
import ScrollArea from "../ui/scroll-area";
import { Plus } from "lucide-react";

const ServerPanel = () => {
  return (
    <>
      <ScrollArea
        width="w-[75px]"
        height="h-[100vh]"
        content={
          <>
            <div className="my-3">
              <Tooltip
                trigger={
                  <button>
                    <Avatar
                      image=""
                      altname=""
                      radius=""
                      fallback={"B"}
                      fallbackBackgroundColor="bg-slate-900 hover:bg-white"
                      fallbackColor="text-xl hover:text-slate-900"
                      transition={true}
                    />
                  </button>
                }
                content="Hello"
              />
            </div>
            <hr className="border-gray-500" />
            <div className="my-3">
              <Tooltip
                trigger={
                  <button>
                    <Avatar
                      image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                      altname="Some IMage"
                      radius=""
                      transition={true}
                    />
                  </button>
                }
                content="Hello"
              />
            </div>
            <div className="my-3">
              <Tooltip
                trigger={
                  <button>
                    <Avatar
                      image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                      altname="Some IMage"
                      radius=""
                      transition={true}
                    />
                  </button>
                }
                content="Hello"
              />
            </div>
            <hr className="border-gray-500" />
            <div className="my-3">
              <Tooltip
                trigger={
                  <button>
                    <Avatar
                      image=""
                      altname="Some IMage"
                      radius=""
                      fallback={<Plus size={20} className="" />}
                      fallbackBackgroundColor="bg-gray-800 hover:bg-green-500"
                      fallbackColor="text-green-500 hover:text-gray-800"
                      transition={true}
                    />
                  </button>
                }
                content="Hello"
              />
            </div>
          </>
        }
        padding={true}
      ></ScrollArea>
      {/* </section> */}
    </>
  );
};

export default ServerPanel;

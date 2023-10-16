"use client";
import Avatar from "@/components/ui/avatar";
import Tooltip from "@/components/ui/tooltip";

const ServerPanel = () => {
  return (
    <>
      <section className="bg-slate-800 w-[75px] h-[100vh] p-3">
        <div className="my-3">
          <Tooltip
            trigger={
              <button>
                <Avatar
                  image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
                  altname="Some IMage"
                  radius="large"
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
                  radius="large"
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
                  radius="large"
                  transition={true}
                />
              </button>
            }
            content="Hello"
          />
        </div>
      </section>
    </>
  );
};

export default ServerPanel;

import Avatar from "@/components/ui/avatar";
import Image from "next/image";

export default function Home() {
  return (
    <Avatar
      image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      altname="Some IMage"
      radius="large"
      transition={true}
    />
  );
}

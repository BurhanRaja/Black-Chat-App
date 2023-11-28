import AppDMLayout from "@/components/app-directmessage-layout";

const DMPage = ({ params }: { params: { conversationId: string } }) => {
  return (
    <>
      <AppDMLayout conversationId={params.conversationId} />
    </>
  );
};

export default DMPage;

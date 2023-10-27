import Login from "@/components/login";

export default function Signin() {
  return (
    <>
      <Login />
    </>
  );
}

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }

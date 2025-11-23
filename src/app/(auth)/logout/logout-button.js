'use server'
//import { signIn, signOut } from "next-auth/react";
import { signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";

// import { isRedirectError } from "next/dist/client/components/redirect";
// import { redirect } from "next/dist/server/api-utils";


export async function logOut() {
  await signOut()
  //redirect('/')
    retutn
}




// export const LogoutButton = () => {
//   return (
//     <Button onClick={() => signOut()}
//       type="submit" color="primary"
//       fullWidth
//       size="lg"
//     >
//       Logout
//     </Button>
//   );
// };
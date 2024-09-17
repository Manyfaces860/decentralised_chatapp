import { useContract } from "@/contexts/useContract";
import { getSession, signOut } from "next-auth/react";
import { useEffect } from "react";

// gets a prop from getServerSideProps
function User({ user }) {

  const { provider, contract, signer, ListenForTransactionMine } = useContract()
  
  useEffect(() => {
    const RegisterUserOrCheckIfHeExists = async () => {
      console.log('starting registering')
      if (user && provider && contract) {
        console.log('not dead')
        try {
          console.log('1')
          const transactionResponse = await contract.getUser();
          if (String(transactionResponse[0]) === String(signer.address)){
            console.log('you already have an account')
          } 
          else {
            const transactionResponse = await contract.registerUser(String(signer.address) , String('raj'));
            console.log('2')
            console.log(transactionResponse);
            console.log('3')
            await ListenForTransactionMine(transactionResponse);
            console.log('Done!');
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    RegisterUserOrCheckIfHeExists()
  },[])

  return (
    <div>
      <h4>User session:</h4>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default User;
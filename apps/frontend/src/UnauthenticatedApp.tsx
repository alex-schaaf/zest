import SignIn from "@/components/SignIn"
import Register from "./Register"
// import { useRoute } from "wouter"
import * as Toast from "@radix-ui/react-toast"

const UnauthenticatedApp = () => {
  // const [register] = useRoute("/register")

  return (
    <Toast.Provider>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[100000] m-0 flex w-[390px] flex-col p-6" />
      <div className="mx-auto w-96">
        {/* {register ? <Register /> : <SignIn />} */}
      </div>
    </Toast.Provider>
  )
}

export default UnauthenticatedApp

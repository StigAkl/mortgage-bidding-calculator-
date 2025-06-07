import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in")

  return redirect("/mortgage-intereste-calculator");
}

export default Home;
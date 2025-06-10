import { loadPropertiesByUserId } from "@/lib/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {

  const load = async () => {
    const data = await loadPropertiesByUserId("kaktus");
    return data;
  }

  const data = await load();

  console.log(data);

  const { userId } = await auth();
  if (!userId) return redirect("/sign-in")

  return redirect("/properties");
}

export default Home;
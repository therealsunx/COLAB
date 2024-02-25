import Feed from "@/src/components/Feed";
import { projects } from "@/src/misc/dummy";

const HomePage = () => {
  return (
    <div className="h-screen flex justify-between">
      <Feed content={projects} />
    </div>
  )
}

export default HomePage;
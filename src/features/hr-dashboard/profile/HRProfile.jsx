import {motion} from "framer-motion";
import ProfileHeader from "./components/ProfileHeader";
import ProfileInformation from "./components/ProfileInformation";

const HRProfile=()=>(
  <motion.div
    initial={{opacity:0,y:14}}
    animate={{opacity:1,y:0}}
    transition={{duration:.3}}
    className="space-y-6"
  >
    <ProfileHeader/>
    <ProfileInformation/>
  </motion.div>
);

export default HRProfile;
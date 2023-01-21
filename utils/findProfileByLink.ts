import { Profile } from "context/ProfileContext";
import { Link } from "context/LinkContext";
import { db } from "firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";

type User = { links: Link[]; profile: Profile } | null;

const findProfileByLink = async (link: string): Promise<User> => {
  const q = query(collection(db, "users"), where("profile.link", "==", link));
  let user = null;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    user = doc.data();
  });
  return user;
};

export default findProfileByLink;

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearch } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import GptSearch from "./GptSearch";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const dispatch = useDispatch();
  const handleGPTSearch = () => {
    dispatch(toggleGptSearch());
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <div className="w-full fixed top-0 left-0 z-20 flex justify-between items-center px-6 py-4 bg-gradient-to-b from-black/70 to-transparent">
      <img className="w-40 md:w-56 shadow-lg" src={LOGO} alt="Logo"></img>
      {user && (
        <div className="flex py-10 px-2">
          {showGPTSearch && (
            <select
              className="mr-2 rounded-md bg-red-500 text-white p-2"
              onChange={handleLangChange}
            >
              {SUPPORTED_LANGUAGES.map((language) => {
                return (
                  <option value={language.identifier}>{language.name}</option>
                );
              })}
            </select>
          )}
          <button
            className="bg-violet-600 text-white font-medium px-4 py-2  mr-2 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 active:bg-red-800"
            onClick={handleGPTSearch}
          >
            {showGPTSearch ? "Home Page" : "GPTSearch"}
          </button>

          <img
            alt="userIcon"
            src="https://occ-0-3216-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229"
            className="w-12 h-12 mr-2 rounded-lg"
          ></img>
          <button
            onClick={handleSignOut}
            className="bg-red-600 text-white font-medium px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 active:bg-red-800"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

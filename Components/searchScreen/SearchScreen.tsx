import { withHook } from "../../utils/withHook";

import SearchScreenView from "./SearchScreenView";
import useSearchScreen from "./useSearchScreen";

const SearchScreen = withHook(useSearchScreen, SearchScreenView)

export default SearchScreen
import { withHook } from "../../utils/withHook";

import SearchInputScreenView from "./SearchInputScreenView";
import useSearchInputScreen from "./useSearchInputScreen"

const SearchInputScreenNavigator = withHook(useSearchInputScreen, SearchInputScreenView)

export default SearchInputScreenNavigator
import { withHook } from "../../utils/withHook";

import SearchInputScreenNavigatorView from "./SearchInputScreenNavigatorView";
import useSearchInputScreenNavigator from "./useSearchInputScreenNavigator";

const SearchInputScreenNavigator = withHook(useSearchInputScreenNavigator, SearchInputScreenNavigatorView)

export default SearchInputScreenNavigator
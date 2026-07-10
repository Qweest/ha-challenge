import { atom } from "jotai";

import { setApiToken } from "./api/api";
import { deleteItem, setItem } from "./storage";

const _tokenAtom = atom<string | null>(null);

export const tokenAtom = atom(
	(get) => get(_tokenAtom),
	(_, set, value: string | null) => {
		// update local state atom
		set(_tokenAtom, value);

		// set client Authorization header
		setApiToken(value);

		// save the token to the storage
		if (value) setItem("access-token", value);
		else deleteItem("access-token");
	},
);

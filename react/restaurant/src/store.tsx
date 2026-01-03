import { atom } from "jotai";

let cookie = document.cookie
export let isLoginAtom = atom(cookie.includes('userid'))
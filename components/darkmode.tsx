"use client"; // 클라이언트 컴포넌트로 설정

import { useTheme } from "next-themes";

export default function DarkModeButton() {
  const { theme, setTheme } = useTheme();

  return (
 
<button
    className="inline-flex items-center justify-center 
    dark:bg-white
    border-0 py-1 px-2 
    focus:outline-none 
    hover:bg-gray-200 
    hover:text-orange-500 /* hover 시 텍스트 색상 변경 (선택 사항) */
    rounded text-base mt-4 md:mt-0 transition-colors duration-300
    dark:text-yellow-300" /* dark 모드에서 텍스트 색상 항상 노란색 */
    type="button"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
>
  {/* Light Mode 아이콘 (라이트 모드에서 보임) */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor" /* 부모 색상 따라감 */
    fill="none"
    className="block dark:hidden h-5 w-5 transition-colors duration-300"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
    />
  </svg>

  {/* Dark Mode 아이콘 (다크 모드에서 보임) */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor" /* 부모 색상 따라감 */
    fill="none"
    className="hidden dark:block h-5 w-5 transition-colors duration-300"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
    />
  </svg>
</button>





  );
}

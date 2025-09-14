// import { useEffect, useRef, useState } from "react";
// import QuizCard from "./QuizCard";
// import { useAuthFetch } from "../hooks/useAuthFetch";

// function Quiz() {
//   const [quizzes, setQuizzes] = useState([]);
//   const [cursor, setCursor] = useState(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const { authFetch, loading, error } = useAuthFetch();
//   const scrollContainerRef = useRef(null);
//   const scrollHandlerSetup = useRef(false);

//   // Use refs to store current values for the scroll handler
//   const cursorRef = useRef(cursor);
//   const hasMoreRef = useRef(hasMore);
//   const isLoadingMoreRef = useRef(isLoadingMore);
//   const authFetchRef = useRef(authFetch);

//   // Update refs whenever state changes
//   useEffect(() => {
//     cursorRef.current = cursor;
//     hasMoreRef.current = hasMore;
//     isLoadingMoreRef.current = isLoadingMore;
//     authFetchRef.current = authFetch;
//   }, [cursor, hasMore, isLoadingMore, authFetch]);

//   // Initial load
//   useEffect(() => {
//     console.log("Initial load triggered");
//     authFetch(`quizzes?limit=10`)
//       .then((data) => {
//         console.log("Initial data received:", data);
//         setQuizzes(data.quizzes);
//         setCursor(data.nextCursor);
//         setHasMore(!!data.nextCursor);
//       })
//       .catch((err) => {
//         console.error("Initial load error:", err);
//       });
//   }, []); // Remove authFetch dependency to prevent double loading

//   // Fetch more function
//   function fetchMore() {
//     console.log("fetchMore called");
//     console.log("Current values:", {
//       cursor: cursorRef.current,
//       hasMore: hasMoreRef.current,
//       isLoadingMore: isLoadingMoreRef.current,
//     });

//     if (!cursorRef.current || isLoadingMoreRef.current || !hasMoreRef.current) {
//       console.log("fetchMore blocked - no cursor, loading, or no more data");
//       return;
//     }

//     console.log("Actually fetching more...");
//     setIsLoadingMore(true);

//     authFetchRef
//       .current(`quizzes?limit=10&cursor=${cursorRef.current}`)
//       .then((data) => {
//         console.log("More data received:", data);
//         setQuizzes((prev) => {
//           console.log("Previous quizzes count:", prev.length);
//           console.log("New quizzes count:", data.quizzes.length);
//           return [...prev, ...data.quizzes];
//         });
//         setCursor(data.nextCursor);
//         setHasMore(!!data.nextCursor);
//       })
//       .catch((err) => {
//         console.error("Load more error:", err);
//       })
//       .finally(() => {
//         setIsLoadingMore(false);
//       });
//   }

//   // Set up scroll handler only once when container is available
//   useEffect(() => {
//     if (!scrollContainerRef.current || scrollHandlerSetup.current) {
//       return;
//     }

//     const scrollContainer = scrollContainerRef.current;
//     console.log("Setting up scroll handler ONCE, container:", scrollContainer);

//     let timeoutId = null;

//     function handleScroll() {
//       // Throttle scroll events
//       if (timeoutId) return;

//       timeoutId = setTimeout(() => {
//         const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

//         console.log("Scroll event:", {
//           scrollTop: Math.round(scrollTop),
//           scrollHeight,
//           clientHeight,
//           threshold: scrollHeight - 200,
//           shouldLoad: scrollTop + clientHeight >= scrollHeight - 200,
//         });

//         if (scrollTop + clientHeight >= scrollHeight - 200) {
//           console.log("Threshold reached, calling fetchMore");
//           fetchMore();
//         }

//         timeoutId = null;
//       }, 150);
//     }

//     console.log("Adding scroll event listener");
//     scrollContainer.addEventListener("scroll", handleScroll);
//     scrollHandlerSetup.current = true;

//     // Cleanup function
//     return () => {
//       console.log("Component unmounting, cleaning up scroll event listener");
//       scrollContainer.removeEventListener("scroll", handleScroll);
//       if (timeoutId) clearTimeout(timeoutId);
//       scrollHandlerSetup.current = false;
//     };
//   });

//   console.log("Render - Quizzes count:", quizzes.length);
//   console.log("Render - State:", { cursor, hasMore, isLoadingMore, loading });

//   if (loading && quizzes.length === 0) return <p>Loading quizzes...</p>;

//   if (error)
//     return <p className="text-red-500 text-[1.4rem]">Error: {error}</p>;

//   return (
//     <div className="h-[90vh] flex flex-col">
//       <div className="px-[1.5rem] pt-[1.5rem] w-full">
//         <h1 className="text-[1.6rem] font-bold">Quizzes</h1>
//         <input
//           type="text"
//           placeholder="Search any quizzes"
//           className="border w-full mt-[1.5rem] h-[3.3rem] pl-[1.5rem] rounded-full placeholder:text-[1.4rem] text-[1.4rem] bg-gray-100"
//         />

//         <div className="mt-[1rem] flex gap-[.5rem]">
//           <button className="bg-red-500 hover:bg-red-600 text-white px-[1rem] text-[1.6rem] rounded-full w-fit h-[2.5rem]">
//             All
//           </button>
//           <button className="bg-gray-100 hover:bg-gray-200 text-black px-[1rem] text-[1.6rem] rounded-full w-fit h-[2.5rem]">
//             Popular
//           </button>
//           <button className="bg-gray-100 hover:bg-gray-200 text-black px-[1rem] text-[1.6rem] rounded-full w-fit h-[2.5rem]">
//             New
//           </button>
//           <button className="bg-gray-100 hover:bg-gray-200 text-black px-[1rem] text-[1.6rem] rounded-full w-fit h-full">
//             Favourites
//           </button>
//         </div>

//         {/* Debug info */}
//         <div className="mt-2 text-sm text-gray-600">
//           Quizzes: {quizzes.length} | Cursor: {cursor ? "Yes" : "No"} | HasMore:{" "}
//           {hasMore ? "Yes" : "No"} | Loading: {isLoadingMore ? "Yes" : "No"}
//         </div>
//       </div>

//       <div
//         className="bg-gray-100 w-full mt-[1.5rem] px-[1.5rem] overflow-y-scroll py-[1.5rem]"
//         ref={scrollContainerRef}
//         style={{ flex: 1 }} // Ensure the container takes available space
//       >
//         <div className="flex flex-col gap-[1.5rem] first:mt-[1.5rem]">
//           {quizzes.length > 0 &&
//             quizzes.map((quiz, index) => (
//               <div key={quiz._id}>
//                 <QuizCard quiz={quiz} />
//                 {/* Debug: Show item number */}
//                 <div className="text-xs text-gray-400">Item #{index + 1}</div>
//               </div>
//             ))}

//           {isLoadingMore && (
//             <div className="flex justify-center py-[2rem]">
//               <p className="text-[1.4rem] text-gray-600">
//                 Loading more quizzes...
//               </p>
//             </div>
//           )}

//           {!hasMore && quizzes.length > 0 && (
//             <div className="flex justify-center py-[2rem]">
//               <p className="text-[1.4rem] text-gray-500">
//                 No more quizzes to load
//               </p>
//             </div>
//           )}

//           {/* Test element to make sure there's enough content to scroll */}
//           <div
//             style={{ height: "50px", backgroundColor: "red", margin: "10px 0" }}
//           >
//             Test scroll element - you should be able to scroll to see this
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Quiz;

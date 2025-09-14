import { useCallback, useEffect, useRef, useState } from "react";
import QuizCard from "./QuizCard";
import { useAuthFetch } from "../hooks/useAuthFetch";

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);

  const [cursor, setCursor] = useState(null);

  const { authFetch, loading, error } = useAuthFetch();

  const scrollContainerRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [search, setSearch] = useState("");
  const timeoutRef = useRef(null);

  function handleSearch(e) {
    const search = e.target.value;
    setSearch(search);

    if (!search && search.length > 0) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      authFetch(`quizzes?search=${search}`)
        .then((data) => {
          setQuizzes(data.quizzes);
          setCursor(data.nextCursor);
          setHasMore(!!data.nextCursor);
        })
        .catch(() => {});
    }, 1000);
  }

  const cursorRef = useRef(cursor);
  const hasMoreRef = useRef(hasMore);
  const isLoadingMoreRef = useRef(isLoadingMore);
  const authFetchRef = useRef(authFetch);

  useEffect(() => {
    cursorRef.current = cursor;
    hasMoreRef.current = hasMore;
    isLoadingMoreRef.current = isLoadingMore;
    authFetchRef.current = authFetch;
  }, [cursor, hasMore, isLoadingMore, authFetch]);

  useEffect(() => {
    authFetch(`quizzes?limit=10`)
      .then((data) => {
        setQuizzes(data.quizzes);
        setCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
      })
      .catch(() => {});
  }, []);
  console.log(quizzes);

  function fetchMore() {
    if (!cursorRef.current || isLoadingMoreRef.current || !hasMoreRef.current)
      return;

    setIsLoadingMore(true);

    authFetch(
      `quizzes?limit=10${
        cursorRef.current ? `&cursor=${cursorRef.current}` : ""
      }`
    )
      .then((data) => {
        setQuizzes((prev) => [...prev, ...data.quizzes]);
        setCursor(data.nextCursor);
        setHasMore(!!data.nextCursor);
      })
      .catch(() => {})
      .finally(() => setIsLoadingMore(false));
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    console.log(scrollContainer);
    if (!scrollContainer) return;
    let timeoutId = null;

    function handleScroll() {
      console.log("working");

      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        const { scrollTop, scrollHeight, clientHeight } = scrollContainer;

        console.log("Scroll values:", {
          scrollTop,
          scrollHeight,
          clientHeight,
        });

        if (scrollTop + clientHeight >= scrollHeight - 200) {
          fetchMore();
        }

        timeoutId = null;
      }, 100);
    }

    scrollContainer.addEventListener("scroll", handleScroll);
    console.log("mounts");

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
      console.log("unmoutns");
    };
  }, []);

  if (loading) return <p>Loading quizzes...</p>;

  if (error)
    return <p className="text-red-500 text-[1.4rem]">Error: {error}</p>;

  return (
    <div className="h-[90vh] flex flex-col">
      <div className="px-[1.5rem] pt-[1.5rem] w-full">
        <h1 className="text-[1.6rem] font-bold  ">Quizzes</h1>
        <input
          type="text"
          placeholder="Search any quizzes"
          className="border w-full mt-[1.5rem] h-[3.3rem] pl-[1.5rem] rounded-full placeholder:text-[1.4rem] text-[1.4rem] bg-gray-100 "
          value={search}
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <div
        className=" bg-gray-100  w-full mt-[1.5rem] px-[1.5rem]  overflow-y-scroll py-[1.5rem]"
        ref={scrollContainerRef}
      >
        <div className="flex flex-col gap-[1.5rem] first:mt-[1.5rem] ">
          {quizzes.length > 0 &&
            quizzes.map((quiz) => <QuizCard key={quiz._id} quiz={quiz} />)}
        </div>
      </div>
    </div>
  );
}
export default Quiz;

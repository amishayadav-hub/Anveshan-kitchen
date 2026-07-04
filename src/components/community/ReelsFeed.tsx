"use client";

import { useEffect, useRef, useState } from "react";
import { useCommunityFeed } from "./useCommunityFeed";
import ReelPost from "./ReelPost";

// How many posts on each side of the current one stay fully mounted (image
// preload + cache). Everything else renders a cheap placeholder → the feed stays
// smooth even with hundreds of posts (windowed virtualization).
const WINDOW = 2;

export default function ReelsFeed() {
  const { posts, loading, loadMore, liked, likeCountFor, toggleLike, recordShare } = useCommunityFeed();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [current, setCurrent] = useState(0);
  const wheelLock = useRef(0);

  // Fit the scroll area to the space between the app chrome and the mobile bottom
  // nav. Done imperatively (no React state) so a resize never re-renders the feed.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const fit = () => {
      const navH = window.innerWidth < 768 ? 56 : 0; // mobile bottom nav height
      el.style.height = `${Math.max(320, window.innerHeight - el.getBoundingClientRect().top - navH)}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, []);

  function scrollToIndex(i: number) {
    const el = containerRef.current;
    if (!el) return;
    const target = Math.max(0, Math.min(posts.length - 1, i));
    el.scrollTo({ top: target * el.clientHeight, behavior: "smooth" });
  }

  // Track the current post from scroll position (rAF-throttled for smoothness).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const idx = Math.round(el.scrollTop / el.clientHeight);
        setCurrent((c) => (c === idx ? c : idx));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Mouse wheel → move exactly one post per flick (cooldown gate).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 4) return;
      e.preventDefault(); // replace native multi-post scroll with one-at-a-time
      const now = Date.now();
      if (now < wheelLock.current) return;
      wheelLock.current = now + 650;
      const idx = Math.round(el.scrollTop / el.clientHeight);
      scrollToIndex(idx + (e.deltaY > 0 ? 1 : -1));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length]);

  // Keyboard: Arrow Down → next, Arrow Up → previous.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const el = containerRef.current;
      if (!el) return;
      e.preventDefault();
      const idx = Math.round(el.scrollTop / el.clientHeight);
      scrollToIndex(idx + (e.key === "ArrowDown" ? 1 : -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts.length]);

  // Infinite feed: fetch the next batch when within the last 3 posts.
  useEffect(() => {
    if (posts.length > 0 && current >= posts.length - 3) loadMore();
  }, [current, posts.length, loadMore]);

  return (
    <div className="relative bg-black">
      <div
        ref={containerRef}
        className="h-[calc(100dvh-9.5rem)] w-full snap-y snap-mandatory overflow-y-scroll overscroll-contain no-scrollbar md:h-[calc(100dvh-6.5rem)]"
      >
        {posts.map((post, i) => (
          <div key={post.id} className="h-full w-full snap-start">
            {Math.abs(i - current) <= WINDOW ? (
              <ReelPost
                post={post}
                active={Math.abs(i - current) <= WINDOW}
                liked={!!liked[post.id]}
                likeCount={likeCountFor(post.id)}
                onLike={() => toggleLike(post.id)}
                onShare={() => recordShare(post.id)}
              />
            ) : (
              // Cheap placeholder keeps scroll height + snap positions intact.
              <div className="h-full w-full bg-neutral-950" />
            )}
          </div>
        ))}
      </div>

      {loading && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
          <span className="h-7 w-7 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-label="Loading more posts" />
        </div>
      )}
    </div>
  );
}

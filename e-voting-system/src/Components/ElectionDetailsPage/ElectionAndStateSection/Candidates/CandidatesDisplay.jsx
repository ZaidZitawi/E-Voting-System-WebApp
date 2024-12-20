// src/components/CandidatesDisplay/CandidatesDisplay.jsx

import React, { useState, useEffect, useRef } from 'react';
import './CandidatesDisplay.css';
import CandidateCard from './CandidateCard';

const CandidatesDisplay = ({ candidates }) => {
  const [visibleCandidates, setVisibleCandidates] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerLoad = 6;
  const loader = useRef(null);

  useEffect(() => {
    loadMoreCandidates();
  }, [candidates]);

  const loadMoreCandidates = () => {
    const currentLength = visibleCandidates.length;
    const isMore = currentLength < candidates.length;
    const nextResults = isMore
      ? candidates.slice(currentLength, currentLength + itemsPerLoad)
      : [];
    setVisibleCandidates([...visibleCandidates, ...nextResults]);
    setHasMore(currentLength + nextResults.length < candidates.length);
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && hasMore) {
      loadMoreCandidates();
    }
  };

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, [hasMore]);

  return (
    <div className="candidates-display">
      <div className="candidates-grid">
        {visibleCandidates.map(candidate => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
      {hasMore && <div className="loading" ref={loader}>Loading...</div>}
    </div>
  );
};

export default CandidatesDisplay;

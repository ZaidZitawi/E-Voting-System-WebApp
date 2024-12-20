// src/pages/ElectionDetailsPage/ElectionDetailsPage.jsx

import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ElectionCoverageSection from './ElectionCoverageSection/ElectionCoverageSection';
import './ElectionDetailsPage.css'; 
import image from '../../assets/unicef_0.jpg';
import CandidatesAndStatesSection from './ElectionAndStateSection/CandidatesAndStatesSection';
import PostsSection from '../ElectionDetailsPage/PostSection/PostsSection'; 

const ElectionDetailsPage = () => {
  // Sample election data
  const election = {
    title: 'Presidential Election 2024',
    description: 'An election to choose the next President of the country.',
    typeId: 1, // e.g., 1 for Presidential, 2 for Parliamentary, etc.
    startDatetime: '2024-11-05T09:00:00Z',
    endDatetime: '2024-11-05T17:00:00Z',
    imageUrl: image, // Replace with actual image URL
    facultyId: 101, // Example ID
    departmentId: 202, // Example ID
    isActive: true, // Indicates if the election is currently active
  };

  // Updated candidates data with votes
  const candidates = [
    {
      id: 1,
      name: 'Alice Johnson',
      description: 'A dedicated leader committed to progress.',
      imageUrl: 'https://via.placeholder.com/250.png?text=Alice+Johnson',
      profileLink: '/candidates/1', // Replace with actual profile link
      votes: 7000,
    },
    {
      id: 2,
      name: 'Bob Smith',
      description: 'Experienced politician with a vision.',
      imageUrl: 'https://via.placeholder.com/250.png?text=Bob+Smith',
      profileLink: '/candidates/2', // Replace with actual profile link
      votes: 5000,
    },
    {
      id: 3,
      name: 'Carol Williams',
      description: 'Passionate advocate for education.',
      imageUrl: 'https://via.placeholder.com/250.png?text=Carol+Williams',
      profileLink: '/candidates/3', // Replace with actual profile link
      votes: 3000,
    },
    {
      id: 4,
      name: 'David Brown',
      description: 'Committed to economic growth and stability.',
      imageUrl: 'https://via.placeholder.com/250.png?text=David+Brown',
      profileLink: '/candidates/4', // Replace with actual profile link
      votes: 2000,
    },
    // Add more candidates as needed
  ];

  // Calculate total votes
  const totalVotes = candidates.reduce((acc, candidate) => acc + candidate.votes, 0);

  // Sample election states data
  const electionStates = [
    { id: 1, name: 'New York', votes: 5000, percentage: 25 },
    { id: 2, name: 'California', votes: 7000, percentage: 35 },
    { id: 3, name: 'Texas', votes: 3000, percentage: 15 },
    { id: 4, name: 'Florida', votes: 2000, percentage: 10 },
    { id: 5, name: 'Illinois', votes: 1000, percentage: 5 },
    // Add more states as needed
  ];

  // Sample posts data
  const samplePosts = [
    {
      id: 1,
      publisher: {
        name: 'Alice Johnson',
        imageUrl: 'https://via.placeholder.com/50.png?text=Alice',
      },
      time: '2024-11-05T10:00:00Z',
      content: 'Excited to announce my campaign launch for the upcoming Presidential Election!',
      media: 'https://via.placeholder.com/500.png?text=Campaign+Launch',
      likes: [
        { id: 1, name: 'Bob Smith', imageUrl: 'https://via.placeholder.com/40.png?text=Bob' },
        { id: 2, name: 'Carol Williams', imageUrl: 'https://via.placeholder.com/40.png?text=Carol' },
        // Add more likes as needed
      ],
      comments: [
        {
          id: 1,
          commenter: {
            name: 'David Brown',
            imageUrl: 'https://via.placeholder.com/40.png?text=David',
          },
          text: 'Congratulations, Alice! Wishing you the best.',
          time: '2024-11-05T11:00:00Z',
        },
        {
          id: 2,
          commenter: {
            name: 'Eve Davis',
            imageUrl: 'https://via.placeholder.com/40.png?text=Eve',
          },
          text: 'Looking forward to your campaign promises.',
          time: '2024-11-05T12:30:00Z',
        },
        // Add more comments as needed
      ],
    },
    // Add more posts as needed
  ];

  return (
    <>
      <Header />

      <main className="election-details-page">
        <ElectionCoverageSection election={election} />
        <CandidatesAndStatesSection
          candidates={candidates}
          electionStates={electionStates}
          totalVotes={totalVotes}
        />
        {/* Integrate PostsSection */}
        <PostsSection posts={samplePosts} />
      </main>

      <Footer />
    </>
  );
};

export default ElectionDetailsPage;

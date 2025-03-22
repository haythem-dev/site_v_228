import React from 'react';

function TeamMember({ name, role, imageUrl }) {
  return (
    <div className="team-member">
      <img src={imageUrl} alt={`${name}'s profile picture`} />
      <h3>{name}</h3>
      <p>{role}</p>
    </div>
  );
}

function Team() {
  const teamMembers = [
    {
      name: 'John Smith',
      role: 'Software Engineer',
      imageUrl: "/attached_assets/1737748242012.jpg",
    },
    {
      name: 'Jane Doe',
      role: 'Project Manager',
      imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    },
  ];

  return (
    <div className="team">
      {teamMembers.map((member) => (
        <TeamMember key={member.name} {...member} />
      ))}
    </div>
  );
}

export default Team;
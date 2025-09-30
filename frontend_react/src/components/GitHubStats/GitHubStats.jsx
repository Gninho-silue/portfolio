import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiStar, HiCode, HiUsers } from 'react-icons/hi';
import './GitHubStats.scss';

const GitHubStats = ({ username = 'votre-username' }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Récupérer les infos du profil
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userResponse.json();

        // Récupérer les repos
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const reposData = await reposResponse.json();

        // Calculer les stats
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalRepos = userData.public_repos;
        const totalFollowers = userData.followers;

        setStats({
          stars: totalStars,
          repos: totalRepos,
          followers: totalFollowers,
        });
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des stats GitHub:', error);
        // Stats par défaut en cas d'erreur
        setStats({
          stars: 0,
          repos: 0,
          followers: 0,
        });
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, [username]);

  const statsData = [
    {
      icon: <HiStar />,
      value: stats?.stars || 0,
      label: 'GitHub Stars',
      color: '#fbbf24',
    },
    {
      icon: <HiCode />,
      value: stats?.repos || 0,
      label: 'Repositories',
      color: '#6366f1',
    },
    {
      icon: <HiUsers />,
      value: stats?.followers || 0,
      label: 'Followers',
      color: '#8b5cf6',
    },
  ];

  if (loading) {
    return (
      <div className="github-stats-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="github-stats">
      {statsData.map((stat, index) => (
        <motion.div
          key={index}
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <div className="stat-icon" style={{ color: stat.color }}>
            {stat.icon}
          </div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {stat.value}
          </motion.h3>
          <p>{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default GitHubStats;
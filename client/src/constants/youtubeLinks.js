// Valid YouTube Playlist URLs for common skills
// These are verified, working playlists from freeCodeCamp and other trusted channels

export const SKILL_YOUTUBE_PLAYLISTS = {
    // Programming Languages
    'javascript': {
        name: 'JavaScript Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
    },
    'python': {
        name: 'Python Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=rfscVS0vtbw'
    },
    'java': {
        name: 'Java Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=grEKMHGYyns'
    },
    'c++': {
        name: 'C++ Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y'
    },
    'typescript': {
        name: 'TypeScript Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=gp5H0Vw39yw'
    },

    // Web Development
    'html': {
        name: 'HTML Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg'
    },
    'css': {
        name: 'CSS Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=1Rs2ND1ryYc'
    },
    'react': {
        name: 'React Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
    },
    'react.js': {
        name: 'React Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
    },
    'node': {
        name: 'Node.js Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=Oe421EPjeBE'
    },
    'node.js': {
        name: 'Node.js Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=Oe421EPjeBE'
    },
    'express': {
        name: 'Express.js Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=Oe421EPjeBE'
    },
    'angular': {
        name: 'Angular Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=2OHbjep_WjQ'
    },
    'vue': {
        name: 'Vue.js Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=FXpIoQ_rT_c'
    },
    'next.js': {
        name: 'Next.js Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=9P8mASSREYM'
    },
    'nextjs': {
        name: 'Next.js Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=9P8mASSREYM'
    },

    // Backend & Databases
    'mongodb': {
        name: 'MongoDB Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=-56x56UppqQ'
    },
    'sql': {
        name: 'SQL Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
    },
    'mysql': {
        name: 'MySQL Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
    },
    'postgresql': {
        name: 'PostgreSQL Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=qw--VYLpxG4'
    },

    // Data Science & ML
    'machine learning': {
        name: 'Machine Learning Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=NWONeJKn6kc'
    },
    'data science': {
        name: 'Data Science Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=ua-CiDNNj30'
    },
    'pandas': {
        name: 'Pandas Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=vmEHCJofslg'
    },
    'numpy': {
        name: 'NumPy Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI'
    },

    // DevOps & Cloud
    'docker': {
        name: 'Docker Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo'
    },
    'kubernetes': {
        name: 'Kubernetes Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=X48VuDVv0do'
    },
    'aws': {
        name: 'AWS Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=3hLmDS179YE'
    },
    'git': {
        name: 'Git & GitHub Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=RGOj5yH7evk'
    },
    'linux': {
        name: 'Linux Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=wBp0Rb-ZJak'
    },

    // Mobile Development
    'flutter': {
        name: 'Flutter Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=VPvVD8t02U8'
    },
    'react native': {
        name: 'React Native Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=obH0Po_RdWk'
    },

    // Default fallback
    'default': {
        name: 'Web Development Full Course - freeCodeCamp',
        url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg'
    }
};

// Helper function to find the best matching YouTube playlist for a skill
export const getYouTubePlaylistForSkill = (skill) => {
    const normalizedSkill = skill.toLowerCase().trim();

    // Direct match
    if (SKILL_YOUTUBE_PLAYLISTS[normalizedSkill]) {
        return SKILL_YOUTUBE_PLAYLISTS[normalizedSkill];
    }

    // Partial match
    for (const [key, value] of Object.entries(SKILL_YOUTUBE_PLAYLISTS)) {
        if (normalizedSkill.includes(key) || key.includes(normalizedSkill)) {
            return value;
        }
    }

    // Return search URL as fallback
    return {
        name: `Learn ${skill} - YouTube Search`,
        url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skill)}+full+course+tutorial`
    };
};

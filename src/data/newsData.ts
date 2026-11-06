import { NewsArticle, Category } from '../types';

export const initialNewsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'global-economic-summit-unveils-new-african-trade-corridor',
    title: 'Global Economic Leaders Finalize Historic $120B African Strategic Trade Corridor',
    summary: 'Ministers and multilateral lenders conclude landmark agreement linking West, Central and East African commerce, promising accelerated industrial growth and digital banking interoperability.',
    content: [
      'GENEVA — In an extraordinary multilateral assembly today, finance ministers from twenty-two African economies and European development partners finalized the charter for the Trans-Continental Strategic Commerce Corridor.',
      'The multi-year $120 billion initiative focuses on high-speed rail freight, solar-powered border logistics hubs, and unified digital payment systems that bypass predatory intermediary exchange rates.',
      'Delegates praised the agreement as the most ambitious physical and economic harmonization project in modern African history, expected to lift trade volumes by over 34% within the initial four-year delivery timeline.',
      'Reactions across global stock exchanges reflected significant investor confidence, particularly for agricultural processing hubs and regional technology infrastructure syndicates.'
    ],
    category: 'Business',
    region: 'Africa',
    author: 'Emmanuel Kwame Darko, Global Markets Editor',
    date: 'November 5, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    isBreaking: true,
    isTrending: true,
    isLeadStory: true,
    godPerspective: {
      interpretation: `From the throne of Heaven, continents and their resources were formed not for scarcity or subjugation, but for kingdom stewardship and the multiplication of blessings. When nations remove artificial barriers and build pathways of lawful commerce, they echo God's ancient covenant mandate given to Abraham: 'In you all the families of the earth shall be blessed.' This economic corridor represents an opportunity to restore dignity to the hardworking, eradicate systemic poverty, and demonstrate divine equity. However, earthly wealth is hollow without righteousness. Believers must pray that leaders steward these billions with integrity, remembering that the silver and gold belong to the Lord, and true prosperity must benefit the widow, the orphan, and the laborer.`,
      scriptures: [
        {
          verse: 'The silver is mine, and the gold is mine, declares the Lord of hosts.',
          reference: 'Haggai 2:8'
        },
        {
          verse: 'Let the Lord be magnified, which hath pleasure in the prosperity of his servant.',
          reference: 'Psalm 35:27'
        }
      ],
      propheticAction: 'Pray for African leaders to walk in supernatural wisdom and resist corruption, establishing covenant economic freedom across the continent.'
    }
  },
  {
    id: 'news-2',
    slug: 'quantum-computing-breakthrough-heralds-clean-energy-catalysts',
    title: 'Quantum Synthesis Breakthrough Synthesizes Self-Healing Clean Energy Storage',
    summary: 'Physicists in Zurich achieve stable quantum annealing simulation, uncovering molecular catalysts that retain 98% charge across decades of thermal cycling.',
    content: [
      'ZURICH — An international consortium of quantum researchers today announced the empirical validation of a novel molecular catalyst discovered using 12,000-qubit topological annealing.',
      'The breakthrough solves a century-old hurdle in solid-state electrochemistry, allowing ambient-temperature battery cells to undergo thousands of charge cycles with virtually zero chemical degradation.',
      'Commercial fabrication partners in Tokyo and Austin have already begun pilot manufacturing runs, aiming to supply humanitarian power grids in developing nations before winter 2027.',
      'Energy analysts project this discovery could reduce global reliance on toxic rare earth strip mining by nearly 60% over the next decade.'
    ],
    category: 'Technology',
    region: 'Europe',
    author: 'Dr. Clara Lindqvist, Chief Science Correspondent',
    date: 'November 5, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    isTrending: true,
    godPerspective: {
      interpretation: `Human intellect and scientific exploration are not rivals to God; they are the uncovering of God's hidden laws built into the very fabric of subatomic matter. Proverbs reminds us that 'It is the glory of God to conceal a matter, but the glory of kings is to search it out.' When humanity uses God-given wisdom to harness clean power and protect creation from environmental degradation, we are exercising the Edenic mandate of stewardship. As technology advances exponentially, our moral compass must remain firmly rooted in the Creator. We must never worship the machine or human intellect, but praise the One who laid the foundations of light, atoms, and energy.`,
      scriptures: [
        {
          verse: 'It is the glory of God to conceal a thing: but the honour of kings is to search out a matter.',
          reference: 'Proverbs 25:2'
        },
        {
          verse: 'The earth is the Lord’s, and the fullness thereof; the world, and they that dwell therein.',
          reference: 'Psalm 24:1'
        }
      ],
      propheticAction: 'Consecrate your mind to God for divine innovation, knowing that wisdom for groundbreaking solutions comes from the Holy Spirit.'
    }
  },
  {
    id: 'news-3',
    slug: 'peace-accords-signed-for-cross-border-stability-middle-east',
    title: 'Historic Cross-Regional Water & Agritech Accord Reached Across Jordan Valley',
    summary: 'Regional leaders sign multilateral treaty ensuring uninterrupted potable water access and cooperative hydroponic farming for 18 million border residents.',
    content: [
      'AMMAN — In a diplomatic breakthrough hailed by world leaders, an unprecedented cooperative water-sharing and solar desalination agreement was officially ratified this afternoon.',
      'The accord guarantees steady transboundary flow of desalinated water from Mediterranean plants to arid farmland, securing food security for vulnerable communities regardless of political shifts.',
      'Civic groups and peace envoys held celebratory gatherings in Bethlehem and Amman, sharing fresh harvest fruits grown through the pilot hydroponic corridors.',
      'International monitors described the accord as a tangible model of how mutual survival imperatives can triumph over historic sectarian disputes.'
    ],
    category: 'World',
    region: 'Middle East',
    author: 'Tariq Al-Mansoor, Middle East Bureau',
    date: 'November 4, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80',
    isTrending: true,
    godPerspective: {
      interpretation: `Water in Scripture is a perpetual symbol of life, restoration, and the Holy Spirit flowing into dry places. Christ proclaimed at Jacob's well in Samaria that whoever drinks of His water shall never thirst again. In a region marked by dry wilderness and human tension, when nations come together to provide clean drinking water to innocent families, they embody the beatitude: 'Blessed are the peacemakers, for they shall be called children of God.' We pray that this physical water leads hearts toward the Living Water—Jesus Christ—and that peace will reign in Jerusalem and across every border.`,
      scriptures: [
        {
          verse: 'Blessed are the peacemakers: for they shall be called the children of God.',
          reference: 'Matthew 5:9'
        },
        {
          verse: 'I will make rivers in high places, and fountains in the midst of the valleys: I will make the wilderness a pool of water, and the dry land springs of water.',
          reference: 'Isaiah 41:18'
        }
      ],
      propheticAction: 'Intercede for lasting peace in the Middle East and pray that the Living Water of Christ brings healing to ancient wounded lands.'
    }
  },
  {
    id: 'news-4',
    slug: 'global-health-summit-eradicates-pediatric-malaria-milestone',
    title: 'World Health Body Confirms 92% Plunge in Pediatric Malaria with Next-Gen Vaccine',
    summary: 'Community clinical results across Ghana, Nigeria, and Kenya reveal historic milestones, sparing hundreds of thousands of infant lives annually.',
    content: [
      'ACCRA — Health officials in Accra and the World Health Assembly celebrated what epidemiology chiefs described as one of medicine’s greatest humanitarian triumphs.',
      'Field reports compiled across 1,800 rural clinics show that the deployment of the third-generation monoclonal malaria inoculation reduced severe pediatric hospitalizations by 92.4%.',
      'Mothers in the Volta and Ashanti regions spoke with tears of gratitude, sharing how seasonal fevers that claimed generations of toddlers have been halted in their villages.',
      'Community healthcare workers are now expanding mobile delivery cold-chains into deep inland rainforests and river basins.'
    ],
    category: 'Health',
    region: 'Africa',
    author: 'Abena Osei-Bonsu, Public Health Correspondent',
    date: 'November 4, 2026',
    readTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    isBreaking: true,
    godPerspective: {
      interpretation: `The Lord Jesus Christ revealed His heart on earth by healing all who were oppressed of sickness and disease, saying 'Suffer the little children to come unto me, and forbid them not.' The preservation of children's lives is dear to the Father's heart. Sickness is an enemy to human flourishing, and God works through both divine supernatural miracles and the dedicated hands of medical scientists to preserve life. Every child saved from malaria is a future prophet, engineer, doctor, and ambassador of the Kingdom who now has the chance to fulfill their God-ordained destiny on this earth.`,
      scriptures: [
        {
          verse: 'Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.',
          reference: '3 John 1:2'
        },
        {
          verse: 'He sent his word, and healed them, and delivered them from their destructions.',
          reference: 'Psalm 107:20'
        }
      ],
      propheticAction: 'Declare divine health and longevity over every child and family connected to Church of Royals International Ministry.'
    }
  },
  {
    id: 'news-5',
    slug: 'deep-space-telescope-captures-pristine-birth-of-spiral-galaxy',
    title: 'Next-Gen Orbital Observatory Captures Unprecedented Detail of Cosmic Nebula',
    summary: 'Astrophysicists marvel at 500-megapixel cosmic panorama revealing stellar nurseries 13 billion light-years distant, showcasing celestial harmony.',
    content: [
      'PASADENA — Space agencies worldwide released high-resolution deep field imagery captured by the newly commissioned Caelus Ultra-Infrared Observatory.',
      'The cosmic image documents the formation of newborn star clusters enveloped in iridescent filaments of hydrogen gas, glowing with radiant purple, gold, and sapphire hues.',
      'Lead astrophysicists noted that the gravitational balance and geometric symmetry observed in these early stellar formations defy chaotic universe models and point toward extraordinary systemic order.',
      'The imagery has inspired millions across social feeds, trending worldwide as viewers contemplate humanity’s place within the vast cosmic expanse.'
    ],
    category: 'Science',
    region: 'Americas',
    author: 'Marcus Vance, Aerospace Correspondent',
    date: 'November 3, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    isTrending: true,
    godPerspective: {
      interpretation: `King David looked up into the night skies of Bethlehem thousands of years ago without modern telescopes and cried out: 'The heavens declare the glory of God; and the firmament sheweth his handywork!' When high-powered orbital observatories peer 13 billion light-years into cosmic space and uncover breathtaking symmetry, vibrant royal purple nebulae, and stellar order, science is merely photographing the brushstrokes of our Creator. The universe is not an accidental accident; it is the masterpiece of the Almighty. If God names every star and holds galaxies in the palm of His hand, how much more does He care for you, His royal son and daughter!`,
      scriptures: [
        {
          verse: 'The heavens declare the glory of God; and the firmament sheweth his handywork. Day unto day uttereth speech, and night unto night sheweth knowledge.',
          reference: 'Psalm 19:1-2'
        },
        {
          verse: 'He telleth the number of the stars; he calleth them all by their names. Great is our Lord, and of great power: his understanding is infinite.',
          reference: 'Psalm 147:4-5'
        }
      ],
      propheticAction: 'Bow before the majesty of the Creator today. If He orchestrates the cosmos, He is more than able to align your life into divine order.'
    }
  },
  {
    id: 'news-6',
    slug: 'global-youth-faith-resurgence-surges-across-universities',
    title: 'Unprecedented Spiritual Awakening Sweeps Global Campuses from Accra to Oxford',
    summary: 'Millions of Gen Z and Gen Alpha students pack auditoriums for unscripted worship, prayer vigils, and biblical literacy movements.',
    content: [
      'LONDON & ACCRA — Sociologists and university chaplains across four continents report a historic surge in student-led spiritual assemblies.',
      'From campuses in Ghana and South Africa to the UK, South Korea, and the United States, students are voluntarily organizing all-night prayer vigils, Bible reading marathons, and community outreach drives.',
      'Contrary to secular predictions of youth secularization, student leaders express a hunger for authentic divine truth, moral clarity, and supernatural communion with the Living God in an era inundated by digital superficiality.',
      'Churches and youth ministries are pivoting resources to provide discipleship mentorship, biblical leadership training, and marketplace coaching.'
    ],
    category: 'Religion',
    region: 'World',
    author: 'Reverend Peter Sterling, Global Faith & Culture Desk',
    date: 'November 3, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
    isTrending: true,
    godPerspective: {
      interpretation: `In the book of Joel, God declared: 'And it shall come to pass afterward, that I will pour out my spirit upon all flesh; and your sons and your daughters shall prophesy.' We are living in the prophecy's fulfillment! The younger generation has tasted the empty promises of materialism, social media algorithms, and secular philosophies, and they have discovered that only Jesus Christ can satisfy the human soul. Church of Royals celebrates this mighty harvest. God is raising up an army of Royal Ambassadors—young men and women equipped with both spiritual fire and intellectual excellence, ready to occupy the highest echelons of society for Christ.`,
      scriptures: [
        {
          verse: 'And it shall come to pass in the last days, saith God, I will pour out of my Spirit upon all flesh: and your sons and your daughters shall prophesy.',
          reference: 'Acts 2:17'
        },
        {
          verse: 'Remember now thy Creator in the days of thy youth, while the evil days come not.',
          reference: 'Ecclesiastes 12:1'
        }
      ],
      propheticAction: 'Invest prayer and mentorship into the rising generation. Prophesy that our youth will not be swallowed by worldly deception but will walk as kings and queens in righteousness.'
    }
  }
];

// Helper to auto-generate God's Perspective on any real-time fetched article
export function generateGodPerspectiveForNews(title: string, category: Category, region: string) {
  const scriptureLibrary = [
    {
      verse: 'The earth is the Lord’s, and the fullness thereof; the world, and they that dwell therein.',
      reference: 'Psalm 24:1'
    },
    {
      verse: 'The king’s heart is in the hand of the Lord, as the rivers of water: he turneth it whithersoever he will.',
      reference: 'Proverbs 21:1'
    },
    {
      verse: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.',
      reference: 'Romans 8:28'
    },
    {
      verse: 'For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.',
      reference: 'Jeremiah 29:11'
    },
    {
      verse: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.',
      reference: 'Isaiah 41:10'
    }
  ];

  const randomScriptures = [
    scriptureLibrary[Math.floor(Math.random() * scriptureLibrary.length)],
    scriptureLibrary[(Math.floor(Math.random() * scriptureLibrary.length) + 1) % scriptureLibrary.length]
  ];

  return {
    interpretation: `Examined through the eternal truth of the Holy Scriptures, this trending development in ${region} reminds believers that no world event occurs outside the sovereign knowledge of God. Whether dealing with economic shifts, technological innovation, geopolitical treaties, or cultural movements, Christ remains the Prince of Peace and the King of Kings. God calls His Church not to react in secular panic or worldly cynicism, but to stand as intercessors and ambassadors of righteousness. Every believer carries royal authority to speak divine wisdom into their spheres of influence, knowing that earthly systems rise and fall, but the Word of the Lord endures forever.`,
    scriptures: randomScriptures,
    propheticAction: `Declare that God’s covenant purpose will triumph in ${region} concerning "${title}". Walk as a royal peacemaker and Property of God.`
  };
}

export const tickerNewsItems = [
  'COVENANT UPDATE: Church Incorporated in Ghana on 12th August 2013 — Celebrating Continuous Years of Divine Favor',
  'BREAKING: Global leaders finalize historic $120B African Strategic Trade Corridor linking 22 nations',
  'THE ROYALS TV: Prophet Do All delivers anointed broadcast: "Breaking Generational Barriers Through Christ"',
  'ROYAL AMBASSADOR NETWORK: Over 45,000 members inducted across 84 countries into Church of Royals',
  'FREE WILL GIVING: Multi-Currency Paystack Live Integration Active for Kingdom Partnerships',
  'HEALTH UPDATE: Pediatric malaria cases plummet by 92% across West Africa following community health rollout',
  'GLOBAL CHURCH DIRECTORY: Over 10,000 Verified Congregations Indexed for Royal Fellowship',
  'OFFICIAL SLOGAN: "You Are A Property of God" — Contact: info@churchofroyals.org'
];

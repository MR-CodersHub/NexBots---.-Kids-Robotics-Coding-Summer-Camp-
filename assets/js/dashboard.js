/**
 * CODECAMPUS INTERNATIONAL - KIDS ROBOTICS & CODING SUMMER CAMP
 * Central Dashboard State Management & Shared LocalStorage Layer (Vanilla JS)
 * Seamlessly connects Admin Dashboard and Parent/User Dashboard
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'codecampus_summer_camp_2026_store';

  // Initial Seed Data specifically related to Kids Robotics & Coding Summer Camp
  const DEFAULT_CAMP_DATA = {
    // Current Active Parent & Family Profile
    parentUser: {
      id: 'USR-802',
      name: 'Sarah Adeyemi',
      email: 'sarah.adeyemi@example.com',
      phone: '+234 803 123 4567',
      address: 'Maitama District, Abuja, Nigeria',
      emergencyContact: 'Tunde Adeyemi (+234 802 987 6543)',
      memberSince: 'March 2026',
      avatar: 'SA'
    },

    // Registered Children
    children: [
      {
        id: 'KID-101',
        name: 'Liam Adeyemi',
        age: 8,
        gender: 'Male',
        school: 'Abuja International Prep',
        trackId: 'CREATIVE_CODERS',
        trackName: 'Creative Coders & Builders (Ages 7–9)',
        preferredSession: 'Session 1: June 15 – June 26, 2026 (Morning: 9:00 AM – 12:30 PM)',
        avatar: 'LA',
        progressPct: 78,
        attendancePct: 95,
        attendedSessions: 19,
        totalSessions: 20,
        allergies: 'Peanut allergy (mild)',
        laptopProvided: true,
        instructor: 'Eng. David Okafor (Robotics Lead)',
        labRoom: 'Turing Lab 2 (Hardware Arena)',
        milestones: [
          { title: 'Algorithmic Sequencing & Loops', status: 'Completed', pct: 100 },
          { title: 'Sprite Animations & Game Physics', status: 'Completed', pct: 100 },
          { title: 'mBot Neo Motors & Ultrasonic Sensor', status: 'In Progress', pct: 80 },
          { title: 'Autonomous Obstacle Navigation Arena', status: 'Upcoming', pct: 35 }
        ],
        skills: [
          { name: 'Scratch 3.0 Block Coding', level: 'Advanced' },
          { name: 'Ultrasonic Distance Sensing', level: 'Intermediate' },
          { name: 'DC Motors & PWM Speed', level: 'Intermediate' },
          { name: 'Algorithmic Debugging', level: 'Advanced' },
          { name: 'Hardware Breadboarding', level: 'Beginner' }
        ],
        badges: [
          { id: 'b1', name: 'Rocket Coder', badgeCode: 'RC', icon: '', desc: 'Mastered nested loops & custom Scratch broadcast events', date: 'June 05, 2026' },
          { id: 'b2', name: 'Robo Builder', badgeCode: 'RB', icon: '', desc: 'Successfully wired mBot chassis & dual DC gear motors', date: 'June 08, 2026' },
          { id: 'b3', name: 'Circuit Wizard', badgeCode: 'CW', icon: '', desc: 'Assembled ultrasonic breadboard with zero polarity faults', date: 'June 11, 2026' },
          { id: 'b4', name: 'Bug Hunter', badgeCode: 'BH', icon: '', desc: 'Diagnosed and fixed 6 collision logic bugs in classmate review', date: 'June 14, 2026' }
        ],
        projects: [
          {
            id: 'PRJ-101',
            title: 'Mars Rover Obstacle Avoider',
            category: 'Robotics & Sensors',
            tools: 'mBot Neo, Arduino C++, Ultrasonic Sensor',
            desc: 'Self-driving 4WD rover programmed to scan front barriers, reverse on obstacle detection under 15cm, and trigger safety buzzer.',
            grade: 'A+',
            status: 'Completed & Certified',
            demoUrl: '#',
            mentorNote: 'Outstanding sensor threshold calibration! Tested on the obstacle track with 0 collisions.'
          },
          {
            id: 'PRJ-102',
            title: 'Space Defenders Retro Arcade',
            category: 'Game Development',
            tools: 'Scratch 3.0, Sound Effects, Vector Art',
            desc: 'Interactive 2D space arcade game with custom laser physics, score multiplier, alien boss behavior, and live high-score counter.',
            grade: 'A',
            status: 'Completed',
            demoUrl: '#',
            mentorNote: 'Creative sound design and smooth sprite control mechanics.'
          }
        ],
        mentorFeedback: 'Liam is demonstrating exceptional aptitude for sensor calibration. In today’s autonomous rover challenge, he optimized his turning radius logic and graciously helped his lab partner troubleshoot an infinite loop!'
      },
      {
        id: 'KID-102',
        name: 'Maya Adeyemi',
        age: 11,
        gender: 'Female',
        school: 'Abuja International Academy',
        trackId: 'JUNIOR_ENGINEERS',
        trackName: 'Junior Engineers & Python Pros (Ages 10–13)',
        preferredSession: 'Session 1: June 15 – June 26, 2026 (Afternoon: 1:30 PM – 5:00 PM)',
        avatar: 'MA',
        progressPct: 88,
        attendancePct: 100,
        attendedSessions: 20,
        totalSessions: 20,
        allergies: 'None',
        laptopProvided: true,
        instructor: 'Dr. Sarah Chen (Senior AI Mentor)',
        labRoom: 'Ada Lovelace Innovation Studio',
        milestones: [
          { title: 'Python Core Syntax, Dictionaries & Functions', status: 'Completed', pct: 100 },
          { title: 'Raspberry Pi / micro:bit GPIO Interfacing', status: 'Completed', pct: 100 },
          { title: 'Smart Sensor Telemetry & MQTT Data Logging', status: 'Completed', pct: 90 },
          { title: 'Computer Vision & OpenCV Object Recognition', status: 'In Progress', pct: 60 }
        ],
        skills: [
          { name: 'Python 3 Fundamentals', level: 'Advanced' },
          { name: 'Microcontroller GPIO', level: 'Advanced' },
          { name: 'IoT Environmental Sensors', level: 'Intermediate' },
          { name: 'Pygame Interactive Graphics', level: 'Intermediate' },
          { name: 'Git & Project Documentation', level: 'Intermediate' }
        ],
        badges: [
          { id: 'b5', name: 'Python Pioneer', badgeCode: 'PP', icon: '', desc: 'Constructed recursive algorithms and structured modular code', date: 'June 04, 2026' },
          { id: 'b6', name: 'Robo Architect', badgeCode: 'RA', icon: '', desc: 'Designed custom 3D printed mechanical gripper for arm servo', date: 'June 09, 2026' },
          { id: 'b7', name: 'Logic Master', badgeCode: 'LM', icon: '', desc: 'Solved complex binary math puzzles with fastest lab time', date: 'June 12, 2026' },
          { id: 'b8', name: 'Team Leader', badgeCode: 'TL', icon: '', desc: 'Led 4-student cohort in the Autonomous Smart Farm Hackathon', date: 'June 15, 2026' }
        ],
        projects: [
          {
            id: 'PRJ-201',
            title: 'Automated Smart Greenhouse IoT',
            category: 'Python & IoT Automation',
            tools: 'Python 3, micro:bit v2, Soil Moisture & DHT11 Temp Sensor',
            desc: 'Automated system measuring ambient room temperature and soil moisture. Actuates 5V servo water pumps when soil dries below 30%.',
            grade: 'A+',
            status: 'Completed & Certified',
            demoUrl: '#',
            mentorNote: 'Industry-standard Python coding practices with clean comments and error handling!'
          },
          {
            id: 'PRJ-202',
            title: 'Asteroid Dodger 2D Python Game',
            category: 'Software Engineering',
            tools: 'Python, Pygame, Physics Engine',
            desc: 'Physics-based asteroid avoidance game featuring dynamic velocity vectors, particle explosion effects, and local score persistence.',
            grade: 'A+',
            status: 'Completed',
            demoUrl: '#',
            mentorNote: 'Impressive object-oriented structure using clean class hierarchies.'
          }
        ],
        mentorFeedback: 'Maya has consistently set the standard in the Junior Engineers cohort. Her greenhouse automation code was highlighted during our Friday student showcase as an exemplary STEM capstone!'
      }
    ],

    // Programs Categorized by Age Group (4-6, 7-9, 10-13)
    programs: [
      {
        id: 'TINY_TECH',
        ageGroup: 'Ages 4–6',
        title: 'Tiny Tech Adventurers',
        subtitle: 'Early Coding, Block Robotics & Tactile STEM Discovery',
        tools: 'ScratchJr, Cubetto Robot, Lego Duplo Tech, Tactile Puzzles',
        instructor: 'Ms. Amina Bello & Coach Leo',
        capacity: 16,
        enrolledCount: 14,
        fee: '$260 / Session',
        scheduleTime: 'Morning (9:00 AM – 12:00 PM) or Afternoon (1:30 PM – 4:30 PM)',
        lab: 'Discovery PlayLab A',
        status: 'Filling Fast',
        description: 'Designed specifically for early learners. Children develop logical thinking, basic algorithmic sequencing, and motor coordination through tactile robots and playful ScratchJr challenges.'
      },
      {
        id: 'CREATIVE_CODERS',
        ageGroup: 'Ages 7–9',
        title: 'Creative Coders & Builders',
        subtitle: 'Scratch Game Development & Smart Robot Mechanics',
        tools: 'Scratch 3.0, Makeblock mBot Neo, Ultrasonic Sensors, Motors',
        instructor: 'Eng. David Okafor & Sarah K.',
        capacity: 22,
        enrolledCount: 19,
        fee: '$340 / Session',
        scheduleTime: 'Morning (9:00 AM – 12:30 PM) or Afternoon (1:30 PM – 5:00 PM)',
        lab: 'Turing Robotics Lab 2',
        status: 'Available',
        description: 'Young builders write interactive games, program autonomous rover navigation, and construct motorized gear machines with ultrasonic distance detection.'
      },
      {
        id: 'JUNIOR_ENGINEERS',
        ageGroup: 'Ages 10–13',
        title: 'Junior Engineers & Python Pros',
        subtitle: 'Python Programming, AI Sensors & Microcontroller IoT',
        tools: 'Python 3, Raspberry Pi Pico / micro:bit, Sensors, OpenCV AI',
        instructor: 'Dr. Sarah Chen & Eng. Tariq M.',
        capacity: 20,
        enrolledCount: 17,
        fee: '$420 / Session',
        scheduleTime: 'Morning (9:00 AM – 12:30 PM) or Afternoon (1:30 PM – 5:00 PM)',
        lab: 'Ada Lovelace AI Studio',
        status: 'Almost Full',
        description: 'Advanced campers learn real-world Python programming, build smart automated gadgets, explore computer vision basics, and assemble IoT environmental telemetry.'
      }
    ],

    // Camp Sessions & Cohorts
    sessions: [
      { id: 'SESS-1', name: 'Session 1: Launchpad Cohort', dates: 'June 15 – June 26, 2026', morningSlots: '9:00 AM – 12:30 PM', afternoonSlots: '1:30 PM – 5:00 PM', capacity: 58, enrolled: 50 },
      { id: 'SESS-2', name: 'Session 2: Cyber Builders Cohort', dates: 'July 6 – July 17, 2026', morningSlots: '9:00 AM – 12:30 PM', afternoonSlots: '1:30 PM – 5:00 PM', capacity: 58, enrolled: 44 },
      { id: 'SESS-3', name: 'Session 3: Future Inventors Cohort', dates: 'July 20 – July 31, 2026', morningSlots: '9:00 AM – 12:30 PM', afternoonSlots: '1:30 PM – 5:00 PM', capacity: 58, enrolled: 38 },
      { id: 'SESS-4', name: 'Session 4: Robo Championship Cohort', dates: 'August 3 – August 14, 2026', morningSlots: '9:00 AM – 12:30 PM', afternoonSlots: '1:30 PM – 5:00 PM', capacity: 58, enrolled: 32 }
    ],

    // All Enrollments across the camp (shared between Parent and Admin)
    enrollments: [
      {
        id: 'ENR-901',
        childName: 'Liam Adeyemi',
        age: 8,
        parentName: 'Sarah Adeyemi',
        parentEmail: 'sarah.adeyemi@example.com',
        parentPhone: '+234 803 123 4567',
        trackId: 'CREATIVE_CODERS',
        trackName: 'Creative Coders & Builders (Ages 7–9)',
        sessionName: 'Session 1: June 15 – June 26, 2026 (Morning: 9:00 AM – 12:30 PM)',
        timeSlot: 'Morning Slot',
        emergencyContact: 'Tunde Adeyemi (+234 802 987 6543)',
        laptopNeed: 'Provided by Parent',
        notes: 'Enthusiastic about Lego robotics and Scratch platformer games.',
        status: 'Approved',
        dateSubmitted: '2026-05-10',
        paymentStatus: 'Paid ($340)',
        voucherCode: 'CAMP-ROBO-2601'
      },
      {
        id: 'ENR-902',
        childName: 'Maya Adeyemi',
        age: 11,
        parentName: 'Sarah Adeyemi',
        parentEmail: 'sarah.adeyemi@example.com',
        parentPhone: '+234 803 123 4567',
        trackId: 'JUNIOR_ENGINEERS',
        trackName: 'Junior Engineers & Python Pros (Ages 10–13)',
        sessionName: 'Session 1: June 15 – June 26, 2026 (Afternoon: 1:30 PM – 5:00 PM)',
        timeSlot: 'Afternoon Slot',
        emergencyContact: 'Tunde Adeyemi (+234 802 987 6543)',
        laptopNeed: 'Campus Lab Loaner',
        notes: 'Wants to build autonomous rover with micro:bit sensors.',
        status: 'Approved',
        dateSubmitted: '2026-05-12',
        paymentStatus: 'Paid ($420)',
        voucherCode: 'CAMP-PYRO-2602'
      },
      {
        id: 'ENR-903',
        childName: 'Ethan Vance',
        age: 5,
        parentName: 'Marcus Vance',
        parentEmail: 'm.vance@techhorizon.ng',
        parentPhone: '+234 809 333 1122',
        trackId: 'TINY_TECH',
        trackName: 'Tiny Tech Adventurers (Ages 4–6)',
        sessionName: 'Session 1: June 15 – June 26, 2026 (Morning: 9:00 AM – 12:00 PM)',
        timeSlot: 'Morning Slot',
        emergencyContact: 'Grace Vance (+234 809 333 1123)',
        laptopNeed: 'Tactile Kits Only',
        notes: 'First time coding camp. Very keen on Duplo motorized trains.',
        status: 'Approved',
        dateSubmitted: '2026-05-18',
        paymentStatus: 'Paid ($260)',
        voucherCode: 'CAMP-TINY-2603'
      },
      {
        id: 'ENR-904',
        childName: 'Chloe Dubois',
        age: 9,
        parentName: 'Claire Dubois',
        parentEmail: 'claire.dubois@embassymail.org',
        parentPhone: '+234 811 445 6677',
        trackId: 'CREATIVE_CODERS',
        trackName: 'Creative Coders & Builders (Ages 7–9)',
        sessionName: 'Session 2: July 6 – July 17, 2026 (Morning: 9:00 AM – 12:30 PM)',
        timeSlot: 'Morning Slot',
        emergencyContact: 'Jean Dubois (+234 811 445 6678)',
        laptopNeed: 'Provided by Parent',
        notes: 'Has completed Scratch beginner module at school.',
        status: 'Approved',
        dateSubmitted: '2026-05-22',
        paymentStatus: 'Paid ($340)',
        voucherCode: 'CAMP-ROBO-2604'
      },
      {
        id: 'ENR-905',
        childName: 'Tariq Al-Mansoor',
        age: 12,
        parentName: 'Omar Al-Mansoor',
        parentEmail: 'omar.almansoor@petroglobal.com',
        parentPhone: '+234 802 778 9900',
        trackId: 'JUNIOR_ENGINEERS',
        trackName: 'Junior Engineers & Python Pros (Ages 10–13)',
        sessionName: 'Session 2: July 6 – July 17, 2026 (Morning: 9:00 AM – 12:30 PM)',
        timeSlot: 'Morning Slot',
        emergencyContact: 'Fatima Mansoor (+234 802 778 9901)',
        laptopNeed: 'Campus Lab Loaner',
        notes: 'Experienced with basic C++ Arduino sketches.',
        status: 'Approved',
        dateSubmitted: '2026-05-25',
        paymentStatus: 'Paid ($420)',
        voucherCode: 'CAMP-PYRO-2605'
      },
      // Sample PENDING requests for immediate Admin review demonstration
      {
        id: 'ENR-906',
        childName: 'Kemi Adeleke',
        age: 7,
        parentName: 'Femi Adeleke',
        parentEmail: 'femi.adeleke@bankcorp.ng',
        parentPhone: '+234 803 555 7788',
        trackId: 'CREATIVE_CODERS',
        trackName: 'Creative Coders & Builders (Ages 7–9)',
        sessionName: 'Session 2: July 6 – July 17, 2026 (Morning: 9:00 AM – 12:30 PM)',
        timeSlot: 'Morning Slot',
        emergencyContact: 'Bisi Adeleke (+234 803 555 7789)',
        laptopNeed: 'Campus Lab Loaner',
        notes: 'Kemi loves playing video games and wants to build her own.',
        status: 'Pending',
        dateSubmitted: '2026-06-02',
        paymentStatus: 'Pending Verification',
        voucherCode: 'CAMP-PEND-2606'
      },
      {
        id: 'ENR-907',
        childName: 'Zane Patel',
        age: 10,
        parentName: 'Ananya Patel',
        parentEmail: 'ananya.patel@zenithsol.com',
        parentPhone: '+234 805 112 2334',
        trackId: 'JUNIOR_ENGINEERS',
        trackName: 'Junior Engineers & Python Pros (Ages 10–13)',
        sessionName: 'Session 2: July 6 – July 17, 2026 (Afternoon: 1:30 PM – 5:00 PM)',
        timeSlot: 'Afternoon Slot',
        emergencyContact: 'Dev Patel (+234 805 112 2335)',
        laptopNeed: 'Provided by Parent',
        notes: 'Wants to prepare for the National Youth Robotics Olympiad.',
        status: 'Pending',
        dateSubmitted: '2026-06-03',
        paymentStatus: 'Pending Verification',
        voucherCode: 'CAMP-PEND-2607'
      },
      {
        id: 'ENR-908',
        childName: 'Noah Henderson',
        age: 5,
        parentName: 'Rachel Henderson',
        parentEmail: 'rachel.henderson@globallogic.org',
        parentPhone: '+234 818 990 0112',
        trackId: 'TINY_TECH',
        trackName: 'Tiny Tech Adventurers (Ages 4–6)',
        sessionName: 'Session 1: June 15 – June 26, 2026 (Morning: 9:00 AM – 12:00 PM)',
        timeSlot: 'Morning Slot',
        emergencyContact: 'Mark Henderson (+234 818 990 0113)',
        laptopNeed: 'Tactile Kits Only',
        notes: 'Enjoys building blocks and puzzle games.',
        status: 'Pending',
        dateSubmitted: '2026-06-04',
        paymentStatus: 'Pending Verification',
        voucherCode: 'CAMP-PEND-2608'
      }
    ],

    // Camp Announcements & Bulletins
    announcements: [
      {
        id: 'ANN-1',
        title: 'Summer Camp 2026 Official Orientation This Saturday!',
        category: 'Camp Event',
        badgeColor: 'green',
        date: 'June 10, 2026',
        author: 'Camp Administration',
        content: 'Join us at 10:00 AM in the Main Turing Auditorium. Parents and campers will meet lead mentors, tour the robotics hardware arenas, collect student ID tags, and test lab laptop credentials.'
      },
      {
        id: 'ANN-2',
        title: 'Hardware Kits & mBot Neo Equipment Arrival Confirmed',
        category: 'Lab Equipment',
        badgeColor: 'orange',
        date: 'June 08, 2026',
        author: 'Robotics Lab Lead',
        content: 'All fresh Makeblock mBot Neo educational kits, micro:bit v2 microcontrollers, and ultrasonic sensor modules have passed safety testing and are assigned to respective laboratory lockers.'
      },
      {
        id: 'ANN-3',
        title: 'Friday Capstone Exhibition & Robot Arena Races',
        category: 'Showcase',
        badgeColor: 'yellow',
        date: 'June 05, 2026',
        author: 'Curriculum Director',
        content: 'On the final day of each 2-week cohort, parents are cordially invited at 3:30 PM to witness student project presentations, autonomous maze navigations, and graduation badge ceremonies!'
      }
    ],

    // Parent Enquiries & Support Tickets
    enquiries: [
      {
        id: 'ENQ-1',
        parentName: 'Sarah Adeyemi',
        email: 'sarah.adeyemi@example.com',
        subject: 'Can Liam bring his personal iPad for Scratch coding?',
        message: 'Hello camp team, Liam has his own iPad with ScratchJr and Scratch 3.0 installed. Should he bring it, or will a campus laptop be provided for every session?',
        status: 'Resolved',
        date: 'June 02, 2026',
        response: 'Hi Sarah! Laptops with all development environments pre-configured are provided for every camper in Lab 2. However, Liam is very welcome to bring his iPad for sketch testing!'
      },
      {
        id: 'ENQ-2',
        parentName: 'Rachel Henderson',
        email: 'rachel.henderson@globallogic.org',
        subject: 'Nut allergy safety during Tiny Tech snack breaks',
        message: 'Noah has a severe peanut allergy. Are snack breaks strictly peanut-free, and is medical staff available on campus?',
        status: 'Pending',
        date: 'June 04, 2026',
        response: ''
      },
      {
        id: 'ENQ-3',
        parentName: 'Omar Al-Mansoor',
        email: 'omar.almansoor@petroglobal.com',
        subject: 'Can Tariq take home the robot kit after graduation?',
        message: 'Does the camp tuition include take-home hardware or can we purchase his assembled mBot rover kit after the camp?',
        status: 'Resolved',
        date: 'June 03, 2026',
        response: 'Yes! Campers in Junior Engineers have the option to keep their custom micro:bit sensor circuit, and complete mBot take-home bundles are available in the camp store at a 30% student discount.'
      }
    ],

    // Camp Instructors & Mentors
    instructors: [
      { id: 'INS-1', name: 'Dr. Sarah Chen', title: 'Senior AI & Robotics Lead', specialty: 'Python, OpenCV & Autonomous Systems', cohorts: 'Junior Engineers (10–13)', rating: '4.9/5' },
      { id: 'INS-2', name: 'Eng. David Okafor', title: 'Hardware & Mechatronics Mentor', specialty: 'mBot Neo, Arduino & Motor Controls', cohorts: 'Creative Coders (7–9)', rating: '5.0/5' },
      { id: 'INS-3', name: 'Ms. Amina Bello', title: 'Early STEM Education Specialist', specialty: 'ScratchJr, Cubetto & Computational Play', cohorts: 'Tiny Tech (4–6)', rating: '4.9/5' },
      { id: 'INS-4', name: 'Coach Marcus Vance', title: 'Game Engineering Instructor', specialty: 'Scratch 3.0, Pygame & Algorithm Logic', cohorts: 'Creative Coders & Junior Engineers', rating: '4.8/5' }
    ],

    // Attendance Log for Today / Active Session
    dailyAttendance: [
      { studentId: 'KID-101', name: 'Liam Adeyemi', track: 'Creative Coders (7–9)', session: 'Session 1 (Morning)', status: 'Present', timeIn: '08:52 AM', notes: 'Arrived early with team' },
      { studentId: 'KID-102', name: 'Maya Adeyemi', track: 'Junior Engineers (10–13)', session: 'Session 1 (Afternoon)', status: 'Present', timeIn: '01:25 PM', notes: 'Completed greenhouse challenge' },
      { studentId: 'ETH-103', name: 'Ethan Vance', track: 'Tiny Tech (4–6)', session: 'Session 1 (Morning)', status: 'Present', timeIn: '09:00 AM', notes: 'Built motorized crane' },
      { studentId: 'CHL-104', name: 'Chloe Dubois', track: 'Creative Coders (7–9)', session: 'Session 1 (Morning)', status: 'Present', timeIn: '08:58 AM', notes: 'Refactored Scratch variables' },
      { studentId: 'TAR-105', name: 'Tariq Al-Mansoor', track: 'Junior Engineers (10–13)', session: 'Session 1 (Afternoon)', status: 'Late', timeIn: '01:48 PM', notes: 'Traffic delay, caught up quickly' }
    ]
  };

  // State Management Class
  class CampStorageService {
    constructor() {
      this.initStore();
    }

    initStore() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
          this.saveStore(DEFAULT_CAMP_DATA);
        } else {
          // Verify critical keys exist
          const parsed = JSON.parse(stored);
          if (!parsed.enrollments || !parsed.children || !parsed.programs) {
            this.saveStore(DEFAULT_CAMP_DATA);
          }
        }
      } catch (err) {
        console.warn('LocalStorage access issue, falling back to in-memory store', err);
      }
    }

    sanitizeStore(store) {
      if (!store) return store;
      const emojiRegex = /[\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\u2300-\u23FF]/g;
      if (Array.isArray(store.children)) {
        store.children.forEach(c => {
          if (c.avatar && emojiRegex.test(c.avatar)) {
            c.avatar = (c.name || 'ST').split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
          }
          if (Array.isArray(c.badges)) {
            c.badges.forEach(b => {
              b.icon = '';
              if (!b.badgeCode) {
                b.badgeCode = (b.name || 'BG').split(' ').map(w => w[0]).join('').substring(0, 3).toUpperCase();
              }
            });
          }
        });
      }
      if (Array.isArray(store.announcements)) {
        store.announcements.forEach(a => {
          if (a.title && emojiRegex.test(a.title)) {
            a.title = a.title.replace(emojiRegex, '').trim();
          }
        });
      }
      return store;
    }

    getStore() {
      try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) return this.sanitizeStore(JSON.parse(data));
      } catch (e) {
        console.error('Error parsing camp store', e);
      }
      return JSON.parse(JSON.stringify(DEFAULT_CAMP_DATA));
    }

    saveStore(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('campDataUpdated', { detail: data }));
      } catch (e) {
        console.error('Error saving camp store', e);
      }
    }

    resetStore() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CAMP_DATA));
        window.dispatchEvent(new CustomEvent('campDataUpdated', { detail: DEFAULT_CAMP_DATA }));
        return true;
      } catch (e) {
        console.error('Error resetting camp store', e);
        return false;
      }
    }

    // Enrollments
    getEnrollments() {
      return this.getStore().enrollments || [];
    }

    addEnrollment(newEnrollment) {
      const store = this.getStore();
      const id = 'ENR-' + Math.floor(1000 + Math.random() * 9000);
      const voucher = 'CAMP-REQ-' + Math.floor(1000 + Math.random() * 9000);

      const record = {
        id,
        voucherCode: voucher,
        dateSubmitted: new Date().toISOString().split('T')[0],
        status: 'Pending',
        paymentStatus: 'Pending Review',
        ...newEnrollment
      };

      store.enrollments.unshift(record);
      this.saveStore(store);
      return record;
    }

    updateEnrollmentStatus(enrollmentId, newStatus) {
      const store = this.getStore();
      const enr = store.enrollments.find(e => e.id === enrollmentId);
      if (enr) {
        enr.status = newStatus;
        if (newStatus === 'Approved') {
          enr.paymentStatus = 'Confirmed';
        } else if (newStatus === 'Rejected') {
          enr.paymentStatus = 'Declined';
        }
        this.saveStore(store);
        return enr;
      }
      return null;
    }

    // Children
    getChildren() {
      return this.getStore().children || [];
    }

    addChild(childData) {
      const store = this.getStore();
      const id = 'KID-' + Math.floor(100 + Math.random() * 900);
      const newChild = {
        id,
        progressPct: 0,
        attendancePct: 100,
        attendedSessions: 0,
        totalSessions: 20,
        badges: [],
        projects: [],
        milestones: [
          { title: 'Core Logic & Sequencing Foundations', status: 'Upcoming', pct: 0 },
          { title: 'Mechanical Assembly & Motor Circuits', status: 'Upcoming', pct: 0 },
          { title: 'Sensory Feedback & Autonomous Loops', status: 'Upcoming', pct: 0 },
          { title: 'Capstone Showcase & Competition', status: 'Upcoming', pct: 0 }
        ],
        skills: [
          { name: 'Algorithmic Thinking', level: 'Beginner' },
          { name: 'Circuit Basics', level: 'Beginner' }
        ],
        mentorFeedback: 'Welcome to Summer Camp 2026! Excited to build together.',
        ...childData
      };

      store.children.push(newChild);
      this.saveStore(store);
      return newChild;
    }

    updateChild(childId, updates) {
      const store = this.getStore();
      const child = store.children.find(c => c.id === childId);
      if (child) {
        Object.assign(child, updates);
        this.saveStore(store);
        return child;
      }
      return null;
    }

    awardBadgeToStudent(studentId, badge) {
      const store = this.getStore();
      const child = store.children.find(c => c.id === studentId || c.name.toLowerCase() === studentId.toLowerCase());
      if (child) {
        if (!child.badges) child.badges = [];
        const newBadge = {
          id: 'b-' + Date.now(),
          name: badge.name || 'Achievement Star',
          icon: badge.icon || '⭐',
          desc: badge.desc || 'Recognized for excellent STEM problem solving',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
        };
        child.badges.push(newBadge);
        this.saveStore(store);
        return newBadge;
      }
      return null;
    }

    addProjectToStudent(studentId, projectData) {
      const store = this.getStore();
      const child = store.children.find(c => c.id === studentId || c.name.toLowerCase() === studentId.toLowerCase());
      if (child) {
        if (!child.projects) child.projects = [];
        const newProj = {
          id: 'PRJ-' + Date.now(),
          status: 'Under Review',
          grade: 'Awaiting Grade',
          mentorNote: 'Submitted for faculty evaluation.',
          ...projectData
        };
        child.projects.push(newProj);
        this.saveStore(store);
        return newProj;
      }
      return null;
    }

    // Programs
    getPrograms() {
      return this.getStore().programs || [];
    }

    updateProgram(programId, updates) {
      const store = this.getStore();
      const prog = store.programs.find(p => p.id === programId);
      if (prog) {
        Object.assign(prog, updates);
        this.saveStore(store);
        return prog;
      }
      return null;
    }

    // Announcements
    getAnnouncements() {
      return this.getStore().announcements || [];
    }

    addAnnouncement(annData) {
      const store = this.getStore();
      const newAnn = {
        id: 'ANN-' + Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        author: 'Camp Administration',
        badgeColor: annData.badgeColor || 'green',
        ...annData
      };
      store.announcements.unshift(newAnn);
      this.saveStore(store);
      return newAnn;
    }

    deleteAnnouncement(annId) {
      const store = this.getStore();
      store.announcements = store.announcements.filter(a => a.id !== annId);
      this.saveStore(store);
      return true;
    }

    // Enquiries
    getEnquiries() {
      return this.getStore().enquiries || [];
    }

    addEnquiry(enqData) {
      const store = this.getStore();
      const newEnq = {
        id: 'ENQ-' + Math.floor(100 + Math.random() * 900),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: 'Pending',
        response: '',
        ...enqData
      };
      store.enquiries.unshift(newEnq);
      this.saveStore(store);
      return newEnq;
    }

    replyEnquiry(enquiryId, replyText) {
      const store = this.getStore();
      const item = store.enquiries.find(e => e.id === enquiryId);
      if (item) {
        item.response = replyText;
        item.status = 'Resolved';
        this.saveStore(store);
        return item;
      }
      return null;
    }

    // Attendance
    getAttendance() {
      return this.getStore().dailyAttendance || [];
    }

    updateAttendance(studentId, newStatus) {
      const store = this.getStore();
      const item = store.dailyAttendance.find(a => a.studentId === studentId);
      if (item) {
        item.status = newStatus;
        this.saveStore(store);
        return item;
      }
      return null;
    }
  }

  // Expose global singleton
  window.CampStore = new CampStorageService();

  // Explicit Brand Logo home redirect handler for dashboards
  document.addEventListener('DOMContentLoaded', () => {
    const dashBrandLinks = document.querySelectorAll('.dash-brand-link');
    dashBrandLinks.forEach(link => {
      link.style.cursor = 'pointer';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html';
      });
    });
  });
})();

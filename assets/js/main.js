/**
 * CODECAMPUS INTERNATIONAL - KIDS ROBOTICS & CODING SUMMER CAMP
 * Master Interactive JavaScript (Vanilla JS only)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndRtl();
  initBrandRedirect();
  initMobileNav();
  initStickyHeader();
  initHeroAnimations();
  initCampCountdown();
  initAccountDropdown();
  initParentPortal();
  initTestimonialSlider();
  initFaqAccordions();
  initProjectFilters();
  initBlogFilterAndReader();
  initProgramQuiz();
  initFormsValidation();
  initCyberTrackStudio();
  initBentoSuperpowers();
  initLabExplorer();
  initAbujaStoryScrubber();
  initFacilityTour();
  initCampScheduleRibbon();
  initFlightpathStage();
  initBadgeTrophyShowcase();
  initCampusRoutePlanner();
});

/* ==========================================================================
   0. BRAND LOGO & HOME REDIRECTION CONTROLLER
   Ensures clicking brand logo/name on any page or inside modal reliably redirects to home page
   ========================================================================== */
function initBrandRedirect() {
  const brandSelectors = [
    '.brand-logo',
    '.footer-logo',
    '.portal-header-brand-link',
    '.portal-modal-topbar-left',
    '.dash-brand-link'
  ].join(', ');

  const brandLinks = document.querySelectorAll(brandSelectors);

  brandLinks.forEach(link => {
    link.style.cursor = 'pointer';

    link.addEventListener('click', (e) => {
      // 1. Close Parent Portal modal if currently open
      const portalModal = document.getElementById('parentPortalModal');
      if (portalModal && portalModal.classList.contains('active')) {
        portalModal.classList.remove('active');
        document.body.style.overflow = '';
      }

      // 2. Close mobile drawer if open
      const drawer = document.getElementById('mobileNavDrawer');
      const backdrop = document.getElementById('mobileNavBackdrop');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }

      // 3. Close any open account dropdown
      document.querySelectorAll('.account-dropdown-wrapper.active').forEach(w => {
        w.classList.remove('active');
        const btn = w.querySelector('.account-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      // 4. Clean up any trailing hash like #
      if (window.location.hash) {
        try {
          history.pushState('', document.title, window.location.pathname);
        } catch (err) {}
      }

      // 5. Check if already on the home page (index.html or root)
      const path = window.location.pathname.replace(/\\/g, '/');
      const isHome = path.endsWith('/index.html') || path.endsWith('/') || path.endsWith('/kids') || path.endsWith('/kids/index.html');

      if (isHome) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // If already at or very near top, ensure a clean reload to index.html without hash
        if (window.scrollY < 20) {
          window.location.href = 'index.html';
        }
      } else {
        e.preventDefault();
        window.location.href = 'index.html';
      }
    });
  });
}

/* ==========================================================================
   1. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const closeBtn = document.getElementById('mobileNavClose');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Close when clicking nav links or portal buttons inside drawer
  const drawerActionElements = drawer.querySelectorAll('.mobile-nav-link, .open-portal-btn, .mobile-acc-btn, .mobile-drawer-cta');
  drawerActionElements.forEach(el => {
    el.addEventListener('click', () => {
      setTimeout(closeDrawer, 60);
    });
  });
}

/* ==========================================================================
   2. STICKY HEADER SCROLL EFFECT
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   2B. UNIQUE MODERN HERO ANIMATIONS & TRACK SWITCHER
   ========================================================================== */
function initHeroAnimations() {
  const typingWord = document.getElementById('heroTypingWord');
  const trackBtns = document.querySelectorAll('.hero-track-btn');
  const skillChips = document.querySelectorAll('#heroSkillsGrid .skill-chip-pill');
  const learnAgePill = document.getElementById('learnAgePill');
  const visualWrapper = document.querySelector('.hero-visual-card-wrapper');

  // 1. Dynamic Role Switcher Typewriter Animation
  if (typingWord) {
    const roles = [
      'Game Creators',
      'Robot Builders',
      'Python Coders',
      'Smart Inventors',
      'AI Explorers'
    ];
    let currentIndex = 0;

    setInterval(() => {
      typingWord.style.opacity = '0';
      typingWord.style.transform = 'translateY(8px)';
      
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % roles.length;
        typingWord.textContent = roles[currentIndex];
        typingWord.style.opacity = '1';
        typingWord.style.transform = 'translateY(0)';
      }, 300);
    }, 2400);
  }

  // 2. Interactive Track Switcher Chips
  if (trackBtns.length > 0 && skillChips.length > 0) {
    const ageMap = {
      'all': 'Ages 4–13',
      'scratch': 'Ages 4–8 (Junior)',
      'robotics': 'Ages 7–12 (Maker)',
      'python': 'Ages 9–13 (Senior)'
    };

    trackBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        trackBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const track = btn.getAttribute('data-track');
        if (learnAgePill && ageMap[track]) {
          learnAgePill.textContent = ageMap[track];
        }

        skillChips.forEach(chip => {
          const chipTrack = chip.getAttribute('data-track');
          if (track === 'all' || chipTrack === track) {
            chip.style.display = 'inline-flex';
            chip.style.opacity = '1';
            chip.style.transform = 'scale(1)';
            chip.style.borderColor = track === 'all' ? 'rgba(255, 255, 255, 0.1)' : 'var(--color-yellow-bright)';
            chip.style.background = track === 'all' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 187, 0, 0.2)';
          } else {
            chip.style.opacity = '0.25';
            chip.style.transform = 'scale(0.95)';
            chip.style.borderColor = 'rgba(255, 255, 255, 0.05)';
            chip.style.background = 'rgba(255, 255, 255, 0.03)';
          }
        });
      });
    });
  }

  // 3. 3D Subtle Tilt Effect on Hero Visual on Desktop
  if (visualWrapper && window.matchMedia('(hover: hover) and (min-width: 992px)').matches) {
    visualWrapper.addEventListener('mousemove', (e) => {
      const rect = visualWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      visualWrapper.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    visualWrapper.addEventListener('mouseleave', () => {
      visualWrapper.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  }
}

/* ==========================================================================
   3. CAMP COUNTDOWN TIMER
   ========================================================================== */
function initCampCountdown() {
  const daysEl = document.getElementById('countdownDays');
  const hoursEl = document.getElementById('countdownHours');
  const minutesEl = document.getElementById('countdownMinutes');
  const secondsEl = document.getElementById('countdownSeconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Camp Start Date: August 3rd, 2026, 09:00:00 AM
  const campDate = new Date('August 3, 2026 09:00:00').getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = campDate - now;

    if (distance < 0) {
      daysEl.innerText = '00';
      hoursEl.innerText = '00';
      minutesEl.innerText = '00';
      secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? '0' + days : days;
    hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   4. PARENT PORTAL MODAL & FUNCTIONAL DASHBOARD UI
   ========================================================================== */
const mockChildData = {
  liam: {
    name: 'Liam Adeyemi',
    age: '8 Years Old',
    track: 'Creative Coders & Scratch Game Studio',
    attendancePercent: '95%',
    attendedSessions: '19 of 20 Sessions',
    currentLevel: 'Intermediate Scratch & Robotics Rover',
    mentor: 'Sarah O. (STEM Coach)',
    nextSession: 'Monday, 9:00 AM - Room 204 (Lab Alpha)',
    skills: [
      { name: 'Algorithmic Thinking & Loops', score: 95 },
      { name: 'Scratch Game Mechanics & Variables', score: 92 },
      { name: 'Hardware Breadboarding & LED Wiring', score: 88 },
      { name: 'Problem Solving & Teamwork', score: 96 }
    ],
    projects: [
      { title: 'Space Crystal Collector 2D', status: 'Completed & Certified', grade: 'A+' },
      { title: 'Obstacle Avoiding Mini-Buggy', status: 'Working Prototype', grade: 'A' },
      { title: 'Interactive Animal Quiz', status: 'Published to Gallery', grade: 'A+' }
    ],
    feedback: 'Liam demonstrated brilliant creativity during Wednesday’s sensor troubleshooting session. He resolved a loose ultrasonic jumper wire independently and helped his teammate debug their loop logic!',
    announcements: [
      'Demo Day is scheduled for Friday, August 28th at 11:00 AM. Parents are warmly invited to watch Liam pitch his robot.',
      'Camp T-shirts and personalized badges have been distributed.'
    ]
  },
  zoe: {
    name: 'Zoe Adeyemi',
    age: '11 Years Old',
    track: 'Junior Software Engineer & Autonomous Robotics',
    attendancePercent: '100%',
    attendedSessions: '20 of 20 Sessions',
    currentLevel: 'Advanced Python & Arduino Automation',
    mentor: 'David K. (Robotics Lead)',
    nextSession: 'Monday, 9:00 AM - Robotics Arena 3',
    skills: [
      { name: 'Python Syntax, Functions & Arrays', score: 96 },
      { name: 'Arduino C++ & Sensor Microcontrollers', score: 94 },
      { name: 'Autonomous Navigation Algorithms', score: 90 },
      { name: 'Technical Presentation & Code Review', score: 98 }
    ],
    projects: [
      { title: 'Smart Eco-House micro:bit Automation', status: 'Completed & Certified', grade: 'A+' },
      { title: 'Autonomous LiDAR Obstacle Rover', status: 'Field Tested', grade: 'A+' },
      { title: 'Personal Summer Portfolio Site', status: 'Live on CodeCampus Net', grade: 'A' }
    ],
    feedback: 'Zoe is excelling at writing clean Python code. Her autonomous rover successfully navigated the 5-obstacle obstacle course with zero collisions on the first run!',
    announcements: [
      'Python Hackathon submission deadline is this Thursday at 1:00 PM.',
      'Graduation certificate and hardware kit take-home packing checklist sent.'
    ]
  }
};

/* ==========================================================================
   HEADER ACCOUNT DROPDOWN (Login/Signup, Admin Dashboard, User Dashboard)
   ========================================================================== */
function initAccountDropdown() {
  const wrappers = document.querySelectorAll('.account-dropdown-wrapper');
  if (!wrappers.length) return;

  wrappers.forEach(wrapper => {
    const toggleBtn = wrapper.querySelector('.account-dropdown-toggle');
    const menu = wrapper.querySelector('.account-dropdown-menu');
    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isActive = wrapper.classList.contains('active');

      // Close all dropdowns first
      document.querySelectorAll('.account-dropdown-wrapper.active').forEach(w => {
        if (w !== wrapper) {
          w.classList.remove('active');
          const btn = w.querySelector('.account-dropdown-toggle');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        wrapper.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        wrapper.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close when clicking an item
    menu.querySelectorAll('.account-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        wrapper.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.account-dropdown-wrapper.active').forEach(wrapper => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('active');
        const btn = wrapper.querySelector('.account-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.account-dropdown-wrapper.active').forEach(wrapper => {
        wrapper.classList.remove('active');
        const btn = wrapper.querySelector('.account-dropdown-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

function initParentPortal() {
  const portalModal = document.getElementById('parentPortalModal');
  const openButtons = document.querySelectorAll('.open-portal-btn');
  const closeButton = document.getElementById('portalModalClose');

  if (!portalModal) return;

  const tabLogin = document.getElementById('authTabLogin');
  const tabRegister = document.getElementById('authTabRegister');
  const formLogin = document.getElementById('parentLoginForm');
  const formRegister = document.getElementById('parentRegisterForm');
  const dashboardView = document.getElementById('portalDashboardView');
  const authContainer = document.getElementById('portalAuthContainer');
  const authTabsNav = document.getElementById('authTabsNav');
  const authSocialSection = document.getElementById('authSocialSection');
  const parentResetView = document.getElementById('parentResetView');

  function openPortal() {
    portalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePortal() {
    portalModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openPortal();
    if (btn.getAttribute('data-auth-mode') === 'register' && tabRegister) {
      showRegisterTab();
    } else if (tabLogin) {
      showLoginTab();
    }
  }));

  if (closeButton) closeButton.addEventListener('click', closePortal);

  portalModal.addEventListener('click', (e) => {
    if (e.target === portalModal) closePortal();
  });

  // Password Visibility Toggles
  document.querySelectorAll('.pwd-visibility-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-for');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      const eyeOpen = btn.querySelector('.icon-eye-open');
      const eyeClosed = btn.querySelector('.icon-eye-closed');
      if (eyeOpen && eyeClosed) {
        if (isPassword) {
          eyeOpen.style.display = 'none';
          eyeClosed.style.display = 'block';
          btn.setAttribute('title', 'Hide password');
        } else {
          eyeOpen.style.display = 'block';
          eyeClosed.style.display = 'none';
          btn.setAttribute('title', 'Show password');
        }
      }
    });
  });

  // Auth Tabs (Login vs Register)
  function showLoginTab() {
    if (tabLogin) tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
    if (formLogin) formLogin.style.display = 'block';
    if (formRegister) formRegister.style.display = 'none';
    if (parentResetView) parentResetView.style.display = 'none';
    if (authTabsNav) authTabsNav.style.display = 'flex';
    if (authSocialSection) authSocialSection.style.display = 'block';
  }

  function showRegisterTab() {
    if (tabRegister) tabRegister.classList.add('active');
    if (tabLogin) tabLogin.classList.remove('active');
    if (formRegister) formRegister.style.display = 'block';
    if (formLogin) formLogin.style.display = 'none';
    if (parentResetView) parentResetView.style.display = 'none';
    if (authTabsNav) authTabsNav.style.display = 'flex';
    if (authSocialSection) authSocialSection.style.display = 'none';
  }

  if (tabLogin) tabLogin.addEventListener('click', showLoginTab);
  if (tabRegister) tabRegister.addEventListener('click', showRegisterTab);

  // Successful Login Handler
  function handleSuccessfulLogin(email, name, providerNote) {
    localStorage.setItem('codecampus_parent_logged', 'true');
    localStorage.setItem('codecampus_parent_email', email);
    localStorage.setItem('codecampus_parent_name', name);
    showToast(`Welcome back, ${name}! ${providerNote}`, 'success');

    if (authContainer) authContainer.style.display = 'none';
    if (dashboardView) dashboardView.classList.add('active');
    if (typeof renderChildProfile === 'function') {
      renderChildProfile('liam');
    }
  }

  // Form Submit -> Log in into Dashboard
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail')?.value.trim();
      const pass = document.getElementById('loginPassword')?.value.trim();

      if (!email || !pass) {
        showToast('Please enter both your email and password.', 'error');
        return;
      }

      handleSuccessfulLogin(email, 'Mrs. O. Adeyemi', 'Loading Dashboard...');
    });
  }

  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('regParentName')?.value.trim() || 'Parent';
      const email = document.getElementById('regEmail')?.value.trim();

      if (!email) {
        showToast('Please provide your email address.', 'error');
        return;
      }

      handleSuccessfulLogin(email, parentName, 'Account created! Opening portal...');
    });
  }

  // Social Logins (Google & Apple)
  const btnGoogle = document.getElementById('btnGoogleLogin');
  const btnApple = document.getElementById('btnAppleLogin');

  if (btnGoogle) {
    btnGoogle.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Connecting with Google (sarah.adeyemi@gmail.com)...', 'info');
      setTimeout(() => {
        handleSuccessfulLogin('sarah.adeyemi@gmail.com', 'Sarah Adeyemi', 'Signed in via Google.');
      }, 500);
    });
  }

  if (btnApple) {
    btnApple.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Authenticating with Apple ID...', 'info');
      setTimeout(() => {
        handleSuccessfulLogin('sarah.adeyemi@icloud.com', 'Sarah Adeyemi', 'Signed in via Apple ID.');
      }, 500);
    });
  }

  // Forgot Password & Reset Flow
  const btnForgotPwd = document.getElementById('btnForgotPwd');
  const btnBackToLogin1 = document.getElementById('btnBackToLogin1');
  const formResetRequest = document.getElementById('formResetRequest');
  const formResetConfirm = document.getElementById('formResetConfirm');
  const resetSentBanner = document.getElementById('resetSentBanner');
  const resetEmailInput = document.getElementById('resetEmailInput');
  const resetTargetEmail = document.getElementById('resetTargetEmail');

  if (btnForgotPwd) {
    btnForgotPwd.addEventListener('click', (e) => {
      e.preventDefault();
      if (formLogin) formLogin.style.display = 'none';
      if (formRegister) formRegister.style.display = 'none';
      if (authTabsNav) authTabsNav.style.display = 'none';
      if (authSocialSection) authSocialSection.style.display = 'none';
      if (parentResetView) parentResetView.style.display = 'block';

      if (formResetRequest) formResetRequest.style.display = 'block';
      if (formResetConfirm) formResetConfirm.style.display = 'none';
      if (resetSentBanner) resetSentBanner.style.display = 'none';

      const currentEmail = document.getElementById('loginEmail')?.value.trim();
      if (currentEmail && resetEmailInput) {
        resetEmailInput.value = currentEmail;
      }
    });
  }

  if (btnBackToLogin1) {
    btnBackToLogin1.addEventListener('click', (e) => {
      e.preventDefault();
      showLoginTab();
    });
  }

  if (formResetRequest) {
    formResetRequest.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = resetEmailInput?.value.trim();
      if (!email) {
        showToast('Please enter your parent email address.', 'error');
        return;
      }

      if (resetTargetEmail) resetTargetEmail.textContent = email;
      showToast('Verification code (OTP: 482910) sent to your inbox!', 'success');
      formResetRequest.style.display = 'none';
      if (formResetConfirm) formResetConfirm.style.display = 'block';
      if (resetSentBanner) resetSentBanner.style.display = 'flex';
    });
  }

  if (formResetConfirm) {
    formResetConfirm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('resetOtpCode')?.value.trim();
      const newPass = document.getElementById('resetNewPassword')?.value.trim();
      const confPass = document.getElementById('resetConfirmPassword')?.value.trim();

      if (!code) {
        showToast('Please enter the 6-digit verification code.', 'error');
        return;
      }
      if (!newPass || !confPass) {
        showToast('Please fill out both password fields.', 'error');
        return;
      }
      if (newPass !== confPass) {
        showToast('Passwords do not match. Please re-enter.', 'error');
        return;
      }

      showToast('Password updated successfully! Logging you in...', 'success');
      setTimeout(() => {
        const email = resetEmailInput?.value.trim() || 'adeyemi.parent@example.com';
        handleSuccessfulLogin(email, 'Mrs. O. Adeyemi', 'Password changed successfully!');
      }, 600);
    });
  }

  // Logout button
  const logoutBtn = document.getElementById('portalLogoutBtn');
  if (logoutBtn && authContainer && dashboardView) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('codecampus_parent_logged');
      dashboardView.classList.remove('active');
      authContainer.style.display = 'grid';
      showLoginTab();
      showToast('You have logged out safely.', 'info');
    });
  }

  // Child Profile Switcher Pills
  const childPills = document.querySelectorAll('.child-pill-btn');
  childPills.forEach(pill => {
    pill.addEventListener('click', () => {
      childPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const childKey = pill.getAttribute('data-child') || 'liam';
      renderChildProfile(childKey);
    });
  });
}

function renderChildProfile(childKey) {
  const data = mockChildData[childKey] || mockChildData.liam;

  const nameEl = document.getElementById('dashChildName');
  const trackEl = document.getElementById('dashChildTrack');
  const attEl = document.getElementById('dashAttendanceVal');
  const attSubEl = document.getElementById('dashAttendanceSub');
  const mentorEl = document.getElementById('dashMentorVal');
  const nextSessionEl = document.getElementById('dashNextSessionVal');
  const feedbackEl = document.getElementById('dashMentorFeedback');
  const skillsContainer = document.getElementById('dashSkillsContainer');
  const projectsContainer = document.getElementById('dashProjectsContainer');
  const noticesContainer = document.getElementById('dashNoticesContainer');

  if (nameEl) nameEl.innerText = data.name + ' (' + data.age + ')';
  if (trackEl) trackEl.innerText = data.track;
  if (attEl) attEl.innerText = data.attendancePercent;
  if (attSubEl) attSubEl.innerText = data.attendedSessions;
  if (mentorEl) mentorEl.innerText = data.mentor;
  if (nextSessionEl) nextSessionEl.innerText = data.nextSession;
  if (feedbackEl) feedbackEl.innerText = data.feedback;

  if (skillsContainer) {
    skillsContainer.innerHTML = data.skills.map(skill => `
      <div class="progress-skill-item">
        <div class="progress-skill-label">
          <span>${skill.name}</span>
          <span style="color: var(--color-green-primary); font-weight: 800;">${skill.score}%</span>
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${skill.score}%"></div>
        </div>
      </div>
    `).join('');
  }

  if (projectsContainer) {
    projectsContainer.innerHTML = data.projects.map(p => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid var(--color-gray-200);">
        <div>
          <div style="font-weight: 800; font-size: 0.95rem; color: var(--color-green-darkest);">${p.title}</div>
          <div style="font-size: 0.78rem; color: var(--color-gray-600);">${p.status}</div>
        </div>
        <span style="background: var(--color-green-subtle); color: var(--color-green-primary); font-weight: 800; padding: 0.25rem 0.6rem; border-radius: 999px; font-size: 0.8rem;">${p.grade}</span>
      </div>
    `).join('');
  }

  if (noticesContainer) {
    noticesContainer.innerHTML = data.announcements.map(note => `
      <div class="notice-item">
        <span style="color: var(--color-orange-golden); font-size: 1.1rem; line-height: 1;">📢</span>
        <span>${note}</span>
      </div>
    `).join('');
  }
}

/* ==========================================================================
   5. TESTIMONIAL CAROUSEL
   ========================================================================== */
function initTestimonialSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayInterval;

  // Render dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    const dots = document.querySelectorAll('.carousel-dot');
    if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    if (dots[currentIndex]) dots[currentIndex].classList.add('active');
  }

  if (prevBtn) prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoplay();
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoplay();
  });

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();
}

/* ==========================================================================
   6. FAQ ACCORDIONS
   ========================================================================== */
function initFaqAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items in same list
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      if (isOpen) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. PROJECT CATEGORY FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter') || 'all';

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 10);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. BLOG SEARCH, FILTERS & ARTICLE READER MODAL
   ========================================================================== */
const blogArticleContent = {
  'article-1': {
    title: 'Why Coding & Robotics is the #1 Essential Superpower for Kids in 2026',
    author: 'Dr. Chinedu Eze • Camp Director',
    date: 'July 15, 2026',
    category: 'STEM Insights',
    readTime: '6 min read',
    content: `
      <p>In an increasingly algorithmic world, children are no longer just passive consumers of screens, video games, and apps—they can be the architects of tomorrow. At CodeCampus International, our core mission is moving children from digital consumption to active digital creation.</p>
      <h3 style="font-size:1.3rem; margin:1.5rem 0 0.75rem; color:var(--color-green-darkest);">Computational Thinking Beyond Just Syntax</h3>
      <p>When an 8-year-old child writes a program in Scratch or configures an ultrasonic sensor on an Arduino buggy, they aren't merely memorizing command lines. They are developing core cognitive frameworks: decomposition, pattern recognition, algorithmic abstraction, and iterative debugging.</p>
      <p>Research published by the International STEM Education Journal indicates that students exposed to hands-on robotics between ages 6 and 12 display up to 43% higher spatial reasoning abilities and significantly higher resilience when tackling complex mathematical challenges.</p>
      <h3 style="font-size:1.3rem; margin:1.5rem 0 0.75rem; color:var(--color-green-darkest);">Why Robotics Accelerates Understanding</h3>
      <p>Pure screen-based coding can sometimes feel abstract. Robotics provides immediate, tangible physical feedback: if the servo motor turns too fast, the rover veers off course. If the sensor reading is noisy, the student learns to write a software threshold filter. This tactile feedback loop instills deep scientific curiosity.</p>
      <blockquote style="background:var(--color-green-subtle); border-left:4px solid var(--color-green-primary); padding:1rem; margin:1.5rem 0; font-style:italic;">
        "Robotics makes the invisible visible. Children see their mathematical equations physically drive across the floor."
      </blockquote>
      <p>This summer, empower your child with the creative confidence to invent, design, and lead.</p>
    `
  },
  'article-2': {
    title: 'From Scratch to Python: Guiding Your Child’s Programming Pathway',
    author: 'Sarah O. • Lead Scratch & Python Coach',
    date: 'July 10, 2026',
    category: 'Coding Tips',
    readTime: '5 min read',
    content: `
      <p>One of the most frequent questions parents ask during admissions is: "My child loves block coding in Scratch, but when should they transition to typed languages like Python?"</p>
      <h3 style="font-size:1.3rem; margin:1.5rem 0 0.75rem; color:var(--color-green-darkest);">The Power of Block-Based Foundations</h3>
      <p>Visual block languages like Scratch eliminate syntax errors like missing semicolons or mismatched parentheses. This allows young learners (ages 5–9) to focus 100% on logical architecture—how loops work, how conditional branches trigger events, and how variables store dynamic scores.</p>
      <h3 style="font-size:1.3rem; margin:1.5rem 0 0.75rem; color:var(--color-green-darkest);">Signs Your Child Is Ready for Python</h3>
      <ul style="list-style:disc; padding-left:1.5rem; margin-bottom:1.5rem; line-height:1.7;">
        <li>They can fluidly explain conditionals (IF/THEN/ELSE) without hesitation.</li>
        <li>They are comfortable typing at least 15–20 words per minute on a physical keyboard.</li>
        <li>They express interest in creating text-based simulations, web apps, or AI bots.</li>
      </ul>
      <p>At CodeCampus, we bridge this transition gently through hybrid visual-to-Python micro:bit programming, ensuring students never feel overwhelmed by syntax while celebrating rapid milestones.</p>
    `
  },
  'article-3': {
    title: 'How Summer STEM Camps Foster Resilience, Teamwork, and Lifelong Friendship',
    author: 'Amina Bello • Student Well-being Coordinator',
    date: 'June 28, 2026',
    category: 'Camp Life',
    readTime: '4 min read',
    content: `
      <p>While coding and robotics are technical disciplines, our summer camp environment is profoundly social. Campers don't sit in isolated cubicles with headphones on; they pair program, brainstorm in teams, assemble hardware in maker circles, and cheer each other on during friendly arena races.</p>
      <h3 style="font-size:1.3rem; margin:1.5rem 0 0.75rem; color:var(--color-green-darkest);">Normalizing Failure as Iteration</h3>
      <p>In traditional academic schooling, errors are often penalized with red marks. In programming and robotics, errors are simply bugs to be solved! Campers quickly learn to celebrate discovering a bug because it means they are one step closer to making their invention work.</p>
      <p>By the time Friday Demo Day arrives, every child has experienced the thrill of seeing a difficult problem solved through teamwork and persistence.</p>
    `
  },
  'article-4': {
    title: 'Top 5 At-Home Robotics & Electronics Experiments for Curious Kids',
    author: 'David K. • Hardware & Electronics Mentor',
    date: 'June 20, 2026',
    category: 'Home STEM',
    readTime: '7 min read',
    content: `
      <p>Curiosity shouldn't stop when camp concludes for the day! Here are five exciting, safe, and inexpensive science and electronics experiments you can do with your child right in the living room:</p>
      <ol style="list-style:decimal; padding-left:1.5rem; margin-bottom:1.5rem; line-height:1.7;">
        <li><strong>Paper Circuit Greeting Cards:</strong> Use copper conductive tape, a 3V coin battery, and a colored LED to build an illuminated birthday card.</li>
        <li><strong>Squishy Dough Circuits:</strong> Use homemade salt dough as a conductive path and sugar dough as an insulator to build glowing creatures.</li>
        <li><strong>Scribble Bot:</strong> Mount a small vibration DC motor and felt-tip marker legs on a paper cup to create an autonomous spinning art machine.</li>
        <li><strong>Lemon Battery Clock:</strong> Pierce lemons with zinc nails and copper pennies to illuminate a small LCD display using electrochemistry.</li>
        <li><strong>Scratch Sound Machine:</strong> Connect household fruits to a Makey Makey board to turn bananas into a playable piano keyboard!</li>
      </ol>
    `
  },
  'article-5': {
    title: 'Screen Time vs. Creative Time: A Modern Parent’s Guide to Digital Balance',
    author: 'Dr. Chinedu Eze • Camp Director',
    date: 'June 12, 2026',
    category: 'Parenting Tech',
    readTime: '5 min read',
    content: `
      <p>Not all screen time is created equal. Mindlessly scrolling algorithmic video feeds drains attention and dampens creative agency. In stark contrast, building a 2D game, composing digital music, or writing logic for a robotic rover engages executive cognitive function and active problem-solving.</p>
      <h3 style="font-size:1.3rem; margin:1.5rem 0 0.75rem; color:var(--color-green-darkest);">The 80/20 Creative Consumption Rule</h3>
      <p>We advise parents to adopt an '80/20 creation rule': for every hour of passive media consumption, encourage at least 30 to 45 minutes of active creation—be it drawing, coding, LEGO engineering, or recording a science diary.</p>
    `
  },
  'article-6': {
    title: 'What Happens at Demo Day? Inside the Culmination of Our Summer Camp',
    author: 'Sarah O. • STEM Coach',
    date: 'June 05, 2026',
    category: 'Camp Life',
    readTime: '4 min read',
    content: `
      <p>The final Friday of our summer camp is an unforgettable celebration called <strong>Grand Demo Day</strong>. Campers transform the campus into a bustling innovation exhibition hall.</p>
      <p>Parents, family members, and industry guest judges walk from booth to booth testing interactive video games, watching rovers conquer obstacle mazes, and listening to 8-year-olds explain their code flow with poise and confidence.</p>
      <p>Every camper leaves with their hardware kit, a personalized portfolio book, and an accredited certificate of completion.</p>
    `
  }
};

function initBlogFilterAndReader() {
  const searchInput = document.getElementById('blogSearchInput');
  const blogCards = document.querySelectorAll('.blog-card');
  const categoryPills = document.querySelectorAll('.blog-category-pill');
  const readerModal = document.getElementById('blogReaderModal');
  const readerClose = document.getElementById('blogReaderClose');

  // Search input filtering
  if (searchInput && blogCards.length) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      blogCards.forEach(card => {
        const title = (card.querySelector('.blog-title')?.innerText || '').toLowerCase();
        const excerpt = (card.querySelector('.blog-excerpt')?.innerText || '').toLowerCase();
        const category = (card.querySelector('.blog-card-badge')?.innerText || '').toLowerCase();

        if (title.includes(query) || excerpt.includes(query) || category.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Category pill filtering
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const selectedCat = pill.getAttribute('data-cat') || 'all';

      blogCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (selectedCat === 'all' || cat === selectedCat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Read full story button -> Modal reader
  const readBtns = document.querySelectorAll('.blog-read-btn');
  readBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const articleId = btn.getAttribute('data-article-id');
      const data = blogArticleContent[articleId] || blogArticleContent['article-1'];

      if (!readerModal) return;

      const titleEl = document.getElementById('readerTitle');
      const metaEl = document.getElementById('readerMeta');
      const bodyEl = document.getElementById('readerBody');

      if (titleEl) titleEl.innerText = data.title;
      if (metaEl) metaEl.innerText = `${data.category} • ${data.date} • ${data.author} • ${data.readTime}`;
      if (bodyEl) bodyEl.innerHTML = data.content;

      readerModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (readerClose && readerModal) {
    readerClose.addEventListener('click', () => {
      readerModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    readerModal.addEventListener('click', (e) => {
      if (e.target === readerModal) {
        readerModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
}

/* ==========================================================================
   9. INTERACTIVE PROGRAM RECOMMENDER / QUIZ
   ========================================================================== */
function initProgramQuiz() {
  const quizForm = document.getElementById('programQuizForm');
  const quizResultBox = document.getElementById('quizResultBox');

  if (!quizForm || !quizResultBox) return;

  quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const age = parseInt(document.getElementById('quizAge').value, 10);
    const interest = document.getElementById('quizInterest').value;

    let recTitle = '';
    let recDesc = '';
    let recAgeGroup = '';
    let recTools = '';

    if (age <= 6) {
      recAgeGroup = 'Ages 4–6 Years';
      recTitle = 'Tiny Tech Explorers & Early Robotics';
      recDesc = 'Perfect for curious young minds! Combines physical coding blocks, Bee-Bot floor robots, and delightful tablet adventures in ScratchJr to build early logic and spatial skills.';
      recTools = 'Bee-Bots, ScratchJr, Tactile Logic Blocks, LEGO DUPLO STEAM';
    } else if (age <= 9) {
      recAgeGroup = 'Ages 7–9 Years';
      recTitle = 'Creative Game Makers & Smart Robotics Cadets';
      recDesc = 'Your child will design animated arcade games in Scratch 3.0, learn conditionals and loops, and build autonomous buggies using LEGO Spike and BBC micro:bit!';
      recTools = 'Scratch 3.0, BBC micro:bit, LEGO Spike Prime, Ultrasonic Sensors';
    } else {
      recAgeGroup = 'Ages 10–13 Years';
      recTitle = 'Junior Software Engineer & Autonomous Robotics Rover';
      recDesc = 'Our flagship track! Campers learn real typed Python code, web engineering fundamentals (HTML/CSS/JS), and wire custom Arduino rovers with obstacle sensors and servo motors.';
      recTools = 'Python 3, Arduino C++, Breadboarding & Electronics, HTML5/CSS3';
    }

    quizResultBox.innerHTML = `
      <div style="background: var(--color-white); border: 2px solid var(--color-green-primary); border-radius: var(--radius-xl); padding: 2rem; box-shadow: var(--shadow-lg); animation: fadeIn 0.4s ease;">
        <span class="section-tag" style="margin-bottom:0.75rem;">Recommended Track For Your Child</span>
        <h3 style="font-size: 1.6rem; color: var(--color-green-darkest); margin-bottom: 0.5rem;">${recTitle}</h3>
        <p style="font-weight: 800; color: var(--color-orange-golden); font-size: 0.95rem; margin-bottom: 0.85rem;">Target: ${recAgeGroup}</p>
        <p style="color: var(--color-gray-600); line-height: 1.6; margin-bottom: 1.25rem;">${recDesc}</p>
        <div style="background: var(--color-gray-50); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.88rem; color: var(--color-gray-700);">
          <strong>Tools & Kits Included:</strong> ${recTools}
        </div>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="contact.html?track=${encodeURIComponent(recTitle)}" class="btn btn-primary">Enroll in this Track Today</a>
          <button type="button" onclick="document.getElementById('quizResultBox').innerHTML=''" class="btn btn-outline-green btn-sm">Take Quiz Again</button>
        </div>
      </div>
    `;
    quizResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ==========================================================================
   10. FORM VALIDATION & CONFIRMATION
   ========================================================================== */
function initFormsValidation() {
  const forms = document.querySelectorAll('.validate-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate required inputs
      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        const val = input.value.trim();
        const isEmail = input.type === 'email';
        const isPhone = input.type === 'tel';

        let fieldValid = true;

        if (!val) {
          fieldValid = false;
        } else if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          fieldValid = false;
        } else if (isPhone && val.length < 8) {
          fieldValid = false;
        }

        if (!fieldValid) {
          input.classList.add('is-invalid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
        }

        input.addEventListener('input', () => {
          input.classList.remove('is-invalid');
        });
      });

      if (!isValid) {
        showToast('Please correct the highlighted fields before submitting.', 'error');
        return;
      }

      // Successful simulated submission
      showToast('Thank you! Your camp enquiry/registration has been received. Our team will contact you within 24 hours.', 'success');
      form.reset();

      // Show confirmation modal if present
      const successModal = document.getElementById('formSuccessModal');
      if (successModal) {
        successModal.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION COMPONENT
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'ℹ️';
  let borderColor = 'var(--color-yellow-bright)';

  if (type === 'success') {
    icon = '✅';
    borderColor = 'var(--color-success)';
  } else if (type === 'error') {
    icon = '⚠️';
    borderColor = 'var(--color-danger)';
  }

  toast.style.borderLeftColor = borderColor;
  toast.innerHTML = `
    <span style="font-size: 1.25rem;">${icon}</span>
    <div style="font-size: 0.9rem; font-weight: 600; line-height: 1.4;">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

/* ==========================================================================
   11. CYBER-TRACK STUDIO (INTERACTIVE LAB SIMULATOR)
   ========================================================================== */
function initCyberTrackStudio() {
  const stationTabs = document.querySelectorAll('.cyber-station-tab');
  const titleText = document.getElementById('terminalTitleText');
  const btnSimMode = document.getElementById('btnSimMode');
  const btnKitMode = document.getElementById('btnKitMode');
  const paneScratch = document.getElementById('paneScratch');
  const paneRobotics = document.getElementById('paneRobotics');
  const panePython = document.getElementById('panePython');
  const paneKitView = document.getElementById('paneKitView');

  if (!stationTabs.length) return;

  const simPanes = {
    scratch: paneScratch,
    robotics: paneRobotics,
    python: panePython
  };

  const titles = {
    scratch: '● SIMULATOR :: Scratch 2D Arcade Engine [v3.0]',
    robotics: '● TELEMETRY :: BBC micro:bit & Ultrasonic Radar Scan',
    python: '● IDE TERMINAL :: Python 3.12 Rover Automation Script'
  };

  let activeTrack = 'scratch';

  stationTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stationTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const simKey = tab.getAttribute('data-sim');
      activeTrack = simKey;

      if (titleText && titles[simKey]) {
        titleText.innerHTML = `<span>●</span> ${titles[simKey]}`;
      }

      // Hide all panes
      [paneScratch, paneRobotics, panePython, paneKitView].forEach(p => {
        if (p) p.classList.remove('active');
      });

      // Show selected pane
      if (simPanes[simKey]) {
        simPanes[simKey].classList.add('active');
      }

      if (btnSimMode) btnSimMode.classList.add('active');
      if (btnKitMode) btnKitMode.classList.remove('active');
    });
  });

  // Mode toggles
  if (btnKitMode && btnSimMode) {
    btnKitMode.addEventListener('click', () => {
      btnKitMode.classList.add('active');
      btnSimMode.classList.remove('active');
      [paneScratch, paneRobotics, panePython].forEach(p => p && p.classList.remove('active'));
      if (paneKitView) paneKitView.classList.add('active');
      if (titleText) titleText.textContent = '● HARDWARE MANIFEST :: Camp Kit Components';
    });

    btnSimMode.addEventListener('click', () => {
      btnSimMode.classList.add('active');
      btnKitMode.classList.remove('active');
      if (paneKitView) paneKitView.classList.remove('active');
      if (simPanes[activeTrack]) simPanes[activeTrack].classList.add('active');
      if (titleText && titles[activeTrack]) titleText.textContent = titles[activeTrack];
    });
  }

  // Scratch Action: Test Jump
  const btnJump = document.getElementById('btnScratchJump');
  const robotSprite = document.getElementById('simRobotSprite');
  if (btnJump && robotSprite) {
    btnJump.addEventListener('click', () => {
      robotSprite.style.transition = 'transform 0.25s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
      robotSprite.style.transform = 'translateY(-60px) scale(1.2)';
      setTimeout(() => {
        robotSprite.style.transform = 'translateY(0) scale(1)';
      }, 280);
    });
  }

  // Scratch Action: Collect Gem
  const btnGem = document.getElementById('btnScratchGem');
  const scoreDisplay = document.getElementById('simScratchScore');
  let gems = 12;
  let xp = 480;
  if (btnGem && scoreDisplay) {
    btnGem.addEventListener('click', () => {
      gems += 1;
      xp += 50;
      scoreDisplay.textContent = `GEMS: ${gems} • XP: ${xp}`;
      scoreDisplay.style.color = '#10b981';
      setTimeout(() => {
        scoreDisplay.style.color = 'var(--color-yellow-bright)';
      }, 400);
    });
  }

  // Robotics Action: Simulate Obstacle
  const btnObstacle = document.getElementById('btnTriggerObstacle');
  const telemetryDist = document.getElementById('telemetryDist');
  if (btnObstacle && telemetryDist) {
    btnObstacle.addEventListener('click', () => {
      telemetryDist.textContent = '⚠️ 7.8 cm [OBSTACLE DETECTED!]';
      telemetryDist.style.color = '#ef4444';
      btnObstacle.textContent = '🔄 Rover Auto-Steering (90° R)...';

      setTimeout(() => {
        telemetryDist.textContent = '✅ ESCAPE COMPLETE: 24.5 cm [CLEAR]';
        telemetryDist.style.color = '#34d399';
        btnObstacle.textContent = '⚠️ Simulate Obstacle (10cm)';
      }, 1600);
    });
  }

  // Python Action: Execute Code
  const btnRunPy = document.getElementById('btnRunPython');
  const pyOutput = document.getElementById('pyTerminalOutput');
  if (btnRunPy && pyOutput) {
    btnRunPy.addEventListener('click', () => {
      pyOutput.innerHTML = `&gt; Running test_rover.py...<br>&gt; Distance reading: 12cm &lt; 15cm threshold.<br>&gt; <span style="color:#fde047;">[EMERGENCY TURN TRIGGERED]</span>: Rover servo turned 90° Right!<br>&gt; <span style="color:#34d399;">✓ Algorithm test PASSED with 0 errors!</span>`;
    });
  }
}

/* ==========================================================================
   12. BENTO SUPERPOWERS INTERACTIVE DEBUGGER
   ========================================================================== */
function initBentoSuperpowers() {
  const btnFixDebug = document.getElementById('btnFixDebug');
  const debugSnippet = document.getElementById('debugSnippet');
  const debugStatusLabel = document.getElementById('debugStatusLabel');
  const debugScoreBadge = document.getElementById('debugScoreBadge');

  if (!btnFixDebug || !debugSnippet) return;

  btnFixDebug.addEventListener('click', () => {
    debugSnippet.classList.add('fixed');
    debugSnippet.innerHTML = `<code>✓ RESOLVED: if sensor_range &lt; 15: rover.turn_escape(angle=90)</code>`;
    if (debugStatusLabel) {
      debugStatusLabel.innerHTML = `<span style="color: #34d399;">● BREAKTHROUGH: 100% Logic Calibrated</span>`;
    }
    if (debugScoreBadge) {
      debugScoreBadge.textContent = '🏆 +150 XP Growth Mindset Unlocked!';
      debugScoreBadge.style.color = 'var(--color-yellow-bright)';
      debugScoreBadge.style.fontWeight = '900';
    }
    btnFixDebug.innerHTML = `<span>✓ Bug Solved! Great Job!</span>`;
    btnFixDebug.style.background = '#10b981';
    btnFixDebug.style.color = '#ffffff';
  });
}

/* ==========================================================================
   13. LAB EXPLORER SHOWCASE (HOME-2.HTML)
   ========================================================================== */
function initLabExplorer() {
  const zoneBtns = document.querySelectorAll('.lab-zone-btn');
  const stageImg = document.getElementById('labStageImg');
  const stageTitle = document.getElementById('labStageTitle');
  const stageDesc = document.getElementById('labStageDesc');
  const stageSpecs = document.getElementById('labStageSpecs');

  if (!zoneBtns.length || !stageImg) return;

  const zoneData = {
    bench: {
      img: 'assets/images/robotics-lab-maker.jpg',
      title: 'Hardware Tinkering Bench',
      desc: 'Equipped with breadboards, tactile buttons, ultrasonic transceivers, infrared sensors, and safety tools for real circuit prototyping.',
      specs: [
        '🛡️ Child Safety: 5V Low-Voltage Prototyping',
        '👥 Mentorship: 1 Certified Coach per 6 Campers',
        '🛠️ Equipment: BBC micro:bit V2 + Arduino Uno'
      ]
    },
    arena: {
      img: 'assets/images/kid-robotics-builder.jpg',
      title: 'The Rover Obstacle Arena',
      desc: 'A colorful testing arena with maze walls, bridges, and ramps where campers calibrate autonomous vehicle sensors in real time.',
      specs: [
        '🏎️ Track: Multi-Surface Arena with Optical Line Maze',
        '⏱️ Challenges: Precision Autonomous Speed Runs',
        '🏆 Demo: Friday Grand Obstacle Derby Competition'
      ]
    },
    kits: {
      img: 'assets/images/curriculum-kits.jpg',
      title: 'Personalized Hardware Organizer Kit',
      desc: 'Every camper receives their own compartmentalized robotics organizer box containing an Arduino, micro:bit, sensors, and motors to keep!',
      specs: [
        '📦 Yours to Keep: 100% Physical Components Included',
        '🔌 Components: 40+ Sensors, Wires, Motors & Battery Packs',
        '📖 Manual: Full Summer Project Guidebook & Diagram Manual'
      ]
    }
  };

  zoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      zoneBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const zone = btn.getAttribute('data-zone');
      const data = zoneData[zone];
      if (!data) return;

      stageImg.style.opacity = '0';
      setTimeout(() => {
        stageImg.src = data.img;
        if (stageTitle) stageTitle.textContent = data.title;
        if (stageDesc) stageDesc.textContent = data.desc;
        if (stageSpecs) {
          stageSpecs.innerHTML = data.specs.map(s => {
            const parts = s.split(':');
            return `
              <div class="lab-spec-row">
                <span>${parts[0]}:</span>
                <span><strong>${parts[1] || ''}</strong></span>
              </div>
            `;
          }).join('');
        }
        stageImg.style.opacity = '1';
      }, 200);
    });
  });
}

/* ==========================================================================
   14. ABUJA STORY SCRUBBER (ABOUT.HTML)
   ========================================================================== */
function initAbujaStoryScrubber() {
  const pills = document.querySelectorAll('#storyYearScrubber .story-year-pill');
  const descEl = document.getElementById('storyYearDesc');
  const imgEl = document.getElementById('storyStageImg');

  if (!pills.length || !descEl) return;

  const yearData = {
    '2021': {
      text: 'What began with six children and three Arduino boards in a small DBM Plaza studio has blossomed into Abuja’s premier youth robotics club.',
      img: 'assets/images/young-kids-tinkering.jpg'
    },
    '2023': {
      text: 'Expanded to 350+ campers across Wuse 2 and Garki, introducing robotics obstacle tracks, Scratch arcade tournaments, and micro:bit hardware kits.',
      img: 'assets/images/kid-robotics-builder.jpg'
    },
    '2026': {
      text: 'Celebrating our 5th Summer Edition with over 800+ proud young innovators, international STEM accreditations, and parent-celebrated Demo Days!',
      img: 'assets/images/hero-kids-coding.jpg'
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const year = pill.getAttribute('data-year');
      const data = yearData[year];
      if (!data) return;

      if (imgEl) {
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = data.img;
          imgEl.style.opacity = '1';
        }, 180);
      }
      descEl.textContent = data.text;
    });
  });
}

/* ==========================================================================
   15. 360° FACILITY TOUR CONTROLLER (ABOUT.HTML)
   ========================================================================== */
function initFacilityTour() {
  const pills = document.querySelectorAll('#facilityNavPills .facility-pill-btn');
  const stageImg = document.getElementById('facilityStageImg');
  const stageTitle = document.getElementById('facilityStageTitle');
  const stageDesc = document.getElementById('facilityStageDesc');
  const specsGrid = document.getElementById('facilitySpecsGrid');

  if (!pills.length || !stageImg) return;

  const facData = {
    arena: {
      img: 'assets/images/robotics-lab-maker.jpg',
      title: 'Robotics Arena & Testing Floor',
      desc: 'Equipped with padded anti-static floor mats, calibrated obstacle mazes, and high-visibility ramp tracks for real-time autonomous rover testing.',
      metrics: [
        { icon: '❄️', text: '100% Climate Controlled' },
        { icon: '🔋', text: 'Solar Backup Inverter' },
        { icon: '🛡️', text: '5V Safe Power Supply' },
        { icon: '📹', text: '24/7 Security CCTV' }
      ]
    },
    den: {
      img: 'assets/images/young-kids-tinkering.jpg',
      title: 'Tiny Tech Exploration Den (Ages 4–6)',
      desc: 'A cozy, child-safe haven with rounded foam furniture, tactile unplugged coding tiles, floor-moving Bee-Bots, and child-safe educational tablets.',
      metrics: [
        { icon: '🧸', text: 'Soft Ergonomic Seating' },
        { icon: '🧩', text: 'Unplugged STEM Blocks' },
        { icon: '👀', text: '1:4 Extra-Care Ratio' },
        { icon: '🧽', text: 'Anti-Bacterial Sanitize' }
      ]
    },
    lab: {
      img: 'assets/images/instructor-mentoring.jpg',
      title: 'High-Speed Coding Laboratory (Ages 7–13)',
      desc: 'High-resolution monitors with blue-light reduction filters, dedicated gigabit fiber-optic internet, and isolated child-safe offline sandboxes.',
      metrics: [
        { icon: '💻', text: 'Dual-Core Workstations' },
        { icon: '⚡', text: 'Fiber-Optic 100Mbps' },
        { icon: '👓', text: 'Blue-Light Eye Shields' },
        { icon: '🔒', text: 'Isolated Safe Sandbox' }
      ]
    }
  };

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const fac = pill.getAttribute('data-fac');
      const data = facData[fac];
      if (!data) return;

      stageImg.style.opacity = '0';
      setTimeout(() => {
        stageImg.src = data.img;
        if (stageTitle) stageTitle.textContent = data.title;
        if (stageDesc) stageDesc.textContent = data.desc;
        if (specsGrid) {
          specsGrid.innerHTML = data.metrics.map(m => `
            <div class="facility-metric-card">
              <span>${m.icon}</span>
              <span>${m.text}</span>
            </div>
          `).join('');
        }
        stageImg.style.opacity = '1';
      }, 180);
    });
  });
}

/* ==========================================================================
   16. DYNAMIC CAMP SCHEDULE RIBBON INTERACTION (HOME-2.HTML)
   ========================================================================== */
function initCampScheduleRibbon() {
  const stepCards = document.querySelectorAll('.schedule-step-card');
  if (!stepCards.length) return;

  stepCards.forEach(card => {
    card.addEventListener('click', () => {
      stepCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
}

/* ==========================================================================
   17. DEVELOPMENTAL FLIGHTPATH STAGE CONTROLLER (INDEX.HTML)
   ========================================================================== */
function initFlightpathStage() {
  const tabs = document.querySelectorAll('#flightpathNav .flightpath-tab-btn');
  const imgEl = document.getElementById('flightpathStageImg');
  const hudTag = document.getElementById('flightpathHudTag');
  const titleEl = document.getElementById('flightpathStageTitle');
  const descEl = document.getElementById('flightpathStageDesc');
  const modulesList = document.getElementById('flightpathModulesList');
  const pillsRow = document.getElementById('flightpathPillsRow');
  const ctaBtn = document.getElementById('flightpathCtaBtn');

  if (!tabs.length || !imgEl) return;

  const tierData = {
    tiny: {
      img: 'assets/images/young-kids-tinkering.jpg',
      hud: '🧸 SENSORY TECH DEN • Unplugged Logic &amp; Bee-Bot',
      title: 'Tiny Tech Explorers & Early Computational Logic',
      desc: 'Playful early-childhood introduction without screen fatigue. Children command tactile floor rovers, assemble colorful maze sequences, and create expressive character stories in ScratchJr.',
      modules: [
        '✓ Bee-Bot Directional Floor Navigation',
        '✓ ScratchJr Animated Picture Coding',
        '✓ Tactile Wooden Logic Tiles & Mazes',
        '✓ LEGO STEAM Duplo Simple Machines'
      ],
      pills: [
        '📦 Take-Home: Mini Logic Badges',
        '👥 Ratio: 1:4 Extra-Care',
        '⏱️ Mon–Fri: 9 AM–12 PM'
      ],
      ctaText: 'Enroll in Tiny Tech (₦120,000)',
      ctaHref: 'contact.html?track=tiny'
    },
    makers: {
      img: 'assets/images/kid-robotics-builder.jpg',
      hud: '⭐ MOST POPULAR • BBC micro:bit &amp; Scratch 3.0',
      title: 'Creative Game Makers & Robotics Cadets',
      desc: 'Our most celebrated track! Campers transition into building playable 2D arcade video games in Scratch 3.0, learn algorithmic logic loops, and construct real programmable smart hardware using the BBC micro:bit board and motor expansions.',
      modules: [
        '✓ Scratch 3.0 Game Mechanics & Physics',
        '✓ micro:bit Compass & Radio Mesh Chat',
        '✓ Collision Physics & Gravity Multipliers',
        '✓ Motorized Vehicles & LED Matrix Signals'
      ],
      pills: [
        '📦 Take-Home: BBC micro:bit V2 Kit',
        '👥 Ratio: 1:6 Dedicated',
        '⏱️ Mon–Fri: 9 AM–12 PM'
      ],
      ctaText: 'Enroll in Creative Coders (₦120,000)',
      ctaHref: 'contact.html?track=makers'
    },
    engineers: {
      img: 'assets/images/project-obstacle-robot.jpg',
      hud: '🚀 FLAGSHIP TRACK • Python 3 &amp; 4WD Arduino Rover',
      title: 'Junior Software & Autonomous Hardware Engineers',
      desc: 'Our intensive mastery program. Older campers write authentic typed Python syntax, wire custom 4-wheel-drive Arduino rovers with ultrasonic sensors and motor drivers, and publish personal web project portfolios.',
      modules: [
        '✓ Python 3 Syntax, Lists & Text Adventures',
        '✓ Breadboard Circuitry, Resistors & Relays',
        '✓ Arduino C++ Rover & Ultrasonic Sonar',
        '✓ Personal HTML5 Web Project Portfolio'
      ],
      pills: [
        '📦 Take-Home: 4WD Arduino Rover Kit',
        '👥 Ratio: 1:6 Dedicated',
        '⏱️ Mon–Fri: 9 AM–12 PM'
      ],
      ctaText: 'Enroll in Junior Engineers (₦120,000)',
      ctaHref: 'contact.html?track=engineers'
    }
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const tier = tab.getAttribute('data-tier');
      const data = tierData[tier];
      if (!data) return;

      imgEl.style.opacity = '0';
      setTimeout(() => {
        imgEl.src = data.img;
        if (hudTag) hudTag.innerHTML = data.hud;
        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (modulesList) {
          modulesList.innerHTML = data.modules.map(m => `<div>${m}</div>`).join('');
        }
        if (pillsRow) {
          pillsRow.innerHTML = data.pills.map(p => `<span class="flightpath-pill-item">${p}</span>`).join('');
        }
        if (ctaBtn) {
          ctaBtn.setAttribute('href', data.ctaHref);
          const span = ctaBtn.querySelector('span');
          if (span) span.textContent = data.ctaText;
        }
        imgEl.style.opacity = '1';
      }, 180);
    });
  });
}

/* ==========================================================================
   18. BADGE TROPHY SHOWCASE CONTROLLER (PROJECTS.HTML)
   ========================================================================== */
function initBadgeTrophyShowcase() {
  const tokenCards = document.querySelectorAll('#badgeTokensList .badge-token-card');
  const hudIcon = document.getElementById('badgeHudIcon');
  const hudTitle = document.getElementById('badgeHudTitle');
  const hudCriteria = document.getElementById('badgeHudCriteria');
  const hudXp = document.getElementById('badgeHudXp');
  const hudMetrics = document.getElementById('badgeHudMetrics');

  if (!tokenCards.length || !hudIcon) return;

  const badgeData = {
    debugger: {
      icon: '🐛',
      title: 'Master Debugger',
      xp: '+250 XP',
      criteria: 'Awarded for independently diagnosing, isolating, and resolving at least 5 complex code bugs across loops, sensor thresholds, or conditional logic.',
      metrics: [
        { label: 'Skill Area', value: 'Algorithmic Logic' },
        { label: 'Badge Type', value: 'Physical + Digital' },
        { label: 'Evaluation', value: 'Live Coach Review' },
        { label: 'Camp Edition', value: 'Abuja Summer 2026' }
      ]
    },
    hardware: {
      icon: '⚡',
      title: 'Hardware Architect',
      xp: '+300 XP',
      criteria: 'Mastery of breadboard circuits, dual motor driver shields, ultrasonic sensor ping calculations, and clean tactile wiring with 0 short circuits.',
      metrics: [
        { label: 'Skill Area', value: 'Electronics Prototyping' },
        { label: 'Badge Type', value: 'Enamel Medal + NFT' },
        { label: 'Evaluation', value: 'Arena Derby Test' },
        { label: 'Camp Edition', value: 'Abuja Summer 2026' }
      ]
    },
    game: {
      icon: '🎮',
      title: 'Game Mechanics Pro',
      xp: '+280 XP',
      criteria: 'Crafting balanced multi-level arcade games in Scratch 3.0 or Pygame featuring jumping gravity, sound synthesis, collision bounding boxes, and score multipliers.',
      metrics: [
        { label: 'Skill Area', value: 'Game Engine Physics' },
        { label: 'Badge Type', value: 'Physical + Digital' },
        { label: 'Evaluation', value: 'Peer Playtest Rating' },
        { label: 'Camp Edition', value: 'Abuja Summer 2026' }
      ]
    },
    eco: {
      icon: '🌍',
      title: 'Eco-Tech Innovator',
      xp: '+320 XP',
      criteria: 'Engineering smart IoT sensor devices aimed at climate resilience, automated soil hydration monitoring, and solar battery energy conservation.',
      metrics: [
        { label: 'Skill Area', value: 'IoT Smart Automation' },
        { label: 'Badge Type', value: 'Gold Ribbon Medal' },
        { label: 'Evaluation', value: 'Demo Day Showcase' },
        { label: 'Camp Edition', value: 'Abuja Summer 2026' }
      ]
    }
  };

  tokenCards.forEach(card => {
    card.addEventListener('click', () => {
      tokenCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const badgeKey = card.getAttribute('data-badge');
      const data = badgeData[badgeKey];
      if (!data) return;

      hudIcon.style.transform = 'scale(0.7)';
      hudIcon.style.opacity = '0';

      setTimeout(() => {
        hudIcon.textContent = data.icon;
        if (hudTitle) hudTitle.textContent = data.title;
        if (hudXp) hudXp.textContent = data.xp;
        if (hudCriteria) hudCriteria.textContent = data.criteria;
        if (hudMetrics) {
          hudMetrics.innerHTML = data.metrics.map(m => `
            <div><strong>${m.label}:</strong> ${m.value}</div>
          `).join('');
        }
        hudIcon.style.transform = 'scale(1)';
        hudIcon.style.opacity = '1';
      }, 150);
    });
  });
}

/* ==========================================================================
   19. CAMPUS ROUTE PLANNER CONTROLLER (CONTACT.HTML)
   ========================================================================== */
function initCampusRoutePlanner() {
  const originBtns = document.querySelectorAll('#routeOriginPills .route-origin-btn');
  const etaChip = document.getElementById('routeEtaChip');
  const stepList = document.getElementById('routeStepList');

  if (!originBtns.length || !etaChip || !stepList) return;

  const routeData = {
    maitama: {
      eta: '⏱️ Estimated Travel: ~6 Mins (3.2 km)',
      steps: [
        '1. Head southwest on Shehu Shagari Way toward Aminu Kano Crescent.',
        '2. Take the 2nd exit at the roundabout onto Aminu Kano Crescent.',
        '3. Proceed 800m past Banex junction; DBM Plaza is on your right (directly opposite AP Plaza).',
        '4. Drive through security gate for reserved basement parking; take elevator to 2nd Floor, Suite 207.'
      ]
    },
    central: {
      eta: '⏱️ Estimated Travel: ~8 Mins (4.5 km)',
      steps: [
        '1. Take Ahmadu Bello Way northward heading toward Wuse 2.',
        '2. Turn left onto Adetokunbo Ademola Crescent, then right onto Aminu Kano Crescent.',
        '3. Locate DBM Plaza next to Oceanic Bank building opposite AP Plaza.',
        '4. Ground and basement visitor bays available with security guidance.'
      ]
    },
    garki: {
      eta: '⏱️ Estimated Travel: ~12 Mins (7.8 km)',
      steps: [
        '1. Take Area 1 / Area 11 flyover onto Herbert Macaulay Way.',
        '2. Continue straight through Wuse Market intersection onto Aminu Kano Crescent.',
        '3. DBM Plaza is located on the left side before the Banex flyover.',
        '4. Enter visitor gate; proceed to Suite 207 on the 2nd Floor.'
      ]
    },
    airport: {
      eta: '⏱️ Estimated Travel: ~32 Mins (38.5 km)',
      steps: [
        '1. Follow Nnamdi Azikiwe Airport Expressway into the city.',
        '2. Take City Gate interchange onto Constitution Avenue toward Central Business District.',
        '3. Merge onto Shehu Shagari Way into Wuse 2, turning onto Aminu Kano Crescent.',
        '4. Drop-off bay in front of DBM Plaza with porter luggage &amp; kit assistance.'
      ]
    }
  };

  originBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      originBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const routeKey = btn.getAttribute('data-route');
      const data = routeData[routeKey];
      if (!data) return;

      etaChip.textContent = data.eta;
      stepList.innerHTML = data.steps.map(s => `<p>${s}</p>`).join('');
    });
  });
}

/* ==========================================================================
   THEME (DARK / LIGHT) & RTL (LTR / RTL) CONTROLLER
   Persisted across pages via localStorage
   ========================================================================== */
function initThemeAndRtl() {
  const savedTheme = localStorage.getItem('codecampus_theme') || 'light';
  const savedDir = localStorage.getItem('codecampus_dir') || 'ltr';

  applyTheme(savedTheme, false);
  applyDirection(savedDir, false);

  // Theme toggle buttons (desktop header & mobile drawer)
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const target = current === 'dark' ? 'light' : 'dark';
      applyTheme(target, false);
    });
  });

  // RTL toggle buttons (desktop header & mobile drawer)
  document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const current = document.documentElement.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
      const target = current === 'rtl' ? 'ltr' : 'rtl';
      applyDirection(target, false);
    });
  });
}

function applyTheme(theme, notify = false) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.classList.add('dark-theme');
    localStorage.setItem('codecampus_theme', 'dark');
    document.querySelectorAll('.theme-icon-moon').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.theme-icon-sun').forEach(el => el.style.display = 'inline-block');
    document.querySelectorAll('.theme-toggle-btn').forEach(el => el.classList.add('active'));
  } else {
    document.documentElement.removeAttribute('data-theme');
    document.body.classList.remove('dark-theme');
    localStorage.setItem('codecampus_theme', 'light');
    document.querySelectorAll('.theme-icon-moon').forEach(el => el.style.display = 'inline-block');
    document.querySelectorAll('.theme-icon-sun').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.theme-toggle-btn').forEach(el => el.classList.remove('active'));
  }
}

function applyDirection(dir, notify = false) {
  if (dir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.body.classList.add('rtl-mode');
    localStorage.setItem('codecampus_dir', 'rtl');
    document.querySelectorAll('.rtl-label').forEach(el => el.innerText = 'LTR');
    document.querySelectorAll('.rtl-toggle-btn').forEach(el => el.classList.add('active'));
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.body.classList.remove('rtl-mode');
    localStorage.setItem('codecampus_dir', 'ltr');
    document.querySelectorAll('.rtl-label').forEach(el => el.innerText = 'RTL');
    document.querySelectorAll('.rtl-toggle-btn').forEach(el => el.classList.remove('active'));
  }
}

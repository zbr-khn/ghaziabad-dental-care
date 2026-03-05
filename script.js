document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      // Update logo color for contrast if needed, handled in CSS
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
  });

  // Close mobile menu on link click
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    });
  });

  // Intersection Observer for Animations (Fade in on scroll)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply initially hidden state to sections for scroll animation
  const animatedElements = document.querySelectorAll('.opacity-0, .observe-fade');
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // FAQ Accordion Toggle
  const faqToggles = document.querySelectorAll('.faq-toggle');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const item = toggle.parentElement;
      const content = item.querySelector('.faq-content');
      const isActive = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-content').style.maxHeight = '0';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible-btn');
    } else {
      backToTopBtn.classList.remove('visible-btn');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Form Submission Enhancement
  const appointmentForm = document.getElementById('appointment-form');
  const formSuccess = document.getElementById('form-success');
  const resetFormBtn = document.getElementById('reset-form');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = appointmentForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
      btn.disabled = true;

      // Extract form values
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const age = document.getElementById('form-age').value;
      const treatmentSelect = document.getElementById('form-treatment');
      const treatment = treatmentSelect.options[treatmentSelect.selectedIndex].text;
      const branchSelect = document.getElementById('form-branch');
      const branch = branchSelect.options[branchSelect.selectedIndex].text;
      const timeSelect = document.getElementById('form-time');
      const time = timeSelect.options[timeSelect.selectedIndex].text;
      const date = document.getElementById('form-date').value;

      // Construct WhatsApp Message
      const message = `Hello, I would like to request an appointment.\n\n` +
        `*Name:* ${name}\n` +
        `*Age:* ${age}\n` +
        `*Phone:* ${phone}\n` +
        `*Clinic Branch:* ${branch}\n` +
        `*Treatment:* ${treatment}\n` +
        `*Date:* ${date}\n` +
        `*Time:* ${time}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/919716675343?text=${encodedMessage}`;

      // Simulate slight processing delay
      setTimeout(() => {
        // Show success message overlay
        formSuccess.classList.add('show-success');

        // Open WhatsApp in new tab
        window.open(whatsappUrl, '_blank');

        appointmentForm.reset();
        btn.innerHTML = originalText;
        btn.disabled = false;
      }, 800);
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        formSuccess.classList.remove('show-success');
      });
    }
  }
});

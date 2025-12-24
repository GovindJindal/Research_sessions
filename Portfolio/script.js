document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. OLD ANIMATION LOGIC
    // ==========================================
    const nameTag = document.querySelector('.tag');
    const aboutSection = document.querySelector('.about_me');
    
    const hrLine = document.querySelector('.hr');
    const profileImg = document.querySelector('.per_img');
    const typingText = document.querySelector('.typing-text');
    
    const meTitle = document.querySelector('.me');
    const meText = document.querySelector('.below_me');

    const certiSection = document.querySelector('.certi');
    const certiTitle = document.querySelector('.certi-title');
    
    const participationTitle = document.querySelector('.participation-title');

    const safariWindows = document.querySelectorAll('.safari-window, .safari-window1, .safari-window2, .safari-window3, .safari-window4');

    // --- HOME PAGE ANIMATION REPLAY (LINES ONLY) ---
    const homeAnimatedElements = document.querySelectorAll('.vr1, .vr2, .vr3');

    const homeReplayObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                homeAnimatedElements.forEach(el => {
                    el.style.animation = 'none';
                    void el.offsetWidth; // Trigger reflow
                    el.style.animation = ''; 
                });
            }
        });
    }, {
        threshold: 0.1
    });

    if (nameTag) {
        homeReplayObserver.observe(nameTag);
        
        nameTag.addEventListener('click', () => {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // --- ABOUT OBSERVER ---
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(hrLine) hrLine.classList.add('active');
                if(profileImg) profileImg.classList.add('active');
                if(typingText) typingText.classList.add('active');
                if(meTitle) meTitle.classList.add('active');
                if(meText) meText.classList.add('active');
            } else {
                if(hrLine) hrLine.classList.remove('active');
                if(profileImg) profileImg.classList.remove('active');
                if(typingText) typingText.classList.remove('active');
                if(meTitle) meTitle.classList.remove('active');
                if(meText) meText.classList.remove('active');
            }
        });
    }, {
        threshold: 0.2
    });

    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // --- CERTI OBSERVER ---
    const certiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(certiTitle) certiTitle.classList.add('active');
        
                if(participationTitle) {
                    setTimeout(() => {
                        participationTitle.classList.add('active');
                    }, 300);
                }
            } else {
                if(certiTitle) certiTitle.classList.remove('active');
                if(participationTitle) participationTitle.classList.remove('active');
            }
        });
    }, {
        threshold: 0.2
    });

    if (certiSection) {
        certiObserver.observe(certiSection);
    }

    // --- SAFARI WINDOW LOGIC ---
    safariWindows.forEach(windowEl => {
        const domainText = windowEl.querySelector('.domain-text');
        const projectName = windowEl.getAttribute('data-project') || 'Project Preview';

        windowEl.addEventListener('mouseenter', () => {
            if (domainText) {
                domainText.style.transition = 'opacity 0.2s';
                domainText.style.opacity = '0';
                setTimeout(() => {
                    domainText.textContent = projectName;
                    domainText.style.opacity = '1';
                }, 200);
            }
        });

        windowEl.addEventListener('mouseleave', () => {
            if (domainText) {
                domainText.style.opacity = '0';
                setTimeout(() => {
                    domainText.textContent = '';
                }, 200);
            }
        });
    });

    // --- LANG / TREE SECTION ---
    const langSection = document.querySelector('.lang');
    const langTitle = document.querySelector('.lang-title');
    const centralLine = document.querySelector('.central-line');
    const branches = document.querySelectorAll('.branch');
    const nodes = document.querySelectorAll('.node-content');

    const langObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(langTitle) langTitle.classList.add('active');
                if(centralLine) centralLine.classList.add('active');
                branches.forEach((branch, index) => {
                    setTimeout(() => {
                        branch.classList.add('active');
                    }, index * 300 + 500);
                });
            } else {
                if(langTitle) langTitle.classList.remove('active');
                if(centralLine) centralLine.classList.remove('active');
                branches.forEach(branch => branch.classList.remove('active'));
            }
        });
    }, {
        threshold: 0.3
    });

    if (langSection) {
        langObserver.observe(langSection);
    }

    nodes.forEach(node => {
        node.addEventListener('click', (e) => {
            const currentBranch = node.closest('.branch');
            nodes.forEach(otherNode => {
                if (otherNode !== node) {
                    otherNode.classList.remove('expanded');
                    otherNode.closest('.branch').classList.remove('expanded');
                }
            });
            node.classList.toggle('expanded');
            currentBranch.classList.toggle('expanded');
        });
    });

    // --- CONTACT SECTION ---
    const contactSection = document.querySelector('.contact');
    const contactTitle = document.querySelector('.contact-title');
    const socialCards = document.querySelectorAll('.social-card');

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(contactTitle) contactTitle.classList.add('active');
                socialCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('active');
                    }, index * 100);
                });
            } else {
                if(contactTitle) contactTitle.classList.remove('active');
                socialCards.forEach(card => card.classList.remove('active'));
            }
        });
    }, {
        threshold: 0.3
    });

    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    // ==========================================
    // 2. NEW CERTIFICATE MODAL LOGIC
    // ==========================================
    
    const modal = document.getElementById("cert-modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close-modal")[0];

    // Select all cards (both certifications and participation events)
    const cards = document.querySelectorAll(".certi-card");

    cards.forEach(card => {
        card.addEventListener("click", function() {
            // Get the image path from the data-cert attribute
            const imgPath = this.getAttribute("data-cert");
            
            // Only open if a path exists and is not empty
            if (imgPath && imgPath !== "") {
                modal.style.display = "flex";
                modalImg.src = imgPath;
                // Use the H3 text as the caption
                const title = this.querySelector("h3").innerText;
                captionText.innerHTML = title;
            } else {
                console.log("No certificate image linked for this card.");
            }
        });
    });

    // Close when clicking the 'x'
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    // Close when clicking outside the image
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
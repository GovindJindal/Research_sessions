document.addEventListener('DOMContentLoaded', () => {
    const nameTag = document.querySelector('.tag');
    const aboutSection = document.querySelector('.about_me');
    
    const hrLine = document.querySelector('.hr');
    const profileImg = document.querySelector('.per_img');
    const typingText = document.querySelector('.typing-text');
    
    const meTitle = document.querySelector('.me');
    const meText = document.querySelector('.below_me');

    const certiSection = document.querySelector('.certi');
    const certiTitle = document.querySelector('.certi-title');
    
    // NEW: Select participation title
    const participationTitle = document.querySelector('.participation-title');

    const safariWindows = document.querySelectorAll('.safari-window, .safari-window1, .safari-window2, .safari-window3, .safari-window4');

    if (nameTag && aboutSection) {
        nameTag.addEventListener('click', () => {
            aboutSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

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

    const certiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if(certiTitle) certiTitle.classList.add('active');
                // NEW: Animate participation title with delay
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
});
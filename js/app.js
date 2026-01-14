const app = {
    state: {
        score: 0,
        currentQuestionIndex: 0,
        ebookChapter: 0
    },

    init: () => {
        app.setupNavigation();
        app.renderSholatList();
        app.renderDoaList();
        app.setupMobileMenu();
    },

    //logic navigation
    setupNavigation: () => {
        const navLinks = document.querySelectorAll('.nav-links li');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                const target = link.dataset.target;
                app.navigateTo(target);

                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.menu-toggle');
                nav.classList.remove('active');
                burger.classList.remove('toggle');
            });
        });
    },

    navigateTo: (viewId) => {
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
            window.scrollTo(0, 0);
        }
    },

    setupMobileMenu: () => {
        const burger = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.nav-links');

        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('toggle');
        });

    },

    //logic sholat
    renderSholatList: () => {
        const container = document.getElementById('prayer-list-container');
        if (!container || !window.sholatData) return;

        container.innerHTML = window.sholatData.map(prayer => `
            <div class="prayer-card" onclick="app.openPrayerDetail('${prayer.id}')">
                <div class="prayer-info">
                    <h3>${prayer.name}</h3>
                    <span>${prayer.rokaat} Rakaat</span>
                </div>
                <div class="arrow">→</div>
            </div>
        `).join('');
    },

    openPrayerDetail: (id) => {
        const prayer = window.sholatData.find(p => p.id === id);
        if (!prayer) return;

        const detailContainer = document.getElementById('prayer-detail-content');
        const listContainer = document.getElementById('prayer-list-container');
        const header = document.querySelector('#sholat .section-header');

        listContainer.classList.add('hidden');
        header.classList.add('hidden');
        document.getElementById('prayer-detail').classList.remove('hidden');

        let stepsHtml = '';
        const stepsData = prayer.steps.length > 0 ? prayer.steps : app.getGenericSteps(prayer.rokaat);

        stepsHtml = stepsData.map((step, index) => `
            <div class="step-card">
                <div class="step-header">
                    <div class="step-number">${index + 1}</div>
                    <div class="step-title">${step.name}</div>
                    <button class="btn-outline" style="font-size:0.8rem; padding: 5px 10px;" onclick="app.playAudio('${step.name}')">🔊 Play</button>
                </div>
                ${step.image ? `<img src="${step.image}" alt="${step.name}" style="max-width:100%; border-radius:10px; margin-bottom:15px; display:none;">` : ''} 
                <p class="description">${step.description}</p>
                <div class="arabic-text">${step.arabic}</div>
                <div class="latin-text">${step.latin}</div>
                <div class="translation-text">"${step.translation}"</div>
            </div>
        `).join('');

        detailContainer.innerHTML = `
            <h2 style="color:var(--primary-color); margin-bottom:20px;">${prayer.name}</h2>
            
            <div class="step-card" style="border-left: 5px solid var(--secondary-color);">
                <h3>Niat</h3>
                <div class="arabic-text">${prayer.niat.arabic}</div>
                <div class="latin-text">${prayer.niat.latin}</div>
                <div class="translation-text">"${prayer.niat.translation}"</div>
                <button class="btn btn-primary" onclick="app.playAudio('Niat ${prayer.name}')" style="margin-top:15px;">Putar Niat</button>
            </div>

            <h3 style="margin: 30px 0 20px;">Tata Cara Pelaksanaan</h3>
            ${stepsHtml}
        `;

        window.scrollTo(0, 0);
    },

    closePrayerDetail: () => {
        document.getElementById('prayer-detail').classList.add('hidden');
        document.getElementById('prayer-list-container').classList.remove('hidden');
        document.querySelector('#sholat .section-header').classList.remove('hidden');
    },

    getGenericSteps: (rokaat) => {
        return [
            {
                name: 'Gerakan Sholat Standar',
                arabic: '...',
                latin: '...',
                translation: 'Gerakan sholat (Rukuk, Itidal, Sujud, dll) mengikuti tata cara umum.',
                description: 'Panduan detail per gerakan tersedia di menu Sholat Subuh sebagai contoh lengkap.'
            }
        ];
    },

    //logic do'a
    renderDoaList: () => {
        const container = document.getElementById('doa-list-container');
        if (!container || !window.doaData) return;

        container.innerHTML = window.doaData.map(doa => app.createDoaCard(doa)).join('');
    },

    createDoaCard: (doa) => {
        return `
            <div class="doa-item">
                <h3>${doa.title}</h3>
                <div class="arabic-text">${doa.arabic}</div>
                <div class="latin-text">${doa.latin}</div>
                <div class="translation-text">"${doa.translation}"</div>
                <div style="margin-top:15px;">
                    <button class="btn-outline" onclick="app.playAudio('${doa.title}')">🔊 Dengarkan</button>
                </div>
            </div>
        `;
    },

    filterDoa: () => {
        const input = document.getElementById('doa-search').value.toLowerCase();
        const container = document.getElementById('doa-list-container');
        const filtered = window.doaData.filter(d =>
            d.title.toLowerCase().includes(input) ||
            d.translation.toLowerCase().includes(input)
        );

        if (filtered.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:gray;">Tidak ditemukan.</p>';
        } else {
            container.innerHTML = filtered.map(d => app.createDoaCard(d)).join('');
        }
    },

    //logic kuis
    startQuiz: () => {
        app.state.score = 0;
        app.state.currentQuestionIndex = 0;
        document.getElementById('quiz-start-screen').classList.add('hidden');
        document.getElementById('quiz-question-screen').classList.remove('hidden');
        document.getElementById('quiz-result-screen').classList.add('hidden');
        app.showQuestion();
    },

    showQuestion: () => {
        const questionData = window.quizData[app.state.currentQuestionIndex];
        document.getElementById('question-text').innerText = questionData.question;

        const optionsDiv = document.getElementById('answer-options');
        optionsDiv.innerHTML = '';

        questionData.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('option-btn');
            button.onclick = () => app.selectAnswer(answer, button);
            optionsDiv.appendChild(button);
        });

        //update progress
        const progress = ((app.state.currentQuestionIndex) / window.quizData.length) * 100;
        document.getElementById('quiz-progress').style.width = `${progress}%`;
    },

    selectAnswer: (answer, button) => {
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach(btn => btn.disabled = true);

        if (answer.correct) {
            button.classList.add('correct');
            app.state.score++;
        } else {
            button.classList.add('incorrect');
            window.quizData[app.state.currentQuestionIndex].answers.forEach((ans, idx) => {
                if (ans.correct) {
                    buttons[idx].classList.add('correct');
                }
            });
        }

        setTimeout(() => {
            app.state.currentQuestionIndex++;
            if (app.state.currentQuestionIndex < window.quizData.length) {
                app.showQuestion();
            } else {
                app.showResult();
            }
        }, 1500);
    },

    showResult: () => {
        document.getElementById('quiz-question-screen').classList.add('hidden');
        document.getElementById('quiz-result-screen').classList.remove('hidden');
        document.getElementById('final-score').innerText = app.state.score;
        document.getElementById('total-questions').innerText = window.quizData.length;
    },

    resetQuiz: () => {
        app.startQuiz();
    },

    //logic ebook
    prevChapter: () => {
        alert("Fitur navigasi halaman E-Book akan diimplementasikan dengan konten lengkap.");
    },

    nextChapter: () => {
        alert("Fitur navigasi halaman E-Book akan diimplementasikan dengan konten lengkap.");
    },

    //audio
    playAudio: (name) => {
        console.log(`Playing audio for: ${name}`);
        const audioPath = `assets/audio/${name.replace(/\s+/g, '_').toLowerCase()}.mp3`;

        const audio = new Audio(audioPath);
        audio.play().catch(e => {
            alert(`Audio file placeholder. Please ensure '${audioPath}' exists in the repository. (${name})`);
            console.error(e);
        });
    }
};

document.addEventListener('DOMContentLoaded', app.init);

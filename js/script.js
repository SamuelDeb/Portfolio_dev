
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // // Form submission
        // document.querySelector('.contact-form').addEventListener('submit', function(e) {
        //     e.preventDefault();
        //     alert('Message envoyé avec succès ! (Ceci est une démo)');
        //     this.reset();
        // });

        // Données des projets avec plusieurs images
        const projects = [
            {
                title: "Gestion de bières",
                description: "Développement d'une application de gestion de bières, permettant de gérer les bières (nom, couleur, type, fabricant, pays d'origine), la quantité en stock, ainsi que les factures des bières vendues.",
                images: [
                    "images/projet1/2.png",
                    "images/projet1/3.png"
                ]
            },
            {
                title: "Application de Gestion de collections",
                description: "Création d'une application de gestion de collections pour une entreprise de vente de collections. Plusieurs collections sont disponibles dans le logiciel: collection pièces, collection billet, collection timbres.",
                images: [
                    "images/projet2/1.jpg",
                    "images/projet2/2.png",
                    "images/projet2/3.png"
                ]
            },
            {
                title: "Application de réservation de créneaux horaires",
                description: "Application de réservation de créneaux horaires pour particuliers et professionnels.",
                images: [
                    "images/projet3/0.png",
                    "images/projet3/1.png",
                    "images/projet3/2.png",
                    "images/projet3/3.png"
                ]
            },
            {
                title: "Application de gestion de travaux de nettoyage",
                description: "Création d'une application de gestion de travaux de nettoyage pour une entreprise de nettoyage. Fil rouge du Titre Professionnel de Développeur Web et Web Mobile.",
                images: [
                    "images/projet4/0.png",
                    "images/projet4/1.jpg",
                    "images/projet4/2.png",
                    "images/projet4/4.jpg",
                    "images/projet4/5.jpg",
                ]
            },
            {
                title: "Jeu du pendu",
                description: "Jeu du pendu sur la thématique manga, une liste de plus de 60 des mangas les plus populaire",
                images: [
                    "images/projet5/0.png",
                    "images/projet5/1.png",
                    "images/projet5/2.png",
                    "images/projet5/3.png",
                    "images/projet5/4.png",
                ]
            },
            {
                title: "Créaboost",
                description: "Forum d'entraide pour collégiens et lycéens",
                images: [
                    "images/projet6/0.svg",
                    "images/projet6/1.png",
                    "images/projet6/2.png",
                    "images/projet6/3.png",
                    "images/projet6/4.png",
                ]
            }

        ];

        let currentProject = 0;
        let currentImageIndex = 0;

        function openModal(projectIndex) {
            currentProject = projectIndex;
            currentImageIndex = 0;
            const project = projects[projectIndex];
            
            document.getElementById('modalTitle').textContent = project.title;
            document.getElementById('modalDescription').textContent = project.description;
            document.getElementById('modalImage').src = project.images[0];
            
            // Créer les miniatures
            const thumbnailsDiv = document.getElementById('thumbnails');
            thumbnailsDiv.innerHTML = '';
            project.images.forEach((img, index) => {
                const thumb = document.createElement('img');
                thumb.src = img;
                thumb.className = 'thumbnail' + (index === 0 ? ' active' : '');
                thumb.onclick = () => showImage(index);
                thumbnailsDiv.appendChild(thumb);
            });
            
            document.getElementById('imageModal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('imageModal').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function changeImage(direction) {
            const project = projects[currentProject];
            currentImageIndex += direction;
            
            if (currentImageIndex < 0) {
                currentImageIndex = project.images.length - 1;
            } else if (currentImageIndex >= project.images.length) {
                currentImageIndex = 0;
            }
            
            showImage(currentImageIndex);
        }

        function showImage(index) {
            currentImageIndex = index;
            const project = projects[currentProject];
            document.getElementById('modalImage').src = project.images[index];
            
            // Mettre à jour les miniatures actives
            document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }

        // Fermer le modal en cliquant en dehors
        document.getElementById('imageModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Navigation au clavier
        document.addEventListener('keydown', function(e) {
            if (document.getElementById('imageModal').classList.contains('active')) {
                if (e.key === 'Escape') closeModal();
                if (e.key === 'ArrowLeft') changeImage(-1);
                if (e.key === 'ArrowRight') changeImage(1);
            }
        });
   
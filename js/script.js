
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
                description: "Exercice de développement d'une application de gestion de bières lors de la formation de Concepteur Développeur d'Applications.",
                images: [
                    "images/projet1/2.png",
                    "images/projet1/3.png"
                ]
            },
            {
                title: "Application de Gestion de collections",
                description: "Fil rouge du Titre Professionnel de Concepteur Développeur d'Applications.",
                travaux: "- Conception et mise en place de la base de données SQL, de la partie back-end avec JAVA et Quarkus, application en microservices (services APIKEY,MAILER,AUTH) et API REST(Swagger), travail en équipe avec LOAN et Morgan", 
                images: [
                    "images/projet2/1.jpg",
                    "images/projet2/2.png",
                    "images/projet2/3.png"
                ]
            },
            {
                title: "Application de réservation de créneaux horaires",
                description: "Projet de stage pour le titre professionnel de Concepteur Développeur d'Applications.",
                travaux: "- Conception et mise en place de la base de données NoSQL(MongoDB), de la partie back-end avec JAVA et Quarkus, de la partie front-end avec JSF, application en microservices et API REST", 
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
                travaux: "- Conception et mise en place de la base de données MySQL, de la partie back-end avec PHP et Symfony, mise en place du back office pour la gestion des utilisateurs et des travaux, travail en équipe avec Romy", 
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
                description: "Exercice de développement d'un jeu lors de la formation de développeur web et web mobile",
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
                description: "Projet de stage de développeur web et web mobile",
                travaux: "- Conception et mise en place de la base de données MySQL, de la partie back-end avec PHP et Symfony, de la partie front-end avec Twig", 
                images: [
                    "images/projet6/0.svg",
                    "images/projet6/1.png",
                    "images/projet6/2.png",
                    "images/projet6/3.png",
                    "images/projet6/4.png",
                ]
            },
            {
                title: "Génération Boomerang",
                description: "Projet de stage pour la formation MS Developpement PHP ",
                travaux: "- Mise en place d'un formulaire de contact, d'une jauge de complétion de profil, fonction pour ajouter des documents et pour consulter les documents envoyés",
                images: [
                    // "images/projet7/0.svg",
                    "images/projet7/1.png",
                    "images/projet7/2.png",
                    "images/projet7/3.png",
                    "images/projet7/4.png",
                    "images/projet7/5.png",

                ]
            },
            {
                title: "Carnet d'adresses",
                description: "Carnet d'adresses permettant de gérer les contacts de l'utilisateur(Ajout, modification, suppression), sauvegarde des contacts dans un fichier .txt. ",
                images: [
                    "images/projet8/0.png",
                    "images/projet8/1.png",
                    "images/projet8/2.png",
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
            
            // Afficher le paragraphe "travail effectué" s'il existe
            const travauxElement = document.getElementById('travaux');
            if (project.travaux) {
                travauxElement.textContent = project.travaux;
                travauxElement.style.display = 'block';
            } else {
                travauxElement.textContent = '';
                travauxElement.style.display = 'none';
            }
            
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
   
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const nav = document.querySelector('nav');
    
    menuMobile.addEventListener('click', function() {
        nav.classList.toggle('active');
        // Alterna o ícone do menu
        if (nav.classList.contains('active')) {
            menuMobile.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            menuMobile.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuMobile.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Adicionar classe 'active' ao link do menu quando a seção estiver visível
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('nav ul li a[href="#' + sectionId + '"]').classList.add('active');
            } else {
                document.querySelector('nav ul li a[href="#' + sectionId + '"]').classList.remove('active');
            }
        });
    });

    // Filtro da galeria
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');

    filtroBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover classe active de todos os botões
            filtroBtns.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            galeriaItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Validação do formulário de contato
    const form = document.getElementById('formulario-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Verificar se os campos estão preenchidos
            let valid = true;
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    valid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });
            
            // Simulação de envio do formulário
            if (valid) {
                // Aqui você pode adicionar o código para enviar o formulário via AJAX
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                form.reset();
            } else {
                alert('Por favor, preencha todos os campos obrigatórios.');
            }
        });
    }

    // Simular a integração com as avaliações do Google
    const googleReviews = document.getElementById('google-reviews');
    if (googleReviews) {
        // Dados de exemplo das avaliações
        const reviews = [
            {
                name: 'Maria Silva',
                rating: 5,
                comment: 'Excelente atendimento! Dr. Diego é muito atencioso e profissional. Minha cirurgia foi um sucesso.'
            },
            {
                name: 'João Pereira',
                rating: 5,
                comment: 'Melhor oftalmologista que já consultei. Diagnóstico preciso e tratamento eficaz.'
            },
            {
                name: 'Ana Oliveira',
                rating: 4,
                comment: 'Ótimo médico, explica tudo com detalhes e paciência. Recomendo!'
            }
        ];
        
        // Criar elementos HTML para cada avaliação
        googleReviews.innerHTML = '';
        reviews.forEach(review => {
            const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review';
            reviewElement.innerHTML = `
                <div class="review-header">
                    <h4>${review.name}</h4>
                    <div class="review-stars">${stars}</div>
                </div>
                <p>${review.comment}</p>
            `;
            
            googleReviews.appendChild(reviewElement);
        });
    }

    // Máscara para o campo de telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            // Formatar o número de telefone
            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            
            e.target.value = value;
        });
    }

    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const track = document.querySelector('.carousel-track');
    let current = 0;
    let expanded = null;
    const slidesPerView = () => {
        if (window.innerWidth <= 500) return 1;
        if (window.innerWidth <= 700) return 2;
        if (window.innerWidth <= 900) return 3;
        return 4;
    };
    function showSlides(idx) {
        const perView = slidesPerView();
        slides.forEach((slide, i) => {
            slide.style.display = (i >= idx && i < idx + perView) ? 'flex' : 'none';
            slide.classList.remove('expanded');
        });
        expanded = null;
    }
    function nextSlide() {
        const perView = slidesPerView();
        current = current + perView;
        if (current >= slides.length) current = 0;
        showSlides(current);
    }
    function prevSlide() {
        const perView = slidesPerView();
        current = current - perView;
        if (current < 0) current = Math.max(0, slides.length - perView);
        showSlides(current);
    }
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    // Zoom visualizador
    slides.forEach(slide => {
        slide.addEventListener('click', function(e) {
            if (expanded === slide) {
                slide.classList.remove('expanded');
                expanded = null;
            } else {
                slides.forEach(s => s.classList.remove('expanded'));
                slide.classList.add('expanded');
                expanded = slide;
            }
            e.stopPropagation();
        });
    });
    document.body.addEventListener('click', function() {
        if (expanded) {
            expanded.classList.remove('expanded');
            expanded = null;
        }
    });
    window.addEventListener('resize', () => showSlides(current));
    showSlides(current);
});

// Simular preenchimento das imagens da galeria quando estiverem disponíveis
function loadGalleryImages() {
    // Este código seria usado quando você tiver as imagens reais
    // As categorias são: cirurgias, atendimentos, clinica
    const galleryData = [
        { src: 'images/gallery/cirurgia1.jpg', category: 'cirurgias', alt: 'Cirurgia de catarata' },
        { src: 'images/gallery/cirurgia2.jpg', category: 'cirurgias', alt: 'Cirurgia refrativa' },
        { src: 'images/gallery/atendimento1.jpg', category: 'atendimentos', alt: 'Consulta oftalmológica' },
        { src: 'images/gallery/atendimento2.jpg', category: 'atendimentos', alt: 'Exame de visão' },
        { src: 'images/gallery/clinica1.jpg', category: 'clinica', alt: 'Recepção da clínica' },
        { src: 'images/gallery/clinica2.jpg', category: 'clinica', alt: 'Sala de exames' }
    ];
    
    /* 
    const galleryGrid = document.querySelector('.galeria-grid');
    if (galleryGrid) {
        galleryGrid.innerHTML = '';
        
        galleryData.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `galeria-item ${item.category}`;
            
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            
            galleryItem.appendChild(img);
            galleryGrid.appendChild(galleryItem);
        });
    }
    */
} 
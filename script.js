document.addEventListener('DOMContentLoaded',function(){
    const menu = document.querySelector('nav');
    const menuBtn = document.querySelector('.menu-btn');
    const closeBtn = document.querySelector('.close-btn');
    const authModal = document.getElementById('authModal');
    const closeModal = document.querySelector('.close-modal');
    const toggleLinks = document.querySelectorAll('.toggle');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu visibility
    if (menu && menuBtn && closeBtn){
        menuBtn.addEventListener('click',() => menu.classList.add('active'));
        closeBtn.addEventListener('click',() => menu.classList.remove('active'));
    }
        
    // Show/hide the modal
    const showModal = (show) =>{
        if (show){
            authModal.classList.add('show');
        } else{
            authModal.classList.remove('show');
        }
        
    };
    
    // Show sign-in or sign-up form in the modal
    document.querySelectorAll('.sign-in-btn, .sign-up-btn').forEach(btn =>{
        btn.addEventListener('click', (e) =>{
            showModal(true);
            const isSignIn = e.target.classList.contains('sign-in-btn');
            document.getElementById('signInForm').style.display = isSignIn ? 'block' : 'none';
            document.getElementById('signUpForm').style.display = isSignIn ? 'none' : 'block';
        });
    });

    if (closeModal){
        closeModal.addEventListener('click', () => showModal(false));
        window.addEventListener('click',(event) =>{
            if (event.target === authModal){
                showModal(false);
            }
        });
    }
    
    // Toggle between sign-in and sign-up forms
    toggleLinks.forEach(link =>{
        link.addEventListener('click',(e) =>{
            e.preventDefault();
            document.getElementById('signInForm').classList.toggle('hidden');
            document.getElementById('signUpForm').classList.toggle('hidden');
        });
    });

    // Handle dropdown toggle on mobile
    dropdowns.forEach(dropdown =>{
        dropdown.addEventListener('click', (e) =>{
            e.preventDefault();
            const content = dropdown.querySelector('.dropdown-content');
            content.classList.toggle('show');
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor =>{
        anchor.addEventListener('click',function(e){
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Ensure dropdown links scroll smoothly to sections
    document.querySelectorAll('.dropdown-content a[href^="#"]').forEach(anchor =>{
        anchor.addEventListener('click',function(e){
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });

            // Close the dropdown menu after selection
            const dropdown = this.closest('.dropdown');
            if (dropdown){
                dropdown.querySelector('.dropdown-content').classList.remove('show');
            }

            // Close the mobile menu after selection
            if (menu.classList.contains('active')){
                menu.classList.remove('active');
            }
        });
    });

    // Google Maps API initialiazation
    function initMap(){
        const location = {lat: 40.748817, lng: -73.985428};
        const map = new google.maps.Map(document.getElementById('map'),{
            zoom: 14,
            center: location,
        });

        new google.maps.Marker({
            position: location,
            map: map,
            title: 'Our Location',
        });
    }

    // Load Google Maps API script
    function loadMapScript(){
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
    }

    // Call loadMapScript when DOM content is loaded
    document.addEventListener('DOMContentLoaded', loadMapScript);

    // Contact-Form handling
    document.addEventListener('DOMContentLoaded', () =>{
        const form = document.getElementById('contactForm');
        form.addEventListener('submit', (event) =>{
            event.preventDefault();

            const name = form.querySelector('#name').value;
            const email = form.querySelector('#email').value;
            const message = form.querySelector('#message').value;

            // Basic form validation
            if (name && email && message){
                // Handle form submission
                console.log('Form submitted:', { name, email, message});
                alert('Thank you for your message!');
                form.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    });
});
